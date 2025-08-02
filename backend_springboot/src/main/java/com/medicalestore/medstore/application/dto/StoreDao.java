package com.medicalestore.medstore.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreDao {
    private String storeName;
    private String ownerName;
    private String ownerEmail;
    private String latitude;
    private String longitude;
    private String storeAddress;
    private Map<String, Object> addressList;
}
