import express, { Request, Response } from "express"
import RotaCasa from "./routes/Casas"
import Rotauser from "./routes/Users"
import cors from "cors";
import session from "express-session";

const app = express()
const porta = process.env.PORT || 5050
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Substitua pelo endereço do seu cliente
    credentials: true, // Permitir que cookies sejam enviados
  }));

app.use(
    session({
      secret: '8080',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false,maxAge: 3600000 },
       //tem que ativar isso com true no front end para enviar os cokies http
    })
  );


  

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Welcome Api Arbnb")
})

app.use(RotaCasa, Rotauser)



app.listen(porta, () => { console.log(`server running on ${porta}`) })