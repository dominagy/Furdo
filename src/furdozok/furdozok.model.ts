import { Schema, model } from "mongoose";
import Ifurdozok from "./furdozok.interface";
// https://mongoosejs.com/docs/typescript.html
// https://mongoosejs.com/docs/validation.html

const furdozokSchema = new Schema<Ifurdozok>(
    {
        _id: Number,
        furdozoid: {
            type: Number,
            required: true,
        },
        helyiseg: {
            ref: "helyisegek",
            type: Number,
            required: true,
        },
        ki: {
            type: Number,
            required: true,
            min: [0, "0 a belépés, 1 a kilépés"],
            max: [1, "0 a belépés, 1 a kilépés"],
        },
        ora: {
            type: Number,
            required: true,
            min: [6, "06:00-tól van nyitva a fürdő"],
            max: [19, "20:00-ig van nyitva a fürdő"],
        },
        perc: {
            type: Number,
            required: true,
            min: [0, ""],
            max: [59, "maximum 59 lehet a perc"],
        },
        masodperc: {
            type: Number,
            required: true,
            min: [0, ""],
            max: [59, "maximum 59 lehet a másodperc"],
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const furdozokModel = model("furdozok", furdozokSchema, "furdozok");

export default furdozokModel;
