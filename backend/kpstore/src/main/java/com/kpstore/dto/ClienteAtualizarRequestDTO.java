package com.kpstore.dto;

public class ClienteAtualizarRequestDTO {

    private String nome;
    private String telefone;

    public ClienteAtualizarRequestDTO() {
    }

    public String getNome() {
        return nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}