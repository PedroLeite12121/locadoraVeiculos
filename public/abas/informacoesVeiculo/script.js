


async function carregarCarros() {
  try {
    const precoLocacao = document.querySelector("#preco")
    const nomeVeiculo = document.querySelector("#modeloVeiculo")
    const imagemVeiculo = document.querySelector("#imagemVeiculo")
    const anoVeiculo = document.querySelector("#anoVeiculo")
    const kmVeiculo = document.querySelector("#kmVeiculo")

    const params = new URLSearchParams(window.location.search);
    const carId = params.get('veiculoId');


    const res = await fetch(`/carros/${carId}`);
    carroDetalhes = await res.json(); 
    
    precoLocacao.innerHTML = "R$" + carroDetalhes[0].precoLocacao + " / Semana"
    nomeVeiculo.innerHTML = carroDetalhes[0].modelo
    imagemVeiculo.src = carroDetalhes[0].imagemUrl
    anoVeiculo.innerHTML = carroDetalhes[0].ano
    kmVeiculo.innerHTML = carroDetalhes[0].kms


  } catch (err) {
    console.error("Erro ao carregar carros:", err);
  }
}

async function botaoHistorico() {
  const container = document.querySelector(".historicoDeLocacoes")
  const containerLista = document.querySelector(".locacoesLista")
  const conteudoAnterior = document.querySelector(".container")
  const conteudoAnterior2 = document.querySelector(".detalhesExtras")
  const botao = document.querySelector("#historico")
  
  botao.addEventListener("click", async () => {
  try {
    if (conteudoAnterior.style.display === "none") {
      container.style.display = "none";
      conteudoAnterior.style.display = "flex";
      conteudoAnterior2.style.display = "flex";
      return;
    }

    container.style.display = "flex";
    conteudoAnterior.style.display = "none";
    conteudoAnterior2.style.display = "none";

    containerLista.innerHTML = "";

    const params = new URLSearchParams(window.location.search);
    const carId = params.get("veiculoId");
    const res = await fetch(`/locacao/${carId}`);

    carroHistoricos = await res.json();

    if (!carroHistoricos || carroHistoricos.length === 0) {
      const msgVazia = document.createElement("div");
      msgVazia.className = "card";
      msgVazia.textContent = "Nenhuma locação anterior.";
      containerLista.appendChild(msgVazia);
      return;
    }

    carroHistoricos.forEach(historico => {
      const card = document.createElement("div");
      card.className = "card";

      const dataLocacao = historico.dataLocacao.split("T")[0];
      const dataDevolucao = historico.dataDevolucao.split("T")[0];

      card.innerHTML =
        `Alugado em ${dataLocacao} por Usuário Anônimo. Devolvido em ${dataDevolucao}`;

      containerLista.appendChild(card);
    });

  } catch (err) {
    alert("Erro inesperado.");
  }
});

}

botaoHistorico()
carregarCarros()