package com.kpstore.dto;

public class ClienteLoginResponseDTO {

    private String id;
    private String nome;
    private String email;
    private String mensagem;
    private String token;
    private String refreshToken;

    public ClienteLoginResponseDTO() {
    }

    public ClienteLoginResponseDTO(String id, String nome, String email, String mensagem, String token, String refreshToken) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public String getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getMensagem() {
        return mensagem;
    }

    public String getToken() {
        return token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}