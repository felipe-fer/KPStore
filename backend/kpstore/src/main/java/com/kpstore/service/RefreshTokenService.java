package com.kpstore.service;

import com.kpstore.dto.TokenResponseDTO;
import com.kpstore.model.RefreshToken;
import com.kpstore.repository.RefreshTokenRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository,
                               JwtService jwtService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
    }

    public RefreshToken criar(String userId, String email, String role) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserId(userId);
        refreshToken.setEmail(email);
        refreshToken.setRole(role);
        refreshToken.setToken(jwtService.gerarRefreshToken());
        refreshToken.setExpiracao(LocalDateTime.now().plusDays(7));
        refreshToken.setRevogado(false);

        return refreshTokenRepository.save(refreshToken);
    }

    public TokenResponseDTO renovar(String tokenInformado) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(tokenInformado)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Refresh token inválido"
                ));

        if (refreshToken.isRevogado()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Refresh token revogado"
            );
        }

        if (refreshToken.getExpiracao().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Refresh token expirado"
            );
        }

        String novoAccessToken = jwtService.gerarToken(
                refreshToken.getUserId(),
                refreshToken.getEmail(),
                refreshToken.getRole()
        );

        return new TokenResponseDTO(
                novoAccessToken,
                refreshToken.getToken(),
                "Bearer"
        );
    }

    public void revogar(String tokenInformado) {
        refreshTokenRepository.findByToken(tokenInformado).ifPresent(token -> {
            token.setRevogado(true);
            refreshTokenRepository.save(token);
        });
    }
}