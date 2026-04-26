package com.kpstore.controller;

import com.kpstore.dto.RefreshTokenRequestDTO;
import com.kpstore.dto.TokenResponseDTO;
import com.kpstore.service.RefreshTokenService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class AuthController {

    private final RefreshTokenService refreshTokenService;

    public AuthController(RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/refresh")
    public TokenResponseDTO refresh(@RequestBody RefreshTokenRequestDTO dto) {
        return refreshTokenService.renovar(dto.getRefreshToken());
    }

    @PostMapping("/logout")
    public void logout(@RequestBody RefreshTokenRequestDTO dto) {
        refreshTokenService.revogar(dto.getRefreshToken());
    }
}