package com.kpstore.dto;

public class ClienteLoginRequestDTO {

    private String email;
    private String senha;

    public ClienteLoginRequestDTO() {
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}