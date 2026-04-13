const listaResumoCheckout = document.getElementById("lista-resumo-checkout");
const subtotalCheckout = document.getElementById("subtotal-checkout");
const totalCheckout = document.getElementById("total-checkout");
const formularioCheckout = document.getElementById("formulario-checkout");

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function carregarResumoCheckout() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  listaResumoCheckout.innerHTML = "";

  let total = 0;

  carrinho.forEach((item) => {
    const subtotalItem = Number(item.preco) * Number(item.quantidade);
    total += subtotalItem;

    listaResumoCheckout.innerHTML += `
      <div class="item-resumo">
        <span>${item.nome} (${item.quantidade}x)</span>
        <span>${formatarPreco(subtotalItem)}</span>
      </div>
    `;
  });

  subtotalCheckout.textContent = formatarPreco(total);
  totalCheckout.textContent = formatarPreco(total);
}

formularioCheckout.addEventListener("submit", async function (event) {
  event.preventDefault();

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const pedido = {
    nomeCliente: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    endereco: document.getElementById("endereco").value,
    cidade: document.getElementById("cidade").value,
    formaEntrega: document.getElementById("forma-entrega").value,
    formaPagamento: document.getElementById("forma-pagamento").value,
    observacoes: document.getElementById("observacoes").value,
    itens: carrinho.map((item) => ({
      produtoId: item.id,
      nome: item.nome,
      preco: Number(item.preco),
      quantidade: Number(item.quantidade),
      cor: item.cor,
      tamanho: item.tamanho
    }))
  };

  try {
    const resposta = await fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pedido)
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível salvar o pedido.");
    }

    const pedidoSalvo = await resposta.json();
    console.log("Pedido salvo:", pedidoSalvo);

    alert("Pedido confirmado com sucesso!");

    localStorage.removeItem("carrinho");
    window.location.href = "index.html";
  } catch (erro) {
    console.error("Erro ao salvar pedido:", erro);
    alert("Ocorreu um erro ao confirmar o pedido.");
  }
});

carregarResumoCheckout();