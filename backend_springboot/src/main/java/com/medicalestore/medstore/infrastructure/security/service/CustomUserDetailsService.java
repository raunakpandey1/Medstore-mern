package com.medicalestore.medstore.infrastructure.security.service;

import com.medicalestore.medstore.domain.model.User;
import com.medicalestore.medstore.domain.model.Seller;
import com.medicalestore.medstore.domain.repository.UserRepository;
import com.medicalestore.medstore.domain.repository.SellerRepository;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    public CustomUserDetailsService(UserRepository userRepository, SellerRepository sellerRepository) {
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // First try user
        User user = userRepository.findByEmail(email)
                .orElse(null);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
        }
        // Then try seller
        Seller seller = sellerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new org.springframework.security.core.userdetails.User(
                seller.getEmail(),
                seller.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_SELLER"))
        );
    }
}