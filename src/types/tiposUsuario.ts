export type tipoUsuarioForm = {
    nome:string;
    username:string;
    email:string;
    senha:string;
    confirmarSenha:string;
}

export type tipoTokenInfo = {
    id:string;
    nome:string;
    username:string;
    email:string;
    exp: number;
}