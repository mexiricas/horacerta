export class Pessoa {
    public id: Number;
    public nome: String;
    public cargo: String;
    public dataRegistro: Date;
    public username: String;
    public telefone: String;

    constructor(id: Number, nome: String, cargo: String, dataRegistro: Date, username: String, telefone: String) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.dataRegistro = dataRegistro;
        this.username = username;
        this.telefone = telefone;
    }

}