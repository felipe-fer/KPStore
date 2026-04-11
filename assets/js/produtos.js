const gridProdutos = document.getElementById("grid-produtos");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderizarProdutos(lista) {
  gridProdutos.innerHTML = "";

  lista.forEach((produto) => {
    gridProdutos.innerHTML += `
      <div class="card-produto">
        <div class="imagem-produto">${produto.imagem}</div>
        <h3>${produto.nome}</h3>
        <p class="categoria-produto">${produto.categoria}</p>
        <p class="preco-produto">${formatarPreco(produto.preco)}</p>
        <a href="produto.html?id=${produto.id}" class="botao-produto">Ver produto</a>
      </div>
    `;
  });
}

renderizarProdutos(produtos);