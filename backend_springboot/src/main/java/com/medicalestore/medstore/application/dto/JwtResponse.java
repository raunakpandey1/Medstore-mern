package com.medicalestore.medstore.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Getter
public class JwtResponse {
    private final String token;
}

