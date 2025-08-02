package com.medicalestore.medstore.infrastructure.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
 
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.medicalestore.medstore.infrastructure.security.jwt.JwtAuthenticationFilter;
import com.medicalestore.medstore.infrastructure.security.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true) 
public class SecurityConfig {

    
    private final CustomUserDetailsService userDetailsService;

    
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    public SecurityConfig(CustomUserDetailsService userDetailsService, 
    JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        return http.csrf(customizer -> customizer.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/**",           // Allow signup, signin
                    "/swagger-ui/**",         // Allow Swagger UI
                    "/v3/api-docs/**",        // Allow API docs
                    "/swagger-resources/**",
                    "/webjars/**"
                ).permitAll()
                .anyRequest().authenticated()). // All others require auth
                //.oauth2Login(Customizer.withDefaults()); // required for OAuth with Google, Github
                httpBasic(Customizer.withDefaults()).
                sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
            
    }
    

    // Login Request (username + password)
    // ↓
    // AuthenticationManager.authenticate()
    //     ↓
    // Iterates over registered AuthenticationProvider(s)
    //     ↓
    // One provider supports the authentication type
    //     ↓
    // Performs actual authentication (e.g., DB lookup + password match)
    //     ↓
    // Returns authenticated object (with roles, token, etc.)

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider  =  new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

     
    
}