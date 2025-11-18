const precoLocacao = document.querySelector("#preco")
const nomeVeiculo = document.querySelector("#modeloVeiculo")
const imagemVeiculo = document.querySelector("#imagemVeiculo")
const anoVeiculo = document.querySelector("#anoVeiculo")
const kmVeiculo = document.querySelector("#kmVeiculo")

let carroDetalhes = 0;

async function carregarCarros() {
  try {

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


carregarCarros()