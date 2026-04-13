package com.kpstore.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoResponseDTO {

    private String id;
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

    public PedidoResponseDTO(String id, String nomeCliente, String telefone, String endereco,
                             String cidade, String formaEntrega, String formaPagamento,
                             String observacoes, String status, List<PedidoItemDTO> itens,
                             BigDecimal total, LocalDateTime dataPedido) {
        this.id = id;
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
}