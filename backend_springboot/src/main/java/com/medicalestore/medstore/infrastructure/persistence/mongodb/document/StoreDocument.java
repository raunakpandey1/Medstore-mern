package com.medicalestore.medstore.infrastructure.persistence.mongodb.document;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "stores")
@Getter
@Setter
public class StoreDocument {

    @Id
    private String id;
    private String storeName;
    private String ownerName;
    private String ownerEmail;
    private String storeAddress;
    private String latitude;
    private String longitude;
    private String ownerId;
    private List<String> storeItem;
    private Map<String, Object> addressList;

    // Getters and Setters
}

