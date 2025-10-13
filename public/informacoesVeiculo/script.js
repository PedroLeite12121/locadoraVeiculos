async function carregarCarros() {
  try {

    const params = new URLSearchParams(window.location.search);
    const carId = params.get('veiculoId');


    const res = await fetch(`/carros/${carId}`);
    const carros = await res.json(); 



    
  } catch (err) {
    console.error("Erro ao carregar carros:", err);
  }
}

carregarCarros();
