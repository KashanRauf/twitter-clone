package com.kashan.twitter_clone.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.kashan.twitter_clone.dto.UserDTO;
import com.kashan.twitter_clone.entity.User.User;
import com.kashan.twitter_clone.operation.AuthenticationRequest;
import com.kashan.twitter_clone.operation.AuthenticationResponse;
import com.kashan.twitter_clone.repository.UserRepository;
import com.kashan.twitter_clone.service.AuthenticationService;
import com.kashan.twitter_clone.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    
    private final UserRepository repo;
    private final JwtService jwtService;
    private final AuthenticationManager manager;

    @Override
    public AuthenticationResponse register(UserDTO dto) {
        User registered = repo.save(new User(dto));
        String token = jwtService.generateToken(registered);

        return AuthenticationResponse.builder().token(token).build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(
            request.getHandle(), request.getPassword()
        ));

        // TODO see what kind of exception might be sensible here
        User user = repo.findByHandle(request.getHandle()).orElseThrow();
    }
    
}
