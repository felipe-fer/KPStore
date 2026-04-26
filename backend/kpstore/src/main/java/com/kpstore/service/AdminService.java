package com.kpstore.service;

import com.kpstore.dto.AdminLoginRequestDTO;
import com.kpstore.dto.AdminLoginResponseDTO;
import com.kpstore.model.Admin;
import com.kpstore.model.RefreshToken;
import com.kpstore.repository.AdminRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdminService {

    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService,
                        RefreshTokenService refreshTokenService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    public AdminLoginResponseDTO login(AdminLoginRequestDTO dto) {
        Admin admin = adminRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Administrador não encontrado"
                ));

        if (!passwordEncoder.matches(dto.getSenha(), admin.getSenha())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Senha inválida"
            );
        }

        String accessToken = jwtService.gerarToken(admin.getId(), admin.getEmail(), "ADMIN");
        RefreshToken refreshToken = refreshTokenService.criar(admin.getId(), admin.getEmail(), "ADMIN");

        logger.info("Login realizado com sucesso para o admin {}", admin.getEmail());

        return new AdminLoginResponseDTO(
                admin.getId(),
                admin.getEmail(),
                "Login realizado com sucesso",
                accessToken,
                refreshToken.getToken()
        );
    }

    public Admin criarAdmin(AdminLoginRequestDTO dto) {
        if (adminRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Já existe um administrador com este e-mail"
            );
        }

        Admin admin = new Admin();
        admin.setEmail(dto.getEmail());
        admin.setSenha(passwordEncoder.encode(dto.getSenha()));

        Admin salvo = adminRepository.save(admin);

        logger.info("Administrador cadastrado com sucesso: {}", salvo.getEmail());

        return salvo;
    }
}