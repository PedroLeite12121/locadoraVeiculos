async function loadNav() {
  const nav = document.querySelector("nav");
  const res = await fetch("/usuarios/getDadosUsuario"); 

  if (!res.ok) {
    nav.innerHTML = `
      <div class="nomeNav"><a href="/abas/main/index.html">Locadoras321</a></div>

      <div class="mainNav">
        <a href="/abas/main/index.html">Home</a>
        <a href="/abas/relatorioLocacoes/relatorioLocacoes.html">Relatório de Locações</a>
        <a href="">Contatos</a>
      </div>

      <div class="navOpcoesEntrada">
        <a href="/abas/cadastroVeiculo/cadastroVeiculo.html" id="addVeiculoNav">Adicionar Veículo</a>
        <a href="/abas/cadastroCliente/cadastroCliente.html" id="cadastroNav">Cadastro</a>
        <a href="/abas/loginCliente/loginCliente.html" id="loginNav">Login</a>

      </div>`;
  } else {


    nav.innerHTML = `
      <div class="nomeNav"><a href="/abas/main/index.html">Locadoras321</a></div>

      <div class="mainNav">
        <a href="/abas/main/index.html">Home</a>
        <a href="/abas/relatorioLocacoes/relatorioLocacoes.html">Relatório de Locações</a>
        <a href="">Contatos</a>
      </div>

      <div class="navOpcoesEntrada">
      <a href="/abas/cadastroVeiculo/cadastroVeiculo.html" id="addVeiculoNav">Adicionar Veículo</a>
        <a href="#" id="logoutNav">Logout</a>
      </div>`;

      document.getElementById("logoutNav").addEventListener("click", async () => {
      await fetch("/usuarios/logout", { method: "POST" });
      location.reload(); 
    });
   ;
  }
}

loadNav();
