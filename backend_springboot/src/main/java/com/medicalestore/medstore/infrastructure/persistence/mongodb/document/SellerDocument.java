package com.medicalestore.medstore.infrastructure.persistence.mongodb.document;
 
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(collection = "sellers")
@Getter
@Setter
public class SellerDocument {
    @Id
    private String id;
    private String profileImg;
    private String firstname;
    private String lastname;

    @Indexed(unique = true)
    private String email;
    private String password;
    private List<String> cartItem;
    private String sellerAddress;
    private String storeId;
    private List<Token> tokens;

    @Getter
    @Setter
    public static class Token {
        private String token;
    }

}

