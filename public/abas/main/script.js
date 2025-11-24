async function carregarCarros() {
  try {
    const res = await fetch("/carros");
    const carros = await res.json(); 
    const container = document.getElementById("allCard");

    for(const carro of carros) {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `

          <div class="topInfoCard">
              <div class="subTopInfoCard">
                  <p id="modelo">${carro.modelo}</p>
                  <p id="ano">${carro.ano}</p>
              </div>
              <p id="kms">${carro.kms} Km</p>
          </div>

          <div class="midInfoCard">
              <img src="${carro.imagemUrl}">
              <p id="preco">R$${carro.precoLocacao}/semana </p>
          </div>

          <div class="bottomInfoCard">
              <a href="/abas/informacoesVeiculo/informacoesVeiculo.html?veiculoId=${carro.idVeiculo}"> Alugar </a>
          </div>`;

          container.appendChild(card);
    };
  } catch (err) {
    console.error("Erro ao carregar carros:", err);
  }
}

carregarCarros();
