package com.medicalestore.medstore.application.dto;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddProduct{
    private String sellerId;
    private String storeId;
    private String productName;
    private String productDescription;
    private String productImage;
    private Double productPrice;
    private Integer productQuantity;
    private String productDetails;

    // Getters & Setters
}

