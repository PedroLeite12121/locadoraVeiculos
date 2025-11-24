const express = require("express");
const { conexao } = require("../database.js");

const router = express.Router();


router.post("/criarLocacao", async (req, res) => {
  const {idCliente, idVeiculo} = req.body;

  try {
    const conn = await conexao();

    const sqlCheck = "SELECT * FROM tbl_locacao WHERE idVeiculo = ? AND dataDevolucao > CURRENT_DATE";
    const [check] = await conn.query(sqlCheck, [idVeiculo]);
    if(check.length > 0) {
      return res.status(400).json({
        error: "Veículo já alugado."
      });
    }

    const sql = "INSERT INTO tbl_locacao (dataLocacao, dataDevolucao, idCliente, idVeiculo) VALUES (?, ?, ?, ?)";

    const dataFinal = new Date();
    dataFinal.setDate(dataFinal.getDate() + 7)
    
    const [result] = await conn.query(sql, [new Date(), dataFinal, idCliente, idVeiculo]);
    
    if (result.affectedRows > 0) {
      res.status(201).json({success: true, message: "Carro alugado com sucesso"});
    } else {
      res.status(400).json({ error: "Erro ao alugar carro" });
    }

  } catch (err) {
    console.error("Erro ao alugar carro:", err);
    res.status(500).json({ error: "Erro ao alugar carro" });
  }
});

router.get("/", async (req, res) => {
  try {
    const pool = await conexao();
    const [locacoes] = await pool.query("SELECT * FROM tbl_locacao");

    res.json(locacoes);
  } catch (err) {
    console.error("Erro ao buscar locações:", err);
    res.status(500).json({ error: "Erro ao buscar locações" });
  }
});

router.get("/:idVeiculo", async (req, res) => {
  try {
    const pool = await conexao();
    const [locacoes] = await pool.query("SELECT * FROM tbl_locacao WHERE idVeiculo = ?", [req.params.idVeiculo]);

    res.json(locacoes);
  } catch (err) {
    console.error("Erro ao buscar locações:", err);
    res.status(500).json({ error: "Erro ao buscar locações" });
  }
});




module.exports = router;
