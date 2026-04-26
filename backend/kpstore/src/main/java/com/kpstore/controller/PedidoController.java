package com.kpstore.controller;

import com.kpstore.config.JwtPrincipal;
import com.kpstore.dto.AtualizarStatusPedidoDTO;
import com.kpstore.dto.PedidoRequestDTO;
import com.kpstore.dto.PedidoResponseDTO;
import com.kpstore.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PedidoResponseDTO criar(@RequestBody PedidoRequestDTO dto, Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();

        dto.setClienteId(principal.getUserId());
        dto.setClienteEmail(principal.getEmail());

        return pedidoService.criar(dto);
    }

    @GetMapping
    public List<PedidoResponseDTO> listarTodos() {
        return pedidoService.listarTodos();
    }

    @GetMapping("/meus")
    public List<PedidoResponseDTO> listarPedidosDoCliente(Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return pedidoService.listarPedidosDoCliente(principal.getUserId());
    }

    @GetMapping("/{id}")
    public PedidoResponseDTO buscarPorId(@PathVariable String id) {
        return pedidoService.buscarPorId(id);
    }

    @PatchMapping("/{id}/status")
    public PedidoResponseDTO atualizarStatus(@PathVariable String id,
                                             @RequestBody AtualizarStatusPedidoDTO dto) {
        return pedidoService.atualizarStatus(id, dto.getStatus());
    }
}