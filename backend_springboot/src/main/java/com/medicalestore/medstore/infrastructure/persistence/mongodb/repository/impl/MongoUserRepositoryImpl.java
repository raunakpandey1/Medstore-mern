
package com.medicalestore.medstore.infrastructure.persistence.mongodb.repository.impl;

import com.medicalestore.medstore.domain.repository.UserRepository;
import com.medicalestore.medstore.domain.model.User;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.converter.UserConverter;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.UserDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class MongoUserRepositoryImpl implements UserRepository {
    private final SpringDataMongoUserRepository springDataRepo;
    private final UserConverter converter;

    @Autowired
    public MongoUserRepositoryImpl(SpringDataMongoUserRepository springDataRepo, UserConverter converter) {
        this.springDataRepo = springDataRepo;
        this.converter = converter;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return springDataRepo.findByEmail(email)
                .map(converter::toDomain);
    }
    @Override
    public User save(User user) {
        UserDocument document = converter.toDocument(user);
        UserDocument saved = springDataRepo.save(document);
        return converter.toDomain(saved);
    }
    // Other methods...
    @Override
    public Optional<User> findById(String id) {
        return springDataRepo.findByEmail(id)
                .map(converter::toDomain);
    }

    @Override
    public void updateCartItem(String userId, String productId) {
        // springDataRepo.updateCartItem(userId, productId); // or save entire user if needed
    }

}
// We also need the Spring Data repository for UserDocument
interface SpringDataMongoUserRepository extends MongoRepository<UserDocument, String> {
    Optional<UserDocument> findByEmail(String email);
    // void updateCartItem(String userId, String productId);
}