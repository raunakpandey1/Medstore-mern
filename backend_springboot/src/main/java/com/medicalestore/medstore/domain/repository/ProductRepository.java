package com.medicalestore.medstore.domain.repository;

import java.util.List;
import java.util.Optional;

import com.medicalestore.medstore.domain.model.Product;

public interface ProductRepository {
    Optional<Product> findById(String productId);
    Product save(Product product);
    List<Product> findByStoreId(String storeId);
}
