package com.kpstore.dto;

import java.util.List;

public class PedidoRequestDTO {

    private String clienteId;
    private String clienteNome;
    private String clienteEmail;

    private String nomeCliente;
    private String telefone;
    private String endereco;
    private String cidade;
    private String formaEntrega;
    private String formaPagamento;
    private String observacoes;

    private List<PedidoItemDTO> itens;

    public PedidoRequestDTO() {
    }

    public String getClienteId() {
        return clienteId;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public String getClienteEmail() {
        return clienteEmail;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getCidade() {
        return cidade;
    }

    public String getFormaEntrega() {
        return formaEntrega;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public List<PedidoItemDTO> getItens() {
        return itens;
    }

    public void setClienteId(String clienteId) {
        this.clienteId = clienteId;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public void setClienteEmail(String clienteEmail) {
        this.clienteEmail = clienteEmail;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setFormaEntrega(String formaEntrega) {
        this.formaEntrega = formaEntrega;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public void setItens(List<PedidoItemDTO> itens) {
        this.itens = itens;
    }
}