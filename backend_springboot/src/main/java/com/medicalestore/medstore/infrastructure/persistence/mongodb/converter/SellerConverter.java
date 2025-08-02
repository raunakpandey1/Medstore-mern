package com.medicalestore.medstore.infrastructure.persistence.mongodb.converter;

 

import org.springframework.stereotype.Component;

import com.medicalestore.medstore.domain.model.Seller;
 
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.SellerDocument;
 
 
import java.util.stream.Collectors;

@Component
public class SellerConverter {
    public SellerDocument toDocument(Seller seller) {
        SellerDocument document = new SellerDocument();
        document.setId(seller.getId());
        document.setProfileImg(seller.getProfileImg());
        document.setFirstname(seller.getFirstname());
        document.setLastname(seller.getLastname());
        document.setEmail(seller.getEmail());
        document.setPassword(seller.getPassword());
        document.setCartItem(seller.getCartItem());
        // document.setSellerAddress(seller.getSellerAddress());
        document.setStoreId(seller.getStoreId());
        // Convert tokens
        if (seller.getTokens() != null) {
         document.setTokens(
             seller.getTokens().stream()
                 .map(token -> {
                     SellerDocument.Token t = new SellerDocument.Token();
                     t.setToken(token.getToken());
                     return t;
                 })
                 .collect(Collectors.toList())
         );
        }
        return document;
    }
    public Seller toDomain(SellerDocument document) {
        Seller seller = new Seller();
        seller.setId(document.getId());
        seller.setProfileImg(document.getProfileImg());
        seller.setFirstname(document.getFirstname());
        seller.setLastname(document.getLastname());
        seller.setEmail(document.getEmail());
        seller.setPassword(document.getPassword());
        seller.setCartItem(document.getCartItem());
        // seller.setSellerAddress(document.getSellerAddress());
        seller.setStoreId(document.getStoreId());
        // Convert tokens
        if (document.getTokens() != null) {
         seller.setTokens(
             document.getTokens().stream()
                 .map(t -> new com.medicalestore.medstore.domain.model.Token(t.getToken()))
                 .collect(Collectors.toList())
         );
        }
        return seller;
    }
}
