package com.medicalestore.medstore.domain.model;

import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

@Getter @Setter @EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Store {
    private String id;
    private String ownerId;
    private String storeName;
    private String ownerName;
    private String ownerEmail;
    private String latitude;
    private String longitude;
    private String storeAddress;
    private List<String> storeItem;
    private Map<String, Object> addressList;

}
