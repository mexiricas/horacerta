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

    constructor(id: Number, entrada: Date, pausaini: Date, pausafim: Date, saida: Date, dataRegistro: Date, pessoa: Pessoa) {
        this.id = id;
        this.entrada = entrada;
        this.pausaini = pausaini;
        this.pausafim = pausafim;
        this.saida = saida;
        this.dataRegistro = dataRegistro;
        this.pessoa = pessoa;
    }
}