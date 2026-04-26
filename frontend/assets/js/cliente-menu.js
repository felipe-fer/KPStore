function obterClienteLogado() {
  return {
    token: localStorage.getItem("clienteToken"),
    refreshToken: localStorage.getItem("clienteRefreshToken"),
    id: localStorage.getItem("clienteId"),
    nome: localStorage.getItem("clienteNome"),
    email: localStorage.getItem("clienteEmail")
  };
}

function limparSessaoCliente() {
  localStorage.removeItem("clienteToken");
  localStorage.removeItem("clienteRefreshToken");
  localStorage.removeItem("clienteId");
  localStorage.removeItem("clienteNome");
  localStorage.removeItem("clienteEmail");
  localStorage.removeItem("clienteTelefone");
}

async function logoutCliente() {
  const cliente = obterClienteLogado();

  try {
    if (cliente.refreshToken) {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          refreshToken: cliente.refreshToken
        })
      });
    }
  } catch (erro) {
    console.error("Erro ao fazer logout do cliente:", erro);
  }

  limparSessaoCliente();
  window.location.href = "index.html";
}

function inicializarMenuCliente() {
  const cliente = obterClienteLogado();

  const areaClienteLink = document.getElementById("link-area-cliente");
  const meusPedidosLink = document.getElementById("link-meus-pedidos");
  const nomeClienteSpan = document.getElementById("nome-cliente-logado");
  const botaoLogoutCliente = document.getElementById("botao-logout-cliente");
  const perfilClienteLink = document.getElementById("link-perfil-cliente");
  const dashboardClienteLink = document.getElementById("link-dashboard-cliente");

  if (!areaClienteLink || !meusPedidosLink || !nomeClienteSpan || !botaoLogoutCliente || !perfilClienteLink || !dashboardClienteLink) {
    return;
  }

  if (cliente.token && cliente.nome) {
    areaClienteLink.style.display = "none";
    meusPedidosLink.style.display = "inline-block";
    nomeClienteSpan.style.display = "inline-block";
    botaoLogoutCliente.style.display = "inline-block";
    perfilClienteLink.style.display = "inline-block";
    dashboardClienteLink.style.display = "inline-block";

    nomeClienteSpan.textContent = `Olá, ${cliente.nome}`;
  } else {
    areaClienteLink.style.display = "inline-block";
    meusPedidosLink.style.display = "none";
    nomeClienteSpan.style.display = "none";
    botaoLogoutCliente.style.display = "none";
    perfilClienteLink.style.display = "none";
    dashboardClienteLink.style.display = "none";
  }

  botaoLogoutCliente.addEventListener("click", logoutCliente);
}

document.addEventListener("DOMContentLoaded", inicializarMenuCliente);