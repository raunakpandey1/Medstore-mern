package com.medicalestore.medstore.domain.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class Order {
    private String id;
    private String customerId;
    private String deliveryAddress;
    private String customerName;
    private String storeId;
    private String productId;
    private String status;
    private int quantity;
    private double totalPrice;
    private LocalDateTime createdAt;
}