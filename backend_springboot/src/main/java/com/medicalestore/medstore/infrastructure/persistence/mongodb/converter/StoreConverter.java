package com.medicalestore.medstore.infrastructure.persistence.mongodb.converter;


import org.springframework.stereotype.Component;

import com.medicalestore.medstore.domain.model.Store;
import com.medicalestore.medstore.infrastructure.persistence.mongodb.document.StoreDocument;

@Component
public class StoreConverter {

    public StoreDocument toDocument(Store store) {
        StoreDocument doc = new StoreDocument();
        // doc.setId(store.getId());
        doc.setStoreName(store.getStoreName());
        doc.setOwnerName(store.getOwnerName());
        doc.setOwnerEmail(store.getOwnerEmail());
        doc.setStoreAddress(store.getStoreAddress());
        doc.setLatitude(store.getLatitude());
        doc.setLongitude(store.getLongitude());
        doc.setOwnerId(store.getOwnerId());
        doc.setStoreItem(store.getStoreItem());
        doc.setAddressList(store.getAddressList());
        return doc;
    }


    public Store toDomain(StoreDocument doc) {
        return new Store(
            doc.getId(),
            doc.getOwnerId(),
            doc.getStoreName(),
            doc.getOwnerName(),
            doc.getOwnerEmail(),
            doc.getLatitude(),
            doc.getLongitude(),
            doc.getStoreAddress(),
            doc.getStoreItem(),
            doc.getAddressList()
        );
    }
}
