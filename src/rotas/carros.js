const express = require("express");
const { conexao } = require("../database.js");

const router = express.Router();


router.post("/cadastroCarro", async (req, res) => {
  const {modelo, ano, kms, precoLocacao, imagemUrl} = req.body;

  try {
    const conn = await conexao();
    const sql = "INSERT INTO tbl_veiculo (modelo, ano, kms, precoLocacao, imagemUrl) VALUES (?, ?, ?, ?, ?)";
    
    const [result] = await conn.query(sql, [modelo, ano, kms, precoLocacao, imagemUrl]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Carro cadastrado com sucesso"});
    } else {
      res.status(400).json({ error: "Erro ao cadastrar carro" });
    }

  } catch (err) {
    console.error("Erro ao cadastrar carro:", err);
    res.status(500).json({ error: "Erro ao cadastrar carro" });
  }
});

router.get("/", async (req, res) => {
  try {
    const pool = await conexao();
    const [cars] = await pool.query("SELECT * FROM tbl_veiculo WHERE idVeiculo NOT IN (SELECT idVeiculo FROM tbl_locacao WHERE dataDevolucao > CURRENT_DATE)");

    res.json(cars);
  } catch (err) {
    console.error("Erro ao buscar carros:", err);
    res.status(500).json({ error: "Erro ao buscar carros" });
  }
});

router.get("/:idVeiculo", async (req, res) => {
  try {
    const pool = await conexao();
    const [cars] = await pool.query("SELECT * FROM tbl_veiculo WHERE idVeiculo = ?", [req.params.idVeiculo]);

    res.json(cars);
  } catch (err) {
    console.error("Erro ao buscar carros:", err);
    res.status(500).json({ error: "Erro ao buscar carros" });
  }
});


module.exports = router;
