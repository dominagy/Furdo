import { IsNumber, IsString } from "class-validator";

export default class CreateFurfozokDto {
    @IsNumber()
    public _id: number;

    @IsNumber()
    public furdozoid: number;

    @IsNumber()
    public helyiseg: number;

    @IsNumber()
    public ki: number;

    @IsNumber()
    public ora: number;

    @IsNumber()
    public perc: number;

    @IsNumber()
    public masodperc: number;
    
}