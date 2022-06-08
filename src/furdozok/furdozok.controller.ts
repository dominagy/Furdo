import { Request, Response, Router, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import Ifurdozok from "./furdozok.interface";
import furdozokModel from "./furdozok.model";
import HttpException from "../exceptions/HttpException";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateFurfozokDto from "./furdozok.dto";

export default class furdozokController implements Controller {
    public path = "/api/furdozok";
    public router = Router();
    private furdozokM = furdozokModel;

    constructor() {
        this.router.get(this.path, this.getAll);
        this.router.get(`${this.path}:furdozoid`, authMiddleware, this.getFurdozo);
        this.router.get(`${this.path}/:offset/:limit/:order/:sort/:keyword?`, this.getPaginatedFurdozok);
        this.router.get(`${this.path}:helyiseg`, authMiddleware, this.getHelyiseg);
        this.router.post(this.path,[authMiddleware, validationMiddleware(CreateFurfozokDto)], this.create);
        this.router.patch(`${this.path}:id`, this.modifyPATCH);
        this.router.put(`${this.path}:id`, this.modifyPUT);
        this.router.delete(`${this.path}:id`, this.delete);
    }

    private getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.furdozokM.find().populate("helyiseg");
            res.send(data);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private getPaginatedFurdozok = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const order = req.params.order;
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let utcak = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.furdozokM.find({ $or: [{ ki: { $regex: regex } }, { furdozoid: { $regex: regex } }] }).count();
                utcak = await this.furdozokM
                    .find({ $or: [{ ki: { $regex: regex } }, { furdozoid: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.furdozokM.countDocuments();
                utcak = await this.furdozokM
                    .find({})
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, utcak: utcak });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getFurdozo = async (req: Request, res: Response) => {
        try {
            const id = req.params.furdozoid;
            const document = await this.furdozokM.find({furdozoid: id});
            if (document) {
                res.send(document);
            } else {
                res.status(404).send({ message: `Document with id ${id} not found!` });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };
    
    private getHelyiseg = async (req: Request, res: Response) => {
        try {
            const id = req.params.helyiseg;
            const document = await this.furdozokM.find({helyiseg: id});
            if (document) {
                res.send(document);
            } else {
                res.status(404).send({ message: `Document with id ${id} not found!` });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private create = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const createdDocument = new this.furdozokM({
                ...body,
            });
            const savedDocument = await createdDocument.save();
            res.send(savedDocument);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private modifyPATCH = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedDoc = await this.furdozokM.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate("helyiseg", "-_id");
            if (updatedDoc) {
                res.send(updatedDoc);
            } else {
                res.status(404).send({ message: `Document with id ${id} not found!` });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private modifyPUT = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const modificationResult = await this.furdozokM.replaceOne({ _id: id }, body, { runValidators: true });
            if (modificationResult.modifiedCount) {
                const updatedDoc = await this.furdozokM.findById(id).populate("helyiseg", "-_id");
                res.send(updatedDoc);
            } else {
                res.status(404).send({ message: `Document with id ${id} not found!` });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const successResponse = await this.furdozokM.findByIdAndDelete(id);
            if (successResponse) {
                res.sendStatus(200);
            } else {
                res.status(404).send({ message: `Document with id ${id} not found!` });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };
}
