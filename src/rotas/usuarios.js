const express = require("express");
const { conexao } = require("../database.js");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/cadastroUsuario", async (req, res) => {
  const { nome, telefone, email, senha } = req.body;

  try {
    const conn = await conexao();

    const senhaHash = await bcrypt.hash(senha, 10); 

    const sql = "INSERT INTO tbl_cliente (nome, telefone, email, senha) VALUES (?, ?, ?, ?)";
    const [result] = await conn.query(sql, [nome, telefone, email, senhaHash]);

    if (result.affectedRows > 0) {
      req.session.user = {
        id: result.insertId,
        nome: nome,
        email: email
      };

      return res.status(201).json({
        success: true,
        message: "Cliente cadastrado com sucesso. OK para prosseguir",
        redirect: "/abas/main/index.html"
      });
    }

  } catch (err) {
    //checa se o erro tem relação com dados duplicados
    if (err.code === "ER_DUP_ENTRY") {

      //checa se o erro tem a palara email
      if (err.sqlMessage.includes("email")) {
        return res.status(400).json({
          error: "Email já cadastrado",
          message: "Este email já está em uso."
        });
      }

      //checa se o erro tem a palara telefone
      if (err.sqlMessage.includes("telefone")) {
        return res.status(400).json({
          error: "Telefone já cadastrado",
          message: "Este número de telefone já está em uso."
        });
      }

      return res.status(400).json({
        error: "Valor duplicado",
        message: "Email ou telefone já cadastrados."
      });
    }

    console.error("Erro no cadastro:", err);
    res.status(500).json({
      error: "Erro inesperado",
      message: "Ocorreu um erro inesperado"
    });
  }
});



router.post("/loginUsuario", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const conn = await conexao();
    const sql = "SELECT * FROM tbl_cliente WHERE email = ?";
    const [result] = await conn.query(sql, [email]);

    if (result.length === 0) {
      return res.status(400).json({ error: "Email inexistente" });
    }

    const user = result[0];
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (senhaCorreta) {
      req.session.user = {
        id: user.idCliente,
        nome: user.nome,
        email: user.email
      };

      return res.json({ success: true, redirect: "/abas/main/index.html", message: "Login realizado. OK para prosseguir" });
      
    } else {
      res.status(401).json({ error: "Senha incorreta", message: "Login inválido" });
    }

  } catch (err) {
    console.error("Erro ao logar cliente:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

router.get("/getDadosUsuario", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Usuário não logado" });
  }

  res.json({
    id: req.session.user.id,
    nome: req.session.user.nome,
    email: req.session.user.email
  });
})

router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Erro ao sair" });
    res.clearCookie("connect.sid"); 
    res.json({ success: true, message: "Logout realizado" });
  });
});



module.exports = router;
