package com.kpstore.dto;

public class AdminLoginResponseDTO {

    private String id;
    private String email;
    private String token;
    private String mensagem;

    public AdminLoginResponseDTO() {
    }

    public AdminLoginResponseDTO(String id, String email, String mensagem, String token) {
        this.id = id;
        this.email = email;
        this.mensagem = mensagem;
        this.token = token;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
    public String getToken() {
    return token;
}
}