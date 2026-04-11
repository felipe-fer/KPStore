const listaResumoCheckout = document.getElementById("lista-resumo-checkout");
const subtotalCheckout = document.getElementById("subtotal-checkout");
const totalCheckout = document.getElementById("total-checkout");
const formularioCheckout = document.getElementById("formulario-checkout");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function carregarResumoCheckout() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  listaResumoCheckout.innerHTML = "";

  let total = 0;

  carrinho.forEach((item) => {
    const subtotalItem = item.preco * item.quantidade;
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

formularioCheckout.addEventListener("submit", function (event) {
  event.preventDefault();

  const pedido = {
    cliente: {
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      endereco: document.getElementById("endereco").value,
      cidade: document.getElementById("cidade").value
    },
    entrega: document.getElementById("forma-entrega").value,
    pagamento: document.getElementById("forma-pagamento").value,
    observacoes: document.getElementById("observacoes").value,
    itens: JSON.parse(localStorage.getItem("carrinho")) || []
  };

  console.log("Pedido final:", pedido);

  alert("Pedido confirmado com sucesso!");

  localStorage.removeItem("carrinho");
  window.location.href = "index.html";
});

carregarResumoCheckout();