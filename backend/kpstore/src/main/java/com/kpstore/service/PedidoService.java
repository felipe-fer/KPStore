package com.kpstore.service;

import com.kpstore.dto.PedidoItemDTO;
import com.kpstore.dto.PedidoRequestDTO;
import com.kpstore.dto.PedidoResponseDTO;
import com.kpstore.model.Pedido;
import com.kpstore.repository.PedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private static final Logger logger = LoggerFactory.getLogger(PedidoService.class);

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public PedidoResponseDTO criar(PedidoRequestDTO dto) {
        Pedido pedido = new Pedido();

        pedido.setClienteId(dto.getClienteId());
        pedido.setClienteNome(dto.getClienteNome());
        pedido.setClienteEmail(dto.getClienteEmail());

        pedido.setNomeCliente(dto.getNomeCliente());
        pedido.setTelefone(dto.getTelefone());
        pedido.setEndereco(dto.getEndereco());
        pedido.setCidade(dto.getCidade());
        pedido.setFormaEntrega(dto.getFormaEntrega());
        pedido.setFormaPagamento(dto.getFormaPagamento());
        pedido.setObservacoes(dto.getObservacoes());
        pedido.setStatus("PENDENTE");
        pedido.setDataPedido(LocalDateTime.now());

        List<Pedido.ItemPedido> itens = dto.getItens().stream().map(itemDto -> {
            Pedido.ItemPedido item = new Pedido.ItemPedido();
            item.setProdutoId(itemDto.getProdutoId());
            item.setNome(itemDto.getNome());
            item.setPreco(itemDto.getPreco());
            item.setQuantidade(itemDto.getQuantidade());
            item.setCor(itemDto.getCor());
            item.setTamanho(itemDto.getTamanho());
            return item;
        }).collect(Collectors.toList());

        pedido.setItens(itens);

        BigDecimal total = itens.stream()
                .map(item -> item.getPreco().multiply(BigDecimal.valueOf(item.getQuantidade())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        pedido.setTotal(total);

        Pedido salvo = pedidoRepository.save(pedido);

        logger.info("Pedido criado com sucesso. ID: {}", salvo.getId());

        return converterParaResponseDTO(salvo);
    }

    public List<PedidoResponseDTO> listarTodos() {
        logger.info("Listando todos os pedidos");
        return pedidoRepository.findAll()
                .stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    public List<PedidoResponseDTO> listarPedidosDoCliente(String clienteId) {
        logger.info("Listando pedidos do cliente {}", clienteId);

        return pedidoRepository.findByClienteId(clienteId)
                .stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    public PedidoResponseDTO buscarPorId(String id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Pedido não encontrado"
                ));

        logger.info("Pedido encontrado. ID: {}", id);

        return converterParaResponseDTO(pedido);
    }

    public PedidoResponseDTO atualizarStatus(String id, String status) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Pedido não encontrado"
                ));

        pedido.setStatus(status);

        Pedido atualizado = pedidoRepository.save(pedido);

        logger.info("Status do pedido {} atualizado para {}", id, status);

        return converterParaResponseDTO(atualizado);
    }

    private PedidoResponseDTO converterParaResponseDTO(Pedido pedido) {
        List<PedidoItemDTO> itensDto = pedido.getItens().stream().map(item -> {
            PedidoItemDTO dto = new PedidoItemDTO();
            dto.setProdutoId(item.getProdutoId());
            dto.setNome(item.getNome());
            dto.setPreco(item.getPreco());
            dto.setQuantidade(item.getQuantidade());
            dto.setCor(item.getCor());
            dto.setTamanho(item.getTamanho());
            return dto;
        }).collect(Collectors.toList());

        return new PedidoResponseDTO(
                pedido.getId(),
                pedido.getClienteId(),
                pedido.getClienteNome(),
                pedido.getClienteEmail(),
                pedido.getNomeCliente(),
                pedido.getTelefone(),
                pedido.getEndereco(),
                pedido.getCidade(),
                pedido.getFormaEntrega(),
                pedido.getFormaPagamento(),
                pedido.getObservacoes(),
                pedido.getStatus(),
                itensDto,
                pedido.getTotal(),
                pedido.getDataPedido()
        );
    }
}