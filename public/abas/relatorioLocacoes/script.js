const container = document.querySelector(".container");

async function carregarLocacoes() {
  try {
    const res = await fetch("/locacao");
    const locacoes = await res.json(); 

    for (const locacao of locacoes) {
        const resCarro = await fetch("/carros/" + locacao.idVeiculo);
        const carro = await resCarro.json();

        const card = document.createElement("div");
        card.className = "card";

        const dataLocacao = locacao.dataLocacao.split("T")[0];
        const dataDevolucao = locacao.dataDevolucao.split("T")[0];

        card.innerHTML =
            `Carro ${carro[0].modelo} (ID: ${carro[0].idVeiculo}) 
            alugado em ${dataLocacao}, ` +
            `por Usuário Anônimo.
            devolvido em ${dataDevolucao}.`;

        container.appendChild(card);
    }
  }
  catch (err) {
      console.error("Erro ao carregar locações:", err);
  }
}

carregarLocacoes()