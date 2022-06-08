// https://mongoosejs.com/docs/validation.html#built-in-validators

import { Schema, model } from "mongoose";
import Ihelyisegek from "./helyisegek.unterface";

const helyisegekSchema = new Schema<Ihelyisegek>(
    {
        _id: Number,
        helyiseg: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const helyisegekModel = model("helyisegek", helyisegekSchema, "helyisegek");

export default helyisegekModel;
