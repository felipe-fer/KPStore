const gridProdutos = document.getElementById("grid-produtos");

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

async function carregarProdutos() {
  try {
    const resposta = await fetch("http://localhost:8080/api/produtos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    const produtos = await resposta.json();

    gridProdutos.innerHTML = "";

    if (produtos.length === 0) {
      gridProdutos.innerHTML = `<p>Nenhum produto cadastrado no momento.</p>`;
      return;
    }

    produtos.forEach((produto) => {
      gridProdutos.innerHTML += `
        <div class="card-produto">
          <div class="imagem-produto">${produto.imagem || "Imagem"}</div>
          <h3>${produto.nome}</h3>
          <p class="categoria-produto">${produto.categoria}</p>
          <p class="preco-produto">${formatarPreco(produto.preco)}</p>
          <a href="produto.html?id=${produto.id}" class="botao-produto">Ver produto</a>
        </div>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    gridProdutos.innerHTML = `<p>Não foi possível carregar os produtos.</p>`;
  }
}

carregarProdutos();