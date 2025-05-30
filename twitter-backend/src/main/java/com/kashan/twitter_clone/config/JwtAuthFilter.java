package com.kashan.twitter_clone.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kashan.twitter_clone.exception.RestExceptionHandler;
import com.kashan.twitter_clone.service.JwtService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Autowired
    private RestExceptionHandler exceptionHandler;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String token;
        final String userHandle;

        // Preliminary check if there is any Bearer token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Attempts to extract token, 7 because that's where the token starts after "Bearer "
            token = authHeader.substring(7);
            userHandle = jwtService.extractUsername(token); // Throws a SignatureException or ExpiredJwtException

            if (userHandle != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails user = this.userDetailsService.loadUserByUsername(userHandle);

                // If the token is valid, updates the security context holder, otherwise it drops a nuclear bomb (throws AccessDenied)
                jwtService.validTokenOrElseThrow(token, user);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            filterChain.doFilter(request, response);
        } catch (SignatureException e) {
            ResponseEntity<Object> exResponse = exceptionHandler.handleSignature(e);
            doErrResponse(response, exResponse);
        } catch (ExpiredJwtException e) {
            ResponseEntity<Object> exResponse = exceptionHandler.handleExpiredJwt(new ExpiredJwtException(null, null, "Token has expired"));
            doErrResponse(response, exResponse);
        } catch (AccessDeniedException e) {
            // TODO Not throwing because it only checks the validity of username?
            ResponseEntity<Object> exResponse = exceptionHandler.handleAccessDenied(new AccessDeniedException("Token is invalid."));
            doErrResponse(response, exResponse);
        }
    }

    private void doErrResponse(HttpServletResponse response, ResponseEntity<Object> entity) throws IOException {
        response.setStatus(entity.getStatusCode().value());
        response.getWriter().write(RestExceptionHandler.responseEntityToJson(entity));
    }
}
