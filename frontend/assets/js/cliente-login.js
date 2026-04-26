const abaLogin = document.getElementById("aba-login");
const abaCadastro = document.getElementById("aba-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");
const mensagemAcesso = document.getElementById("mensagem-acesso");

if (localStorage.getItem("clienteToken")) {
  window.location.href = "index.html";
}

abaLogin.addEventListener("click", function () {
  abaLogin.classList.add("ativa");
  abaCadastro.classList.remove("ativa");
  formLogin.classList.remove("oculto");
  formCadastro.classList.add("oculto");
  mensagemAcesso.textContent = "";
});

abaCadastro.addEventListener("click", function () {
  abaCadastro.classList.add("ativa");
  abaLogin.classList.remove("ativa");
  formCadastro.classList.remove("oculto");
  formLogin.classList.add("oculto");
  mensagemAcesso.textContent = "";
});

formCadastro.addEventListener("submit", async function (event) {
  event.preventDefault();

  const cliente = {
    nome: document.getElementById("cadastro-nome").value,
    email: document.getElementById("cadastro-email").value,
    senha: document.getElementById("cadastro-senha").value,
    telefone: document.getElementById("cadastro-telefone").value
  };

  try {
    const resposta = await fetch("http://localhost:8080/api/clientes/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar cliente");
    }

    localStorage.setItem("clienteTelefone", cliente.telefone);

    mensagemAcesso.textContent = "Cadastro realizado com sucesso. Faça login.";
    formCadastro.reset();
    abaLogin.click();
  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    mensagemAcesso.textContent = "Não foi possível cadastrar.";
  }
});

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const login = {
    email: document.getElementById("login-email").value,
    senha: document.getElementById("login-senha").value
  };

  try {
    const resposta = await fetch("http://localhost:8080/api/clientes/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao fazer login");
    }

    const cliente = await resposta.json();

    localStorage.setItem("clienteToken", cliente.token);
    localStorage.setItem("clienteRefreshToken", cliente.refreshToken);
    localStorage.setItem("clienteId", cliente.id);
    localStorage.setItem("clienteNome", cliente.nome);
    localStorage.setItem("clienteEmail", cliente.email);

    window.location.href = "index.html";
  } catch (erro) {
    console.error("Erro no login:", erro);
    mensagemAcesso.textContent = "E-mail ou senha inválidos.";
  }
});