package com.medicalestore.medstore.infrastructure.persistence.mongodb.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "products")
@Getter @Setter
public class ProductDocument {
    @Id
    private String id;
    private String storeId;
    private String storeName;
    private String productName;
    private String productDescription;
    private String productImage;
    private double productPrice;
    private String productDetails;
    private int productQuantity;
}
