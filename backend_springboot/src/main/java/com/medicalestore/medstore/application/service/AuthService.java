package com.medicalestore.medstore.application.service;

import com.medicalestore.medstore.application.dto.SignInRequest;
import com.medicalestore.medstore.application.dto.SignUpRequest;
import com.medicalestore.medstore.domain.model.User;
import com.medicalestore.medstore.domain.model.Seller;
import com.medicalestore.medstore.domain.model.Token;
import com.medicalestore.medstore.domain.repository.UserRepository;
import com.medicalestore.medstore.infrastructure.security.jwt.JWTService;
import com.medicalestore.medstore.domain.repository.SellerRepository;

import java.util.ArrayList;
import java.util.List;
 
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.stereotype.Service;

  
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    private final JWTService jwtService;


    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       SellerRepository sellerRepository,
                       JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.jwtService = jwtService;
    }
    public void registerUser(SignUpRequest signUpRequest) {
        // Check if email exists
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }
        if(!signUpRequest.getPassword().equals(signUpRequest.getCpassword())) {
            throw new RuntimeException("Password does not match");
        }
        // Create user
        User user = new User();
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        // Set defaults
        user.setProfileImg("https://cdn.shoplightspeed.com/shops/626275/files/18687152/600x600x1/stickers-northwest-sticker-smiley-face.jpg");
        user.setCartItem(List.of());
        user.setUserAddress("-");
        user.setStoreId("");
        userRepository.save(user);
    }
    public void registerSeller(SignUpRequest signUpRequest) {
        if (sellerRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }
        if(!signUpRequest.getPassword().equals(signUpRequest.getCpassword())) {
            throw new RuntimeException("Password does not match");
        }

        Seller seller = new Seller();
        seller.setFirstname(signUpRequest.getFirstname());
        seller.setLastname(signUpRequest.getLastname());
        seller.setEmail(signUpRequest.getEmail());
        seller.setPassword(encoder.encode(signUpRequest.getPassword()));
        seller.setProfileImg("https://cdn.shoplightspeed.com/shops/626275/files/18687152/600x600x1/stickers-northwest-sticker-smiley-face.jpg"); 
    
        seller.setCartItem(List.of());
        seller.setUserAddress("-");
        seller.setStoreId("");
        sellerRepository.save(seller);
    }


    public String authenticateUser(SignInRequest signInRequest) {
        System.out.print(signInRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getEmail(),
                        signInRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(signInRequest.getEmail());
            // userRepository.findByEmail(signInRequest.getEmail()).ifPresent(user -> {
            //     List<Token> tokenList = user.getTokens();
            //     if (tokenList == null) {
            //         tokenList = new ArrayList<>();
            //     }
            //     Token newToken = new Token(token);
                
            //     tokenList.add(newToken);
            //     user.setTokens(tokenList);
            //     userRepository.save(user);
            // });
            return token;

        } else {
            return "fail";
        }
    }
    public String authenticateSeller(SignInRequest signInRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getEmail(),
                        signInRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(signInRequest.getEmail());
            // sellerRepository.findByEmail(signInRequest.getEmail()).ifPresent(user -> {
            //     List<Token> tokenList = user.getTokens();
            //     if (tokenList == null) {
            //         tokenList = new ArrayList<>();
            //     }
            //     Token newToken = new Token(token);
                
            //     tokenList.add(newToken);
            //     user.setTokens(tokenList);
            //     sellerRepository.save(user);
            // });
            return token;
        } else {
            return "fail";
        }
    }
}