package com.kpstore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "pedidos")
public class Pedido {

    @Id
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

    private List<ItemPedido> itens;
    private BigDecimal total;

    private LocalDateTime dataPedido;

    public Pedido() {
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

    public List<ItemPedido> getItens() {
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

    public void setItens(List<ItemPedido> itens) {
        this.itens = itens;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public void setDataPedido(LocalDateTime dataPedido) {
        this.dataPedido = dataPedido;
    }

    public static class ItemPedido {
        private String produtoId;
        private String nome;
        private BigDecimal preco;
        private Integer quantidade;
        private String cor;
        private String tamanho;

        public ItemPedido() {
        }

        public String getProdutoId() {
            return produtoId;
        }

        public String getNome() {
            return nome;
        }

        public BigDecimal getPreco() {
            return preco;
        }

        public Integer getQuantidade() {
            return quantidade;
        }

        public String getCor() {
            return cor;
        }

        public String getTamanho() {
            return tamanho;
        }

        public void setProdutoId(String produtoId) {
            this.produtoId = produtoId;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public void setPreco(BigDecimal preco) {
            this.preco = preco;
        }

        public void setQuantidade(Integer quantidade) {
            this.quantidade = quantidade;
        }

        public void setCor(String cor) {
            this.cor = cor;
        }

        public void setTamanho(String tamanho) {
            this.tamanho = tamanho;
        }
    }
}