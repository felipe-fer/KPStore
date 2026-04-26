package com.kpstore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "refresh_tokens")
public class RefreshToken {

    @Id
    private String id;

    private String userId;
    private String email;
    private String role;
    private String token;
    private LocalDateTime expiracao;
    private boolean revogado;

    public RefreshToken() {
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getExpiracao() {
        return expiracao;
    }

    public boolean isRevogado() {
        return revogado;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setExpiracao(LocalDateTime expiracao) {
        this.expiracao = expiracao;
    }

    public void setRevogado(boolean revogado) {
        this.revogado = revogado;
    }
}