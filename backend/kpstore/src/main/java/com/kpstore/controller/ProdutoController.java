package com.kpstore.controller;

import com.kpstore.dto.ProdutoRequestDTO;
import com.kpstore.dto.ProdutoResponseDTO;
import com.kpstore.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProdutoResponseDTO criar(@RequestBody ProdutoRequestDTO dto) {
        return produtoService.criar(dto);
    }

    @GetMapping
    public List<ProdutoResponseDTO> listarTodos() {
        return produtoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ProdutoResponseDTO buscarPorId(@PathVariable String id) {
        return produtoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public ProdutoResponseDTO atualizar(@PathVariable String id, @RequestBody ProdutoRequestDTO dto) {
        return produtoService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable String id) {
        produtoService.deletar(id);
    }
}