package com.kpstore.service;

import com.kpstore.dto.AdminLoginRequestDTO;
import com.kpstore.dto.AdminLoginResponseDTO;
import com.kpstore.model.Admin;
import com.kpstore.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AdminLoginResponseDTO login(AdminLoginRequestDTO dto) {
        Admin admin = adminRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));

        if (!passwordEncoder.matches(dto.getSenha(), admin.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.gerarToken(admin.getEmail());

        return new AdminLoginResponseDTO(
                admin.getId(),
                admin.getEmail(),
                "Login realizado com sucesso",
                token
        );
    }

    public Admin criarAdmin(AdminLoginRequestDTO dto) {
        Admin admin = new Admin();
        admin.setEmail(dto.getEmail());
        admin.setSenha(passwordEncoder.encode(dto.getSenha()));
        return adminRepository.save(admin);
    }
}