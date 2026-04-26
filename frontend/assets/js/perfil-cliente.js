const clienteToken = localStorage.getItem("clienteToken");
const clienteNome = localStorage.getItem("clienteNome");
const clienteEmail = localStorage.getItem("clienteEmail");
const clienteTelefone = localStorage.getItem("clienteTelefone");

const formPerfil = document.getElementById("form-perfil");
const campoNome = document.getElementById("perfil-nome");
const campoTelefone = document.getElementById("perfil-telefone");
const emailCliente = document.getElementById("email-cliente");
const mensagemPerfil = document.getElementById("mensagem-perfil");

if (!clienteToken) {
  window.location.href = "cliente-login.html";
}

campoNome.value = clienteNome || "";
campoTelefone.value = clienteTelefone || "";
emailCliente.textContent = clienteEmail || "";

formPerfil.addEventListener("submit", async function (event) {
  event.preventDefault();

  const dados = {
    nome: campoNome.value,
    telefone: campoTelefone.value
  };

  try {
    const resposta = await apiFetch("http://localhost:8080/api/clientes/perfil", {
      method: "PUT",
      body: JSON.stringify(dados)
    }, "cliente");

    if (!resposta.ok) {
      throw new Error("Erro ao atualizar perfil");
    }

    const clienteAtualizado = await resposta.json();

    localStorage.setItem("clienteNome", clienteAtualizado.nome);
    localStorage.setItem("clienteTelefone", clienteAtualizado.telefone);

    mensagemPerfil.textContent = "Perfil atualizado com sucesso.";
  } catch (erro) {
    console.error("Erro ao atualizar perfil:", erro);
    mensagemPerfil.textContent = "Não foi possível atualizar o perfil.";
  }
});