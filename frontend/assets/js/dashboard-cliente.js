const clienteToken = localStorage.getItem("clienteToken");
const clienteNome = localStorage.getItem("clienteNome");
const clienteEmail = localStorage.getItem("clienteEmail");

const tituloDashboard = document.getElementById("titulo-dashboard");
const totalPedidos = document.getElementById("total-pedidos");
const ultimoStatus = document.getElementById("ultimo-status");
const emailClienteDashboard = document.getElementById("email-cliente-dashboard");
const areaUltimoPedido = document.getElementById("area-ultimo-pedido");

if (!clienteToken) {
  window.location.href = "cliente-login.html";
}

tituloDashboard.textContent = `Olá, ${clienteNome || "cliente"}!`;
emailClienteDashboard.textContent = clienteEmail || "---";

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarData(dataIso) {
  const data = new Date(dataIso);
  return data.toLocaleString("pt-BR");
}

async function carregarDashboardCliente() {
  try {
    const resposta = await apiFetch("http://localhost:8080/api/pedidos/meus", {
      method: "GET"
    }, "cliente");

    if (!resposta.ok) {
      throw new Error("Erro ao carregar dashboard");
    }

    const pedidos = await resposta.json();

    totalPedidos.textContent = pedidos.length;

    if (pedidos.length === 0) {
      ultimoStatus.textContent = "Nenhum";
      areaUltimoPedido.innerHTML = `
        <p>Você ainda não realizou nenhum pedido.</p>
      `;
      return;
    }

    const ultimoPedido = pedidos[pedidos.length - 1];

    ultimoStatus.textContent = ultimoPedido.status || "PENDENTE";

    areaUltimoPedido.innerHTML = `
      <p><strong>Pedido:</strong> #${ultimoPedido.id}</p>
      <p><strong>Data:</strong> ${formatarData(ultimoPedido.dataPedido)}</p>
      <p><strong>Total:</strong> ${formatarPreco(ultimoPedido.total)}</p>
      <p><strong>Status:</strong> ${ultimoPedido.status}</p>
      <p><strong>Entrega:</strong> ${ultimoPedido.formaEntrega}</p>
      <p><strong>Pagamento:</strong> ${ultimoPedido.formaPagamento}</p>
    `;
  } catch (erro) {
    console.error("Erro no dashboard:", erro);
    areaUltimoPedido.innerHTML = `
      <p>Não foi possível carregar suas informações.</p>
    `;
  }
}

carregarDashboardCliente();