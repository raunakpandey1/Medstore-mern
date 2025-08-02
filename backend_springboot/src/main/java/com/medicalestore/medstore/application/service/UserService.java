package com.medicalestore.medstore.application.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.medicalestore.medstore.domain.model.User;
import com.medicalestore.medstore.domain.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}