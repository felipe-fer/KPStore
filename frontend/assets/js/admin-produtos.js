redirecionarParaLoginSeSemToken();

const adminInfo = document.getElementById("admin-info");
const botaoLogout = document.getElementById("botao-logout");
const formProduto = document.getElementById("form-produto");
const listaProdutosAdmin = document.getElementById("lista-produtos-admin");
const tituloFormulario = document.getElementById("titulo-formulario");
const botaoSalvar = document.getElementById("botao-salvar");
const botaoCancelar = document.getElementById("botao-cancelar");

adminInfo.textContent = localStorage.getItem("adminEmail") || "Admin";

botaoLogout.addEventListener("click", async function () {
  const refreshToken = localStorage.getItem("adminRefreshToken");

  try {
    if (refreshToken) {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });
    }
  } catch (erro) {
    console.error("Erro ao fazer logout:", erro);
  }

  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRefreshToken");
  localStorage.removeItem("adminEmail");
  window.location.href = "admin-login.html";
});

let produtoEmEdicaoId = null;

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function obterDadosFormulario() {
  return {
    nome: document.getElementById("nome").value,
    categoria: document.getElementById("categoria").value,
    preco: Number(document.getElementById("preco").value),
    imagem: document.getElementById("imagem").value,
    descricao: document.getElementById("descricao").value,
    cores: document.getElementById("cores").value.split(",").map(item => item.trim()).filter(Boolean),
    tamanhos: document.getElementById("tamanhos").value.split(",").map(item => item.trim()).filter(Boolean)
  };
}

function preencherFormulario(produto) {
  document.getElementById("nome").value = produto.nome || "";
  document.getElementById("categoria").value = produto.categoria || "";
  document.getElementById("preco").value = produto.preco || "";
  document.getElementById("imagem").value = produto.imagem || "";
  document.getElementById("descricao").value = produto.descricao || "";
  document.getElementById("cores").value = (produto.cores || []).join(", ");
  document.getElementById("tamanhos").value = (produto.tamanhos || []).join(", ");
}

function resetarFormulario() {
  formProduto.reset();
  produtoEmEdicaoId = null;
  tituloFormulario.textContent = "Cadastrar produto";
  botaoSalvar.textContent = "Cadastrar produto";
  botaoCancelar.style.display = "none";
}

async function carregarProdutosAdmin() {
  try {
    const resposta = await apiFetch("http://localhost:8080/api/produtos", {
      method: "GET"
    }, "admin");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    const produtos = await resposta.json();

    listaProdutosAdmin.innerHTML = "";

    if (produtos.length === 0) {
      listaProdutosAdmin.innerHTML = `
        <p class="mensagem-vazia">Nenhum produto cadastrado.</p>
      `;
      return;
    }

    produtos.forEach((produto) => {
      listaProdutosAdmin.innerHTML += `
        <article class="card-produto-admin">
          <h4>${produto.nome}</h4>
          <p><strong>Categoria:</strong> ${produto.categoria}</p>
          <p><strong>Preço:</strong> ${formatarPreco(produto.preco)}</p>
          <p><strong>Descrição:</strong> ${produto.descricao}</p>
          <p><strong>Cores:</strong> ${(produto.cores || []).join(", ")}</p>
          <p><strong>Tamanhos:</strong> ${(produto.tamanhos || []).join(", ")}</p>

          <div class="acoes-produto-admin">
            <button class="botao-editar" onclick="editarProduto('${produto.id}')">Editar</button>
            <button class="botao-excluir" onclick="excluirProduto('${produto.id}')">Excluir</button>
          </div>
        </article>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    listaProdutosAdmin.innerHTML = `
      <p class="mensagem-vazia">Não foi possível carregar os produtos.</p>
    `;
  }
}

formProduto.addEventListener("submit", async function (event) {
  event.preventDefault();

  const produto = obterDadosFormulario();

  try {
    let resposta;

    if (produtoEmEdicaoId) {
      resposta = await apiFetch(`http://localhost:8080/api/produtos/${produtoEmEdicaoId}`, {
        method: "PUT",
        body: JSON.stringify(produto)
      }, "admin");

      if (!resposta.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      alert("Produto atualizado com sucesso!");
    } else {
      resposta = await apiFetch("http://localhost:8080/api/produtos", {
        method: "POST",
        body: JSON.stringify(produto)
      }, "admin");

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      alert("Produto cadastrado com sucesso!");
    }

    resetarFormulario();
    carregarProdutosAdmin();
  } catch (erro) {
    console.error("Erro ao salvar produto:", erro);
    alert("Não foi possível salvar o produto.");
  }
});

async function editarProduto(id) {
  try {
    const resposta = await apiFetch(`http://localhost:8080/api/produtos/${id}`, {
      method: "GET"
    }, "admin");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produto");
    }

    const produto = await resposta.json();

    produtoEmEdicaoId = id;
    preencherFormulario(produto);
    tituloFormulario.textContent = "Editar produto";
    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.style.display = "block";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  } catch (erro) {
    console.error("Erro ao carregar produto para edição:", erro);
    alert("Não foi possível carregar o produto para edição.");
  }
}

botaoCancelar.addEventListener("click", function () {
  resetarFormulario();
});

async function excluirProduto(id) {
  const confirmar = confirm("Deseja realmente excluir este produto?");

  if (!confirmar) {
    return;
  }

  try {
    const resposta = await apiFetch(`http://localhost:8080/api/produtos/${id}`, {
      method: "DELETE"
    }, "admin");

    if (!resposta.ok) {
      throw new Error("Erro ao excluir produto");
    }

    alert("Produto excluído com sucesso!");

    if (produtoEmEdicaoId === id) {
      resetarFormulario();
    }

    carregarProdutosAdmin();
  } catch (erro) {
    console.error("Erro ao excluir produto:", erro);
    alert("Não foi possível excluir o produto.");
  }
}

carregarProdutosAdmin();