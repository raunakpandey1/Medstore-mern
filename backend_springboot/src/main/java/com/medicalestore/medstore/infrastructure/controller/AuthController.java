package com.medicalestore.medstore.infrastructure.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicalestore.medstore.application.dto.JwtResponse;
import com.medicalestore.medstore.application.dto.SignInRequest;
import com.medicalestore.medstore.application.dto.SignUpRequest;
import com.medicalestore.medstore.application.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        // We'll assume signUpRequest has a field for role? Or separate endpoints for user and seller?
        // But we have separate endpoints for user and seller signup. So we can create two methods:
        // This one for user
        System.out.println(signUpRequest);
        
        authService.registerUser(signUpRequest);
        return ResponseEntity.ok("User registered successfully");
    }
    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody SignInRequest signInRequest) {
        String jwt = authService.authenticateUser(signInRequest);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }
    // Similarly for store signup and signin
    @PostMapping("/sellersignup")
    public ResponseEntity<?> registerSeller(@RequestBody SignUpRequest signUpRequest) {
        authService.registerSeller(signUpRequest);
        return ResponseEntity.ok("Seller registered successfully");
    }
    @PostMapping("/sellersignin")
    public ResponseEntity<JwtResponse> authenticateSeller(@RequestBody SignInRequest signInRequest) {
        String jwt = authService.authenticateSeller(signInRequest);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }
}
