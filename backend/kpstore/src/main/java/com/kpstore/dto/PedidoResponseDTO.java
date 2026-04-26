package com.kpstore.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoResponseDTO {

    private String id;
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
    private String status;
    private List<PedidoItemDTO> itens;
    private BigDecimal total;
    private LocalDateTime dataPedido;

    public PedidoResponseDTO() {
    }

    public PedidoResponseDTO(String id,
                             String clienteId,
                             String clienteNome,
                             String clienteEmail,
                             String nomeCliente,
                             String telefone,
                             String endereco,
                             String cidade,
                             String formaEntrega,
                             String formaPagamento,
                             String observacoes,
                             String status,
                             List<PedidoItemDTO> itens,
                             BigDecimal total,
                             LocalDateTime dataPedido) {
        this.id = id;
        this.clienteId = clienteId;
        this.clienteNome = clienteNome;
        this.clienteEmail = clienteEmail;
        this.nomeCliente = nomeCliente;
        this.telefone = telefone;
        this.endereco = endereco;
        this.cidade = cidade;
        this.formaEntrega = formaEntrega;
        this.formaPagamento = formaPagamento;
        this.observacoes = observacoes;
        this.status = status;
        this.itens = itens;
        this.total = total;
        this.dataPedido = dataPedido;
    }

    public String getId() {
        return id;
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

    public String getStatus() {
        return status;
    }

    public List<PedidoItemDTO> getItens() {
        return itens;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public LocalDateTime getDataPedido() {
        return dataPedido;
    }

    public void setId(String id) {
        this.id = id;
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

    public void setStatus(String status) {
        this.status = status;
    }

    public void setItens(List<PedidoItemDTO> itens) {
        this.itens = itens;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public void setDataPedido(LocalDateTime dataPedido) {
        this.dataPedido = dataPedido;
    }
}