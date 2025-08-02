package com.medicalestore.medstore.infrastructure.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicalestore.medstore.application.dto.AddProduct;
import com.medicalestore.medstore.application.dto.StoreDao;
import com.medicalestore.medstore.application.service.ProductService;
import com.medicalestore.medstore.application.service.SellerService;
import com.medicalestore.medstore.domain.model.Product;
import com.medicalestore.medstore.domain.model.Seller;
import com.medicalestore.medstore.domain.model.Store;
import com.medicalestore.medstore.domain.model.User;

 
@RestController
@RequestMapping("/api/storedashboard")
public class SellerController {

    public final ProductService productService;
    public final SellerService sellerService;

    SellerController(ProductService productService, SellerService sellerService){
        this.productService = productService;
        this.sellerService = sellerService;
    }
    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/addstoreproduct")
    public ResponseEntity<?> addStoreProduct(@RequestBody AddProduct productData) {
        // logic
        productService.addProduct(productData);
        return ResponseEntity.ok(Map.of("success", true, "message", "Product Added Successfully"));

    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/allstoreproduct")
    public ResponseEntity<?> getAllStoreProducts(@RequestBody String storeId) {
        // logic
        List<Product> products = productService.getAllStoreProducts(storeId);
    
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", "Product data unavailable"));
        }

        return ResponseEntity.ok(Map.of("products", products));
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/orders")
    public ResponseEntity<?> getAllOrderedProducts() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/setting")
    public ResponseEntity<?> getStoreDetails() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/createstore/{userid}")
    public ResponseEntity<?> createStore(@RequestBody StoreDao storeDao, @PathVariable("userid") String userid) {
        // logic
        sellerService.registerStore(userid, storeDao);
        return ResponseEntity.ok(Map.of("success", true, "message", "Store Created Successfully"));
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/getseller")
    public ResponseEntity<?> getSeller() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) auth.getPrincipal()).getUsername();
        Seller seller = sellerService.getUserByEmail(username);
        return ResponseEntity.ok(seller);
    }
}

