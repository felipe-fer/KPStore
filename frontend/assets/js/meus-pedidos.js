const clienteToken = localStorage.getItem("clienteToken");
const clienteNome = localStorage.getItem("clienteNome");
const clienteEmail = localStorage.getItem("clienteEmail");

const clienteLogado = document.getElementById("cliente-logado");
const listaMeusPedidos = document.getElementById("lista-meus-pedidos");

if (!clienteToken) {
  alert("Você precisa estar logado para ver seus pedidos.");
  window.location.href = "cliente-login.html";
}

clienteLogado.textContent = `${clienteNome || "Cliente"} • ${clienteEmail || ""}`;

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

async function carregarMeusPedidos() {
  try {
    const resposta = await apiFetch("http://localhost:8080/api/pedidos/meus", {
      method: "GET"
    }, "cliente");

    if (!resposta.ok) {
      throw new Error("Erro ao carregar pedidos do cliente");
    }

    const pedidos = await resposta.json();

    listaMeusPedidos.innerHTML = "";

    if (pedidos.length === 0) {
      listaMeusPedidos.innerHTML = `
        <div class="mensagem-vazia">
          Você ainda não realizou nenhum pedido.
        </div>
      `;
      return;
    }

    pedidos.reverse().forEach((pedido) => {
      const itensHtml = pedido.itens.map((item) => `
        <div class="item-pedido">
          <strong>${item.nome}</strong><br>
          Quantidade: ${item.quantidade}<br>
          Cor: ${item.cor}<br>
          Tamanho: ${item.tamanho}<br>
          Valor unitário: ${formatarPreco(item.preco)}
        </div>
      `).join("");

      listaMeusPedidos.innerHTML += `
        <article class="card-meu-pedido">
          <h3>Pedido #${pedido.id}</h3>
          <p><strong>Data:</strong> ${formatarData(pedido.dataPedido)}</p>
          <p><strong>Total:</strong> ${formatarPreco(pedido.total)}</p>
          <p><strong>Entrega:</strong> ${pedido.formaEntrega}</p>
          <p><strong>Pagamento:</strong> ${pedido.formaPagamento}</p>
          <p><strong>Endereço:</strong> ${pedido.endereco}</p>
          <p><strong>Cidade:</strong> ${pedido.cidade}</p>
          <span class="status-pedido">${pedido.status}</span>

          <div class="lista-itens-pedido">
            <h4>Itens</h4>
            ${itensHtml}
          </div>
        </article>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar meus pedidos:", erro);
    listaMeusPedidos.innerHTML = `
      <div class="mensagem-vazia">
        Não foi possível carregar seus pedidos.
      </div>
    `;
  }
}

carregarMeusPedidos();