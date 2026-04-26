package com.kpstore.service;

import com.kpstore.dto.ClienteAtualizarRequestDTO;
import com.kpstore.dto.ClienteCadastroRequestDTO;
import com.kpstore.dto.ClienteLoginRequestDTO;
import com.kpstore.dto.ClienteLoginResponseDTO;
import com.kpstore.model.Cliente;
import com.kpstore.model.RefreshToken;
import com.kpstore.repository.ClienteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClienteService {

    private static final Logger logger = LoggerFactory.getLogger(ClienteService.class);

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public ClienteService(ClienteRepository clienteRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService,
                          RefreshTokenService refreshTokenService) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    public Cliente cadastrar(ClienteCadastroRequestDTO dto) {
        if (clienteRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Já existe um cliente com este e-mail"
            );
        }

        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setSenha(passwordEncoder.encode(dto.getSenha()));
        cliente.setTelefone(dto.getTelefone());

        Cliente salvo = clienteRepository.save(cliente);

        logger.info("Cliente cadastrado com sucesso: {}", salvo.getEmail());

        return salvo;
    }

    public ClienteLoginResponseDTO login(ClienteLoginRequestDTO dto) {
        Cliente cliente = clienteRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Cliente não encontrado"
                ));

        if (!passwordEncoder.matches(dto.getSenha(), cliente.getSenha())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Senha inválida"
            );
        }

        String accessToken = jwtService.gerarToken(cliente.getId(), cliente.getEmail(), "USER");
        RefreshToken refreshToken = refreshTokenService.criar(cliente.getId(), cliente.getEmail(), "USER");

        logger.info("Login realizado com sucesso para o cliente {}", cliente.getEmail());

        return new ClienteLoginResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                "Login realizado com sucesso",
                accessToken,
                refreshToken.getToken()
        );
    }

    public Cliente atualizarPerfil(String clienteId, ClienteAtualizarRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Cliente não encontrado"
                ));

        cliente.setNome(dto.getNome());
        cliente.setTelefone(dto.getTelefone());

        Cliente atualizado = clienteRepository.save(cliente);

        logger.info("Perfil do cliente atualizado: {}", atualizado.getEmail());

        return atualizado;
    }
}