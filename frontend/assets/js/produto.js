const categoriaProduto = document.getElementById("categoria-produto");
const nomeProduto = document.getElementById("nome-produto");
const precoProduto = document.getElementById("preco-produto");
const descricaoProduto = document.getElementById("descricao-produto");
const selectTamanho = document.getElementById("tamanho");
const selectCor = document.getElementById("cor");
const botaoAdicionar = document.getElementById("botao-adicionar");

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

async function carregarProduto() {
  try {
    const parametros = new URLSearchParams(window.location.search);
    const idProduto = parametros.get("id");

    if (!idProduto) {
      nomeProduto.textContent = "Produto não encontrado";
      return;
    }

    const resposta = await fetch(`http://localhost:8080/api/produtos/${idProduto}`);

    if (!resposta.ok) {
      throw new Error("Produto não encontrado");
    }

    const produto = await resposta.json();

    categoriaProduto.textContent = produto.categoria;
    nomeProduto.textContent = produto.nome;
    precoProduto.textContent = formatarPreco(produto.preco);
    descricaoProduto.textContent = produto.descricao;

    selectTamanho.innerHTML = "";
    selectCor.innerHTML = "";

    (produto.tamanhos || []).forEach((tamanho) => {
      selectTamanho.innerHTML += `<option value="${tamanho}">${tamanho}</option>`;
    });

    (produto.cores || []).forEach((cor) => {
      selectCor.innerHTML += `<option value="${cor}">${cor}</option>`;
    });

    botaoAdicionar.addEventListener("click", (event) => {
      event.preventDefault();

      const itemCarrinho = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        categoria: produto.categoria,
        tamanho: selectTamanho.value,
        cor: selectCor.value,
        quantidade: 1
      };

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(itemCarrinho);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      window.location.href = "carrinho.html";
    });
  } catch (erro) {
    console.error("Erro ao carregar produto:", erro);
    nomeProduto.textContent = "Produto não encontrado";
  }
}

carregarProduto();