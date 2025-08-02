package com.medicalestore.medstore.infrastructure.persistence.mongodb.converter;

import org.springframework.stereotype.Component;

import com.medicalestore.medstore.domain.model.Product;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.ProductDocument;

@Component
public class ProductConverter {

    public ProductDocument toDocument(Product product)
    {
        ProductDocument productDocument = new ProductDocument();
        productDocument.setId(product.getId());
        productDocument.setProductDescription(product.getProductDescription());
        productDocument.setProductDetails(product.getProductDetails());
        productDocument.setProductImage(product.getProductImage());
        productDocument.setProductName(product.getProductName());
        productDocument.setProductPrice(product.getProductPrice());
        productDocument.setProductQuantity(product.getProductQuantity());
        productDocument.setStoreId(product.getStoreId());
        productDocument.setStoreName(product.getStoreName());
        return productDocument;

    }

    public Product toDomain(ProductDocument productDocument){
        return new Product(
            productDocument.getId(),
            productDocument.getStoreId(),
            productDocument.getStoreName(),
            productDocument.getProductName(),
            productDocument.getProductDescription(),
            productDocument.getProductImage(),
            productDocument.getProductPrice(),
            productDocument.getProductDetails(),
            productDocument.getProductQuantity()
        );
    }

}
