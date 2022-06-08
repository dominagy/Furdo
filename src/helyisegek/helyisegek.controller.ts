import { Request, Response, Router, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import helyisegekModel from "./helyisegek.model";
import HttpException from "../exceptions/HttpException";
import authMiddleware from "../middleware/auth.middleware";
import Ihelyisegek from "./helyisegek.unterface";

export default class helyisegekController implements Controller {
    public path = "/api/helyisegek";
    public router = Router();
    private helyisegekM = helyisegekModel;

    constructor() {
        this.router.get(this.path, this.getAll);
        this.router.post("/api/helyisegek", this.create);
    }

    private getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.helyisegekM.find();
            res.send(data);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    private create = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const createdDocument = new this.helyisegekM({
                ...body,
            });
            const savedDocument = await createdDocument.save();
            res.send(savedDocument);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };
}
