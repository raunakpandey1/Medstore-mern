package com.medicalestore.medstore.infrastructure.persistence.mongodb.converter;


import org.springframework.stereotype.Component;

import com.medicalestore.medstore.domain.model.User;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.UserDocument;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserConverter {
    public UserDocument toDocument(User user) {
        UserDocument document = new UserDocument();
        document.setId(user.getId());
        document.setProfileImg(user.getProfileImg());
        document.setFirstname(user.getFirstname());
        document.setLastname(user.getLastname());
        document.setEmail(user.getEmail());
        document.setPassword(user.getPassword());
        document.setCartItem(user.getCartItem());
        document.setUserAddress(user.getUserAddress());
        document.setStoreId(user.getStoreId());
        // Convert tokens
        if (user.getTokens() != null) {
         document.setTokens(
             user.getTokens().stream()
                 .map(token -> {
                     UserDocument.Token t = new UserDocument.Token();
                     t.setToken(token.getToken());
                     return t;
                 })
                 .collect(Collectors.toList())
         );
        }
        return document;
    }
    public User toDomain(UserDocument document) {
        User user = new User();
        user.setId(document.getId());
        user.setProfileImg(document.getProfileImg());
        user.setFirstname(document.getFirstname());
        user.setLastname(document.getLastname());
        user.setEmail(document.getEmail());
        user.setPassword(document.getPassword());
        user.setCartItem(document.getCartItem());
        user.setUserAddress(document.getUserAddress());
        user.setStoreId(document.getStoreId());
        // Convert tokens
        if (document.getTokens() != null) {
         user.setTokens(
             document.getTokens().stream()
                 .map(t -> new com.medicalestore.medstore.domain.model.Token(t.getToken()))
                 .collect(Collectors.toList())
         );
        }
        return user;
    }
}
