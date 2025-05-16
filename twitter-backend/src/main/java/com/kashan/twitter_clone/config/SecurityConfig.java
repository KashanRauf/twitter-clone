package com.kashan.twitter_clone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Deprecated code
        // http
        //     .csrf((csrf) -> csrf.disable())
        //     .authorizeHttpRequests()
        //     .requestMatchers("")    // For requests that don't need authentication
        //     .permitAll()
        //     .anyRequest()           // For requests that only authenticated users can perform
        //     .authenticated()
        //     .and()
        //     .sessionManagement()
        //     .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        //     .and()
        //     .authenticationProvider(authenticationProvider)
        //     .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // Will have to adjust so not every authenticated user can access any endpoint
        // E.g. limiting access to endpoints that fetch passwords
        http
            .csrf((csrf) -> csrf.disable())
            .authorizeHttpRequests(requests -> requests
                    // For requests that don't need authentication
                    .requestMatchers("/api/auth/**")
                    .permitAll()
                    // For requests that only authenticated users can perform
                    .anyRequest()
                    .authenticated())
            .sessionManagement(management -> management
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
