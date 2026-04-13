const formLogin = document.getElementById("form-login");
const mensagemLogin = document.getElementById("mensagem-login");

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("http://localhost:8080/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    if (!resposta.ok) {
      throw new Error("Credenciais inválidas");
    }

    const admin = await resposta.json();

    localStorage.setItem("adminLogado", "true");
    localStorage.setItem("adminEmail", admin.email);

    window.location.href = "admin-pedidos.html";
  } catch (erro) {
    console.error("Erro no login:", erro);
    mensagemLogin.textContent = "E-mail ou senha inválidos.";
  }
});