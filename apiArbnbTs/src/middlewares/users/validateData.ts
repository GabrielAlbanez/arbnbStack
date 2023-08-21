import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import { cpf as cpfValid } from "cpf-cnpj-validator"
import * as EmailValidator from 'email-validator';
import * as jwt from "jsonwebtoken"

export const ValidateData = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, cpf, senha } = req.body

    const cpfValido = cpfValid.isValid(cpf)
    const emailValido = EmailValidator.validate(email)

    if (!name || !email || !senha || !cpf) {
        return res.status(400).json({ error: "Preencha todos os campos" })
    }

    if(!emailValido){
        return res.status(400).json({ error: "Email inválido" })
    }

    //validar se ja existe email no banco
    const userExisting = await prisma.usuarios.findMany({
        where: {
            email: email
        }
    })


    if (userExisting.length > 0) {
        return res.status(400).json({ error: "Email já cadastrado" })
    }


    const cpfExisting = await prisma.usuarios.findMany({
        where: {
            cfp: cpf
        }
    })

    if (cpfExisting.length > 0) {
        return res.status(400).json({ error: "CPF já cadastrado" })
    }


    if (!cpfValido) {
        return res.status(400).json({ error: "cpf invalido" })
    }
    
 
    



    next()

}