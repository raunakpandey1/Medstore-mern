package com.medicalestore.medstore.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class Product {
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