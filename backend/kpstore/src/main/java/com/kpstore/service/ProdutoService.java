package com.kpstore.service;

import com.kpstore.dto.ProdutoRequestDTO;
import com.kpstore.dto.ProdutoResponseDTO;
import com.kpstore.model.Produto;
import com.kpstore.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public ProdutoResponseDTO criar(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        produto.setNome(dto.getNome());
        produto.setCategoria(dto.getCategoria());
        produto.setPreco(dto.getPreco());
        produto.setDescricao(dto.getDescricao());
        produto.setImagem(dto.getImagem());
        produto.setCores(dto.getCores());
        produto.setTamanhos(dto.getTamanhos());

        Produto salvo = produtoRepository.save(produto);
        return converterParaResponseDTO(salvo);
    }

    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository.findAll()
                .stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    public ProdutoResponseDTO buscarPorId(String id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return converterParaResponseDTO(produto);
    }

    public ProdutoResponseDTO atualizar(String id, ProdutoRequestDTO dto) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setNome(dto.getNome());
        produto.setCategoria(dto.getCategoria());
        produto.setPreco(dto.getPreco());
        produto.setDescricao(dto.getDescricao());
        produto.setImagem(dto.getImagem());
        produto.setCores(dto.getCores());
        produto.setTamanhos(dto.getTamanhos());

        Produto atualizado = produtoRepository.save(produto);
        return converterParaResponseDTO(atualizado);
    }

    public void deletar(String id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produtoRepository.delete(produto);
    }

    private ProdutoResponseDTO converterParaResponseDTO(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getCategoria(),
                produto.getPreco(),
                produto.getDescricao(),
                produto.getImagem(),
                produto.getCores(),
                produto.getTamanhos()
        );
    }
}