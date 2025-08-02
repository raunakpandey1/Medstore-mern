package com.medicalestore.medstore.domain.repository;

import java.util.Optional;

import com.medicalestore.medstore.domain.model.Seller;
 
public interface SellerRepository {
    Optional<Seller> findByEmail(String email);
    Seller save(Seller seller);
    Optional<Seller> findById(String id);
}
