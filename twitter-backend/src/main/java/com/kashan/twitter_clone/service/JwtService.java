package com.kashan.twitter_clone.service;

import io.jsonwebtoken.Claims;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String extractUsername(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    String generateToken(UserDetails user);

    String generateToken(Map<String, Object> extraClaims, UserDetails user);

    boolean isTokenValid(String token, UserDetails user);

    boolean isTokenExpired(String token);

    Date extractExpiration(String token);
}
