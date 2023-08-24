import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken"



export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allusers = await prisma.usuarios.findMany({
      include: {
        Favoritos: true,
      },
    });
    res.status(200).json({ data: allusers });
  } catch (err) {
    console.log(err);
  }
};

export const getByIdUser = async (req: Request, res: Response) => {
  try {
    const Userid = req.params.id;
    const allusers = await prisma.usuarios.findMany({
      where: {
        id: Userid,
      },
      include: {
        Favoritos: true,
      },
    });
    res.status(200).json({ data: allusers });
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 5)
    const user = await prisma.usuarios.create({
      data: {
        name: name,
        email: email,
        cfp: cpf,
        senha: hashedPassword,
      }
    });
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
  }
};

export const updataUser = async (req: Request, res: Response) => {
  try {
    const Userid = req.params.id;
    const dataUser = req.body;
    const user = await prisma.usuarios.update({
      where: {
        id: Userid,
      },
      data: dataUser,
    });
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const Userid = req.params.id;
    await prisma.usuarios.delete({
      where: {
        id: Userid,
      },
    });
    res.status(200).json({ message: `Autor ${Userid} deletado com sucesso` });
  } catch (err) {
    console.log(err);
  }
};


//rota para favoritar uma casa

export const FavoriteHome = async (req: Request, res: Response) => {

  const { email, id } = req.body

  try {
    const usuario = await prisma.usuarios.update({
      where: { email: email },
      data: {
        Favoritos: {
          connect: { id: id }
        }
      }
    });

    res.json('casa favoritada');
  }
  catch (error) {
    res.status(500).json({ error: 'Erro ao marcar casa como favorita.' });
  }
}

export const removeFavorite = async (req: Request, res: Response) => {

  const { email, casaId } = req.body

  try {

    await prisma.usuarios.update({
      where: { email: email },
      data: {
        Favoritos: {
          disconnect: { id: casaId }
        }
      }
    })

    res.status(200).json({ message: `casa desmarcada` })

  }
  catch (error) {
    res.status(500).json({ error: 'Erro ao desmarcar casa como favorita.' });
  }

}



//rotas para buscar todas as casas favoritas de um certo usuario

export const allFavorites = async (req: Request, res: Response) => {

  const email = req.params.email 

  try {

    const usuario = await prisma.usuarios.findUnique({
      where: { email: email },
      include: { Favoritos: true }
    })

    res.status(200).json(usuario.Favoritos)
  }
  catch (error) {
    res.status(500).json({ error: 'Erro ao buscar casas favoritas.' })
  }

}


export const updatePassword = async (req: Request, res: Response) => {

  const { email, senha } = req.body
  const hashedPassword = await bcrypt.hash(senha, 5)
  
  try{
  
    await prisma.usuarios.update({
      where: { email: email },
      data: { senha: hashedPassword }
    })

    res.status(200).json({ message : "senha atualizada com sucesso"})

  }
  catch(erro){
    res.status(500).json({ error: 'Erro ao atualizar senha.' })
  }

}