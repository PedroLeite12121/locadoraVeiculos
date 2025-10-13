const express = require("express");
const { conexao } = require("../database.js");

const router = express.Router();


router.post("/criarLocacao", async (req, res) => {
  const {idCliente, idVeiculo} = req.body;

  try {
    const conn = await conexao();
    const sql = "INSERT INTO tbl_locacao (dataLocacao, dataDevolucao, idCliente, idVeiculo) VALUES (?, ?, ?, ?)";
    
    const [result] = await conn.query(sql, [new Date(), '2020-20-20', idCliente, idVeiculo]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Carro cadastrado com sucesso", id: result.insertId });
    } else {
      res.status(400).json({ error: "Erro ao cadastrar carro" });
    }

  } catch (err) {
    console.error("Erro ao cadastrar carro:", err);
    res.status(500).json({ error: "Erro ao cadastrar carro" });
  }
});



module.exports = router;
