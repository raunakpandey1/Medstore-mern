package com.medicalestore.medstore.domain.repository;

import java.util.Optional;

import com.medicalestore.medstore.domain.model.Store;

public interface StoreRepository {
    Store save(Store store);
    Optional<Store> findById(String id);
}
