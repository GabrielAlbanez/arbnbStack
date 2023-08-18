import { Request, Response, Router } from "express"
import { ControlerUsers } from "../controllers/users/index"
import { ValidateData } from "../middlewares/users/validateData";
import { authLogin } from "../middlewares/users/auth";

const Rotauser = Router()


Rotauser.get('/users',ControlerUsers.getAllUsers);

Rotauser.get('/user/:id',ControlerUsers.getByIdUser)
Rotauser.get('/userFavorite',ControlerUsers.allFavorites)
Rotauser.post('/userC',ValidateData,ControlerUsers.createUser)
Rotauser.put('/user/:id',ControlerUsers.updataUser)
Rotauser.delete('/user/:id',ControlerUsers.deleteUser)
Rotauser.post('/MarkFavorite',ControlerUsers.FavoriteHome)
Rotauser.post('/RemoveFavorite',ControlerUsers.removeFavorite)
Rotauser.post('/Login',authLogin,(req : Request,res :Response)=>{
    res.status(200).json({message : "Login realizado por: ", user : req.user, token : req.token,})
})
Rotauser.post('/fogetPassword',ControlerUsers.updatePassword);

export default Rotauser;

