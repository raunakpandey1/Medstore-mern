package com.medicalestore.medstore.domain.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public abstract class Account {
    private String id;
    private String profileImg;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private List<String> cartItem;
    private String userAddress;
    private String storeId;
    private List<Token> tokens;

    
}
