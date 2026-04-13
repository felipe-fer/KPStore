package com.kpstore.dto;

public class AdminLoginRequestDTO {

    private String email;
    private String senha;

    public AdminLoginRequestDTO() {
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