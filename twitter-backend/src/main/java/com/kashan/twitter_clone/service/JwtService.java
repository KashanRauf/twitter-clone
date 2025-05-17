package com.kashan.twitter_clone.service;

import io.jsonwebtoken.Claims;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;

/**
 * Interface of service layer for handling JWTs
 */
public interface JwtService {

    /**
     * Extracts the username (handle) of the user from the token.
     * @param token of an authenticated user.
     * @return A String containing the user's handle.
     */
    String extractUsername(String token);

    /**
     * Extracts the id of the user from the token.
     * @param token of an authenticated user.
     * @return A Long containing the user's id.
     */
    Long extractId(String token);

    /**
     * Extracts Claims of type T from the token
     * @param token of an authenticated user.
     * @param claimsResolver a function with a Claims as input, returning a claim of type T.
     * @return the extracted claim.
     */
    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    /**
     * Generates a new token from the details of a user with no extra claims.
     * @param user a UserDetails object for the user who the token is generated for.
     * @return A String containing the generated token.
     */
    String generateToken(UserDetails user);

    /**
     * Generates a new token from the details of a user with extra claims.
     * @param extraClaims a Map<String, Object> of extra claims.
     * @param user a UserDetails object for the user who the token is generated for.
     * @return A String containing the generated token.
     */
    String generateToken(Map<String, Object> extraClaims, UserDetails user);

    /**
     * Confirms the validity of a token for a user.
     * @param token which is having its validity confirmed.
     * @param user who the token should belong to.
     * @return A boolean, true if the token is valid.
     */
    boolean isTokenValid(String token, UserDetails user);

    /**
     * Checks if a token has expired.
     * @param token being checked.
     * @return A boolean, true if the token has expired.
     */
    boolean isTokenExpired(String token);

    /**
     * Extracts the expiration date of a token.
     * @param token being extracted from.
     * @return A Date which contains the token's expiration.
     */
    Date extractExpiration(String token);
}
