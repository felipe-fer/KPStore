package com.kpstore.dto;

public class TokenResponseDTO {

    private String accessToken;
    private String refreshToken;
    private String tipo;

    public TokenResponseDTO() {
    }

    public TokenResponseDTO(String accessToken, String refreshToken, String tipo) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tipo = tipo;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getTipo() {
        return tipo;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}