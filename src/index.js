const express = require('express')
const path = require("path");
const session = require("express-session");

const { testarConexao, conexao, closeConexao } = require("../src/database.js");

const app = express();

app.use(session({
  secret: "chave",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.sendFile(path.resolve("public/main/index.html"));
});

const carrosRouter = require('./rotas/carros.js')
app.use('/carros', carrosRouter)

const usuariosRouter = require('./rotas/usuarios.js')
app.use('/usuarios', usuariosRouter)



app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})
