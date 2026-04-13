if (localStorage.getItem("adminLogado") !== "true") {
  window.location.href = "admin-login.html";
}

const adminInfo = document.getElementById("admin-info");
const botaoLogout = document.getElementById("botao-logout");
const listaPedidos = document.getElementById("lista-pedidos");

adminInfo.textContent = localStorage.getItem("adminEmail") || "Admin";

botaoLogout.addEventListener("click", function () {
  localStorage.removeItem("adminLogado");
  localStorage.removeItem("adminEmail");
  window.location.href = "admin-login.html";
});

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

async function carregarPedidos() {
  try {
    const resposta = await fetch("http://localhost:8080/api/pedidos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar pedidos");
    }

    const pedidos = await resposta.json();

    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
      listaPedidos.innerHTML = `
        <div class="mensagem-vazia">
          Nenhum pedido foi recebido até o momento.
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
          Preço: ${formatarPreco(item.preco)}
        </div>
      `).join("");

      listaPedidos.innerHTML += `
        <article class="card-pedido">
          <div class="topo-pedido">
            <div class="info-pedido">
              <h3>Pedido #${pedido.id}</h3>
              <p><strong>Data:</strong> ${formatarData(pedido.dataPedido)}</p>
              <p><strong>Total:</strong> ${formatarPreco(pedido.total)}</p>
              <p><strong>Entrega:</strong> ${pedido.formaEntrega}</p>
              <p><strong>Pagamento:</strong> ${pedido.formaPagamento}</p>
              <span class="status-pedido">${pedido.status || "PENDENTE"}</span>
            </div>

            <div class="info-cliente">
              <h3>Cliente</h3>
              <p><strong>Nome:</strong> ${pedido.nomeCliente}</p>
              <p><strong>Telefone:</strong> ${pedido.telefone}</p>
              <p><strong>Endereço:</strong> ${pedido.endereco}</p>
              <p><strong>Cidade:</strong> ${pedido.cidade}</p>
            </div>
          </div>

          <div class="bloco-pedido">
            <h4>Itens do pedido</h4>
            <div class="lista-itens">
              ${itensHtml}
            </div>
          </div>

          <div class="bloco-pedido">
            <h4>Observações</h4>
            <p>${pedido.observacoes || "Nenhuma observação."}</p>
          </div>

          <div class="area-status">
            <select class="campo-status" id="status-${pedido.id}">
              <option value="PENDENTE" ${pedido.status === "PENDENTE" ? "selected" : ""}>PENDENTE</option>
              <option value="PAGO" ${pedido.status === "PAGO" ? "selected" : ""}>PAGO</option>
              <option value="ENVIADO" ${pedido.status === "ENVIADO" ? "selected" : ""}>ENVIADO</option>
              <option value="ENTREGUE" ${pedido.status === "ENTREGUE" ? "selected" : ""}>ENTREGUE</option>
            </select>

            <button class="botao-status" onclick="atualizarStatusPedido('${pedido.id}')">
              Atualizar status
            </button>
          </div>
        </article>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar pedidos:", erro);
    listaPedidos.innerHTML = `
      <div class="mensagem-vazia">
        Não foi possível carregar os pedidos.
      </div>
    `;
  }
}

async function atualizarStatusPedido(id) {
  const selectStatus = document.getElementById(`status-${id}`);
  const novoStatus = selectStatus.value;

  try {
    const resposta = await fetch(`http://localhost:8080/api/pedidos/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: novoStatus })
    });

    if (!resposta.ok) {
      throw new Error("Erro ao atualizar status do pedido");
    }

    alert("Status atualizado com sucesso!");
    carregarPedidos();
  } catch (erro) {
    console.error("Erro ao atualizar status:", erro);
    alert("Não foi possível atualizar o status.");
  }
}

carregarPedidos();