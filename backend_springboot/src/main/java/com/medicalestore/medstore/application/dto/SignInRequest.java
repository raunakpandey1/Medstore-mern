package com.medicalestore.medstore.application.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class SignInRequest {
    private String email;
    private String password;
}
