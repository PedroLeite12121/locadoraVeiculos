async function carregarCarros() {
  try {
    const res = await fetch("/carros");
    const carros = await res.json(); 
    const container = document.getElementById("allCard");


    carros.forEach(carro => {
        if(carro.locacaoId == null) {
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
                <p id="preco">R$${carro.precoLocacao},00/semana </p>
            </div>

            <div class="bottomInfoCard">
                <a href="/informacoesVeiculo/informacoesVeiculo.html?veiculoId=${carro.idVeiculo}"> Quero Esse </a>
            </div>`;

            container.appendChild(card);
        }
    });
  } catch (err) {
    console.error("Erro ao carregar carros:", err);
  }
}

carregarCarros();
