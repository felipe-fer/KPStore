function obterTokenAdmin() {
  return localStorage.getItem("adminToken");
}

function obterRefreshTokenAdmin() {
  return localStorage.getItem("adminRefreshToken");
}

function obterTokenCliente() {
  return localStorage.getItem("clienteToken");
}

function obterRefreshTokenCliente() {
  return localStorage.getItem("clienteRefreshToken");
}

function limparSessaoAdmin() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminRefreshToken");
  localStorage.removeItem("adminEmail");
}

function limparSessaoCliente() {
  localStorage.removeItem("clienteToken");
  localStorage.removeItem("clienteRefreshToken");
  localStorage.removeItem("clienteId");
  localStorage.removeItem("clienteNome");
  localStorage.removeItem("clienteEmail");
  localStorage.removeItem("clienteTelefone");
}

function redirecionarParaLoginSeSemToken() {
  const token = obterTokenAdmin();

  if (!token) {
    window.location.href = "admin-login.html";
  }
}

async function renovarToken(tipoUsuario) {
  const refreshToken =
    tipoUsuario === "admin"
      ? obterRefreshTokenAdmin()
      : obterRefreshTokenCliente();

  if (!refreshToken) {
    throw new Error("Refresh token não encontrado");
  }

  const resposta = await fetch("http://localhost:8080/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível renovar o token");
  }

  const dados = await resposta.json();

  if (tipoUsuario === "admin") {
    localStorage.setItem("adminToken", dados.accessToken);
  } else {
    localStorage.setItem("clienteToken", dados.accessToken);
  }

  return dados.accessToken;
}

async function apiFetch(url, options = {}, tipoUsuario = "admin") {
  const tokenAtual =
    tipoUsuario === "admin"
      ? obterTokenAdmin()
      : obterTokenCliente();

  const headers = {
    ...(options.headers || {})
  };

  if (tokenAtual) {
    headers.Authorization = `Bearer ${tokenAtual}`;
  }

  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  let resposta = await fetch(url, {
    ...options,
    headers
  });

  if (resposta.status === 401) {
    try {
      const novoToken = await renovarToken(tipoUsuario);

      const novosHeaders = {
        ...(options.headers || {})
      };

      novosHeaders.Authorization = `Bearer ${novoToken}`;

      if (!(options.body instanceof FormData) && !novosHeaders["Content-Type"]) {
        novosHeaders["Content-Type"] = "application/json";
      }

      resposta = await fetch(url, {
        ...options,
        headers: novosHeaders
      });
    } catch (erro) {
      if (tipoUsuario === "admin") {
        limparSessaoAdmin();
        window.location.href = "admin-login.html";
      } else {
        limparSessaoCliente();
        window.location.href = "cliente-login.html";
      }

      throw new Error("Sessão expirada");
    }
  }

  if (resposta.status === 403) {
    if (tipoUsuario === "admin") {
      limparSessaoAdmin();
      window.location.href = "admin-login.html";
    } else {
      limparSessaoCliente();
      window.location.href = "cliente-login.html";
    }

    throw new Error("Acesso negado");
  }

  return resposta;
}