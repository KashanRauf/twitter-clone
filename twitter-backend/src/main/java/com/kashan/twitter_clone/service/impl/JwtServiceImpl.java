package com.kashan.twitter_clone.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.kashan.twitter_clone.entity.User.User;
import com.kashan.twitter_clone.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JwtServiceImpl implements JwtService {

    // In an actual project this should be handled in a way that doesn't end up with the secret key on github
    private static final String SECRET_KEY = "035a8ce1977410801941d2f9e7c9d91e5f4d40d235e41c898e2c6511308c8eef";

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Long extractId(String token) {
        return extractClaim(token, this::getId);
    }

    private Long getId(Claims claims) {
        return claims.get("id", Long.class);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails user) {
        return generateToken(new HashMap<>(), user);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails user) {
        // Cast 'user' to a User to access necessary data
        User u = (User) user;
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(u.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                // Determines how long until the token expires
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                // Additional claims
                .claim("id", u.getId())
                .claim("display", u.getDisplayName())
                .claim("birthDate", u.getBirthDate().toString())
                .signWith(getSignInKey(), Jwts.SIG.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails user) {
        final String username = extractUsername(token);
        return username.equals(user.getUsername()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build().parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
