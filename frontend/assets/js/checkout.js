const listaResumoCheckout = document.getElementById("lista-resumo-checkout");
const subtotalCheckout = document.getElementById("subtotal-checkout");
const totalCheckout = document.getElementById("total-checkout");
const formularioCheckout = document.getElementById("formulario-checkout");

const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const campoEndereco = document.getElementById("endereco");
const campoCidade = document.getElementById("cidade");
const campoFormaEntrega = document.getElementById("forma-entrega");
const campoFormaPagamento = document.getElementById("forma-pagamento");
const campoObservacoes = document.getElementById("observacoes");

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const clienteToken = localStorage.getItem("clienteToken");
const clienteNome = localStorage.getItem("clienteNome");
const clienteEmail = localStorage.getItem("clienteEmail");

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function preencherDadosClienteLogado() {
  if (clienteNome) {
    campoNome.value = clienteNome;
    campoNome.readOnly = true;
  }

  const telefoneSalvo = localStorage.getItem("clienteTelefone");
  if (telefoneSalvo) {
    campoTelefone.value = telefoneSalvo;
  }
}

function renderizarResumoCheckout() {
  listaResumoCheckout.innerHTML = "";

  if (carrinho.length === 0) {
    listaResumoCheckout.innerHTML = "<p>Seu carrinho está vazio.</p>";
    subtotalCheckout.textContent = formatarPreco(0);
    totalCheckout.textContent = formatarPreco(0);
    return;
  }

  let subtotal = 0;

  carrinho.forEach((item) => {
    const precoItem = Number(item.preco) * Number(item.quantidade);
    subtotal += precoItem;

    listaResumoCheckout.innerHTML += `
      <div class="item-resumo-checkout">
        <strong>${item.nome}</strong><br>
        Quantidade: ${item.quantidade}<br>
        Cor: ${item.cor}<br>
        Tamanho: ${item.tamanho}<br>
        Valor: ${formatarPreco(precoItem)}
      </div>
    `;
  });

  subtotalCheckout.textContent = formatarPreco(subtotal);
  totalCheckout.textContent = formatarPreco(subtotal);
}

formularioCheckout.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!clienteToken) {
    alert("Você precisa estar logado para finalizar o pedido.");
    window.location.href = "cliente-login.html";
    return;
  }

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const pedido = {
    clienteNome: clienteNome || campoNome.value,
    nomeCliente: campoNome.value,
    telefone: campoTelefone.value,
    endereco: campoEndereco.value,
    cidade: campoCidade.value,
    formaEntrega: campoFormaEntrega.value,
    formaPagamento: campoFormaPagamento.value,
    observacoes: campoObservacoes.value,
    itens: carrinho.map((item) => ({
      produtoId: item.produtoId,
      nome: item.nome,
      preco: item.preco,
      quantidade: item.quantidade,
      cor: item.cor,
      tamanho: item.tamanho
    }))
  };

  try {
    const resposta = await apiFetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      body: JSON.stringify(pedido)
    }, "cliente");

    if (!resposta.ok) {
      throw new Error("Erro ao finalizar pedido");
    }

    alert("Pedido realizado com sucesso!");

    localStorage.removeItem("carrinho");
    window.location.href = "meus-pedidos.html";
  } catch (erro) {
    console.error("Erro ao finalizar pedido:", erro);
    alert("Não foi possível finalizar o pedido.");
  }
});

preencherDadosClienteLogado();
renderizarResumoCheckout();