package com.kpstore.controller;

import com.kpstore.dto.AdminLoginRequestDTO;
import com.kpstore.dto.AdminLoginResponseDTO;
import com.kpstore.model.Admin;
import com.kpstore.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/teste")
    public String teste() {
        return "API admin funcionando";
    }

    @PostMapping("/login")
    public AdminLoginResponseDTO login(@RequestBody AdminLoginRequestDTO dto) {
        System.out.println("CHAMOU /api/admin/login para: " + dto.getEmail());
        return adminService.login(dto);
    }

    @PostMapping("/registrar")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin registrar(@RequestBody AdminLoginRequestDTO dto) {
        System.out.println("CHAMOU /api/admin/registrar para: " + dto.getEmail());
        return adminService.criarAdmin(dto);
    }
}