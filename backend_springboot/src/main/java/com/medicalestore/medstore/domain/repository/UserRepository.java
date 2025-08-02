package com.medicalestore.medstore.domain.repository;


import java.util.Optional;

import com.medicalestore.medstore.domain.model.User;

public interface  UserRepository {
    Optional<User> findByEmail(String email);
    User save(User user);
    Optional<User> findById(String id);
    void updateCartItem(String userId, String productId);
}
