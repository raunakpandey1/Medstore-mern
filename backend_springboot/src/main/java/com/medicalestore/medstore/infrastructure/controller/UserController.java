package com.medicalestore.medstore.infrastructure.controller;

 
import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicalestore.medstore.application.service.UserService;
import com.medicalestore.medstore.domain.model.User;
 
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/getuser")
    public ResponseEntity<?> getUser() {
        // logic
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) auth.getPrincipal()).getUsername();
        User user = userService.getUserByEmail(username);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/additemtocart")
    public ResponseEntity<?> addItemToCart() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/getallcartitem")
    public ResponseEntity<?> getAllCartItem() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/removeitemfromcart")
    public ResponseEntity<?> removeItemFromCart() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/buyproduct")
    public ResponseEntity<?> buyProduct() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/getorderhistory")
    public ResponseEntity<?> getOrderHistory() {
        // logic
        return ResponseEntity.ok(200);
    }

    @PostMapping("/searchproduct")
    public ResponseEntity<?> searchProduct() {
        // public
        return ResponseEntity.ok(200);
    }

    @GetMapping("/getrandomproducts")
    public ResponseEntity<?> getRandomProducts() {
        // public
        return ResponseEntity.ok(200);
    }

    @GetMapping("/getsingleproduct/{productId}")
    public ResponseEntity<?> getSingleProduct(@PathVariable String productId) {
        // public
        return ResponseEntity.ok(200);
    }
}
