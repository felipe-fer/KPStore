package com.kpstore.controller;

import com.kpstore.config.JwtPrincipal;
import com.kpstore.dto.ClienteAtualizarRequestDTO;
import com.kpstore.dto.ClienteCadastroRequestDTO;
import com.kpstore.dto.ClienteLoginRequestDTO;
import com.kpstore.dto.ClienteLoginResponseDTO;
import com.kpstore.model.Cliente;
import com.kpstore.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("/registrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente cadastrar(@RequestBody ClienteCadastroRequestDTO dto) {
        return clienteService.cadastrar(dto);
    }

    @PostMapping("/login")
    public ClienteLoginResponseDTO login(@RequestBody ClienteLoginRequestDTO dto) {
        return clienteService.login(dto);
    }

    @PutMapping("/perfil")
    public Cliente atualizarPerfil(@RequestBody ClienteAtualizarRequestDTO dto,
                                   Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return clienteService.atualizarPerfil(principal.getUserId(), dto);
    }
}