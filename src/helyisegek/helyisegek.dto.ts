import { IsNumber, IsString } from "class-validator";

export default class CreateHelyisegekDto {
    @IsNumber()
    public _id: number;

    @IsString()
    public helyiseg: string;
    
    @IsString()
    public url: string;
    
}