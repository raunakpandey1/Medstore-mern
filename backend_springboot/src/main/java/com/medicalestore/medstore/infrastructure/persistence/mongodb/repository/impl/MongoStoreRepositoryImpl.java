package com.medicalestore.medstore.infrastructure.persistence.mongodb.repository.impl;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.medicalestore.medstore.domain.model.Product;
import com.medicalestore.medstore.domain.model.Store;
import com.medicalestore.medstore.domain.repository.StoreRepository;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.converter.StoreConverter;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.StoreDocument;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MongoStoreRepositoryImpl implements StoreRepository {

    private final SpringDataStoreMongoRepository mongoRepository;
    private final StoreConverter converter;

    @Override
    public Store save(Store store) {
        StoreDocument doc = converter.toDocument(store);
        StoreDocument saved = mongoRepository.save(doc);
        return converter.toDomain(saved);
    }

    @Override
    public Optional<Store> findById(String id) {
        return mongoRepository.findById(id)
                .map(converter::toDomain);
    }
}

 
interface SpringDataStoreMongoRepository extends MongoRepository<StoreDocument, String> {
}

