package com.medicalestore.medstore.infrastructure.persistence.mongodb.repository.impl;


 
import com.medicalestore.medstore.domain.repository.SellerRepository;
import com.medicalestore.medstore.domain.repository.UserRepository;
import com.medicalestore.medstore.domain.model.Seller;
import com.medicalestore.medstore.domain.model.User;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.converter.SellerConverter;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.converter.UserConverter;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.SellerDocument;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.UserDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class MongoSellerRepositoryImpl implements SellerRepository{
    private final SpringDataMongoSellerRepository springDataRepo;
    private final SellerConverter converter;

    @Autowired
    public MongoSellerRepositoryImpl(SpringDataMongoSellerRepository springDataRepo, SellerConverter converter) {
        this.springDataRepo = springDataRepo;
        this.converter = converter;
    }

    @Override
    public Optional<Seller> findByEmail(String email) {
        return springDataRepo.findByEmail(email)
                .map(converter::toDomain);
    }
    @Override
    public Seller save(Seller seller) {
        SellerDocument document = converter.toDocument(seller);
        SellerDocument saved = springDataRepo.save(document);
        return converter.toDomain(saved);
    }
    // Other methods...
    @Override
    public Optional<Seller> findById(String id) {
        return springDataRepo.findById(id)
                .map(converter::toDomain);
    }
}
// We also need the Spring Data repository for SellerDocument
interface SpringDataMongoSellerRepository extends MongoRepository<SellerDocument, String> {
    Optional<SellerDocument> findByEmail(String email);
}