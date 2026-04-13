const gridDestaques = document.getElementById("grid-destaques");

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

async function carregarDestaques() {
  try {
    const resposta = await fetch("http://localhost:8080/api/produtos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    const produtos = await resposta.json();

    gridDestaques.innerHTML = "";

    if (produtos.length === 0) {
      gridDestaques.innerHTML = `<p>Nenhum produto em destaque no momento.</p>`;
      return;
    }

    const destaques = produtos.slice(0, 4);

    destaques.forEach((produto) => {
      gridDestaques.innerHTML += `
        <div class="card-produto">
          <div class="img-produto">${produto.imagem || "Imagem"}</div>
          <h3>${produto.nome}</h3>
          <p class="preco">${formatarPreco(produto.preco)}</p>
          <a href="produto.html?id=${produto.id}" class="botao-produto">Ver produto</a>
        </div>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar destaques:", erro);
    gridDestaques.innerHTML = `<p>Não foi possível carregar os destaques.</p>`;
  }
}

carregarDestaques();