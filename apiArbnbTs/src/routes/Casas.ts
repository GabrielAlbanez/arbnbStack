import { Request, Response, Router } from "express"
import { controllerCasa } from "../controllers/casas/index"
const RotaCasa = Router()


RotaCasa.get('/casas',controllerCasa.getAllHomes)
RotaCasa.get('/casa/:id',controllerCasa.getByIdHomes)
RotaCasa.post('/casaC',controllerCasa.createHome)
RotaCasa.put('/casaU/:id',controllerCasa.updateHome)
RotaCasa.delete('/casa/:id',controllerCasa.deleteHome)

export default RotaCasa