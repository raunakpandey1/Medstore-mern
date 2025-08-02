package com.medicalestore.medstore.application.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.medicalestore.medstore.application.dto.StoreDao;
import com.medicalestore.medstore.application.exception.ConflictException;
import com.medicalestore.medstore.application.exception.ResourceNotFoundException;
import com.medicalestore.medstore.domain.model.Seller;
import com.medicalestore.medstore.domain.model.Store;
import com.medicalestore.medstore.domain.repository.ProductRepository;
import com.medicalestore.medstore.domain.repository.SellerRepository;
import com.medicalestore.medstore.domain.repository.StoreRepository;
 
 
@Service
public class SellerService {
    private final SellerRepository sellerRepository;

    private final StoreRepository storeRepository;

    private final ProductRepository productRepository;
    
    public SellerService(SellerRepository sellerRepository , StoreRepository storeRepository
    , ProductRepository productRepository) {
        this.sellerRepository = sellerRepository;
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
    }

    public Seller getUserByEmail(String email) {
        return sellerRepository.findByEmail(email)
    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public String registerStore(String pathUserId , StoreDao storeDao)
    {
        Seller seller = sellerRepository.findById(pathUserId)
            .orElseThrow(() -> new ResourceNotFoundException("Seller Not Found"));

        // store.setOwnerId(pathUserId);
        Store store = new Store(
            null,
            pathUserId,
            storeDao.getStoreName(),
            storeDao.getOwnerName(),
            storeDao.getOwnerEmail(),
            storeDao.getLatitude(),
            storeDao.getLongitude(),
            storeDao.getStoreAddress(),
            new ArrayList<>(),
            storeDao.getAddressList()
        );

        Store storeData = storeRepository.save(store);
        seller.setStoreId(storeData.getId());
        sellerRepository.save(seller);
        return "Stored Registered Successfully";
    }

    
}