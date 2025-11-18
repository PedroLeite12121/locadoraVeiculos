const express = require("express");
const { conexao } = require("../database.js");

const router = express.Router();


router.post("/criarLocacao", async (req, res) => {
  const {idCliente, idVeiculo} = req.body;

  try {
    const conn = await conexao();

    const sqlCheck = "SELECT * FROM tbl_locacao_item WHERE idVeiculo = ?";
    const [check] = await conn.query(sqlCheck, [idVeiculo]);
    if(check.length > 0) {
      return res.status(400).json({
        error: "Veículo já alugado."
      });
    }

    const sql = "INSERT INTO tbl_locacao (dataLocacao, dataDevolucao, idCliente) VALUES (?, ?, ?)";
    const [result] = await conn.query(sql, [new Date(), '2025-11-20', idCliente]);

    const idLocacao = result.insertId;

    const sql2 =  "INSERT INTO tbl_locacao_item (idLocacao, idVeiculo) VALUES (?, ?)" 
    const [result2] = await conn.query(sql2, [idLocacao, idVeiculo]);
    
    if (result2.affectedRows > 0) {
      res.status(201).json({success: true, message: "Carro alugado com sucesso"});
    } else {
      res.status(400).json({ error: "Erro ao alugar carro" });
    }

  } catch (err) {
    console.error("Erro ao alugar carro:", err);
    res.status(500).json({ error: "Erro ao alugar carro" });
  }
});



module.exports = router;
