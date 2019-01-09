export class Mensagem{
    tipo: EnumAlerta;
    mensagem: string;
}

export enum EnumAlerta{
    sucesso,
    erro,
    info,
    alerta
}