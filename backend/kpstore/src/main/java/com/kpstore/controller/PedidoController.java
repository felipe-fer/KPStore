package com.kpstore.controller;

import com.kpstore.dto.AtualizarStatusPedidoDTO;
import com.kpstore.dto.PedidoRequestDTO;
import com.kpstore.dto.PedidoResponseDTO;
import com.kpstore.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PedidoResponseDTO criar(@RequestBody PedidoRequestDTO dto) {
        return pedidoService.criar(dto);
    }

    @GetMapping
    public List<PedidoResponseDTO> listarTodos() {
        return pedidoService.listarTodos();
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