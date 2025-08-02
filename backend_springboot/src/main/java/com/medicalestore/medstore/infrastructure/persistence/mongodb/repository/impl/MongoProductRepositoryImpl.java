package com.medicalestore.medstore.infrastructure.persistence.mongodb.repository.impl;
 
 
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.medicalestore.medstore.domain.model.Product;
import com.medicalestore.medstore.domain.repository.ProductRepository;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.converter.ProductConverter;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.ProductDocument;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MongoProductRepositoryImpl implements ProductRepository {

    private final SpringDataProductMongoRepository mongoRepository;
    private final ProductConverter converter;

    @Override
    public Optional<Product> findById(String id) {
        return mongoRepository.findById(id)
                .map(converter::toDomain);
    }

    @Override
    public Product save(Product product) {
        ProductDocument doc = converter.toDocument(product);
        ProductDocument saved = mongoRepository.save(doc);
        return converter.toDomain(saved);
    }

    @Override
    public List<Product> findByStoreId(String storeId) {
        return mongoRepository.findByStoreId(storeId)
                .stream()
                .map(converter::toDomain)
                .toList();
    }
}

 
interface SpringDataProductMongoRepository extends MongoRepository<ProductDocument, String> {
    List<ProductDocument> findByStoreId(String storeId);
}

