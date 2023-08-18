import { Request, Response } from "express";
import { db as prisma } from "../../shared/db";

export const getAllHomes = async (req: Request, res: Response) => {

    try {

        const allHomes = await prisma.casas.findMany()
        res.status(200).json(allHomes)

    }
    catch (error) {
        res.status(500).json({ error: error })
    }

}

export const getByIdHomes = async (req: Request, res: Response) => {
    try {
        const casaid = req.params.id
        const homes = await prisma.casas.findUnique({
            where : {
                id : casaid
            }
        })
         res.status(200).json({data : homes})
      }
    catch (error) {
        res.status(500).json({ erro: error })
    }

}

export const createHome = async(req : Request, res : Response)=>{
  
    try {
        const { name, imagens, price ,local ,pais, avaiation } = req.body;
        const Home = await prisma.casas.create({
            data : {
                name : name,
                imagens : JSON.stringify(imagens),
                price,
                Local : local,
                avaiation : avaiation,
                pais : pais
            } 
        })
        res.status(201).json(Home)
      }
    catch (error) {
        res.status(500).json({ erro: error })
    }
}



export const updateHome = async(req : Request, res : Response)=>{
  
    try {
        const homeID = req.params.id
        const { name, imagens,price,local,pais,avaiation } = req.body;
        const Home = await prisma.casas.update({
          where : {
            id : homeID
          },
          data : {
            name : name,
                imagens : JSON.stringify(imagens),
                price,
                Local : local,
                avaiation : avaiation,
                pais : pais
        } 
        })
        res.status(201).json(Home)
      }
    catch (error) {
        res.status(500).json({ erro: error })
    }
}


export const deleteHome = async(req : Request, res : Response)=>{
  
    try {
        const homeID = req.params.id
        const Home = await prisma.casas.delete({
          where : {
            id : homeID
          }
        })
        res.status(201).json(Home)
      }
    catch (error) {
        res.status(500).json({ erro: error })
    }
}




