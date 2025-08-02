package com.medicalestore.medstore.application.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class SignUpRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String cpassword;
    // We can add role if we want, but we are using separate endpoints so role is implied.
}