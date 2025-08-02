package com.medicalestore.medstore.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medicalestore.medstore.application.dto.AddProduct;
import com.medicalestore.medstore.application.exception.ResourceNotFoundException;
import com.medicalestore.medstore.domain.model.Product;
import com.medicalestore.medstore.domain.model.Seller;
import com.medicalestore.medstore.domain.model.Store;
import com.medicalestore.medstore.domain.repository.ProductRepository;
import com.medicalestore.medstore.domain.repository.SellerRepository;
import com.medicalestore.medstore.domain.repository.StoreRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    private final SellerRepository sellerRepository;

    private final StoreRepository storeRepository;

    
    public ProductService(ProductRepository productRepository, SellerRepository sellerRepository, StoreRepository storeRepository) {
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
        this.storeRepository = storeRepository;
    }

    public Product getProductById(String productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public String addProduct(AddProduct productData) {
        // 1. Validate Seller existence
        Seller seller = sellerRepository.findById(productData.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller Not Found"));

        // 2. Validate Store existence
        Store store = storeRepository.findById(productData.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("Store Not Found"));

        Product product = new Product(
            null,
            productData.getStoreId(),
            store.getStoreName(),
            productData.getProductName(),
            productData.getProductDescription(),
            productData.getProductImage(),
            productData.getProductPrice(),
            productData.getProductDetails(),
            productData.getProductQuantity()
        );

        productRepository.save(product);
        return "Product Added Successfully";

    }


    public List<Product> getAllStoreProducts(String storeId){
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found"));

        return productRepository.findByStoreId(storeId);
    }
}

