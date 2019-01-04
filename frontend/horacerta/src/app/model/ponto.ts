import { Pessoa } from "./pessoa";

export class Ponto {
    public id: Number;
    public entrada: Date;
    public pausaini: Date;
    public pausafim: Date;
    public saida: Date;
    public dataRegistro: Date;
    public pessoa: Pessoa;
    public saldo: number;

    constructor() { }
}