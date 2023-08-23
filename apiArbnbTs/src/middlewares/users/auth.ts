import { NextFunction, Request, Response } from "express";
import { db as Prisma } from "../../shared/db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: any; // Aqui você pode usar o tipo correto se souber qual é, em vez de 'any'
    token?: any;
  }
}

interface IdataLogin {
  message: string;
  token: string;
  user:IUser
}
interface IUser {
  emailDatabase: {
    email: string;
    name: string;
  };
  exp: number;
  iat: number;
}

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const emailValid = await Prisma.usuarios.findMany({
    where: {
      email: email,
    },
  });

  if (emailValid.length == 0) {
    return res.status(400).json({ error: "E-Mail invalido" });
  }

  const senhaPega = await Prisma.usuarios.findFirst({
    where: {
      email: email,
    },
    select: {
      senha: true,
    },
  });

  const validaSenha = await bcrypt.compare(senha, senhaPega.senha);

  if (!validaSenha) {
    return res.status(400).json({ error: "Senha invalida" });
  }

  const emailDatabase = await Prisma.usuarios.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
      name: true,
    },
  });

  const generateToken = jwt.sign({ emailDatabase }, "8080", {
    expiresIn: "1h",
  });

  if (!generateToken) {
    return res.status(400).json({ error: "Token não fornecido" });
  }

  try {
    const decode: any = jwt.verify(generateToken, "8080");
    req.session['user'] = decode;
    req.session['token'] = generateToken;
   
    res.cookie('Gazeta', emailDatabase, {
        maxAge: 60 * 60 * 1000, // Tempo de expiração do cookie (1 hora)
        httpOnly: true, // O cookie não pode ser acessado via JavaScript no cliente
        sameSite: 'strict', // Limitar o envio do cookie apenas para o mesmo site
        // secure: true, // Em produção, ative essa opção para HTTPS
      });
  } catch (error) {
    res.status(400).json({ error: "token invalido" });
  }

  next();
};
