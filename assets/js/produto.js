const categoriaProduto = document.getElementById("categoria-produto");
const nomeProduto = document.getElementById("nome-produto");
const precoProduto = document.getElementById("preco-produto");
const descricaoProduto = document.getElementById("descricao-produto");
const selectTamanho = document.getElementById("tamanho");
const selectCor = document.getElementById("cor");
const botaoAdicionar = document.getElementById("botao-adicionar");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

const parametros = new URLSearchParams(window.location.search);
const idProduto = Number(parametros.get("id"));

const produto = produtos.find((item) => item.id === idProduto);

if (produto) {
  categoriaProduto.textContent = produto.categoria;
  nomeProduto.textContent = produto.nome;
  precoProduto.textContent = formatarPreco(produto.preco);
  descricaoProduto.textContent = produto.descricao;

  produto.tamanhos.forEach((tamanho) => {
    selectTamanho.innerHTML += `<option value="${tamanho}">${tamanho}</option>`;
  });

  produto.cores.forEach((cor) => {
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
} else {
  nomeProduto.textContent = "Produto não encontrado";
}