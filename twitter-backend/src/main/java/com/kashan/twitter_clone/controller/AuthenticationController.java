package com.kashan.twitter_clone.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kashan.twitter_clone.dto.UserDTO;
import com.kashan.twitter_clone.operation.AuthenticationRequest;
import com.kashan.twitter_clone.operation.AuthenticationResponse;
import com.kashan.twitter_clone.service.AuthenticationService;

import lombok.RequiredArgsConstructor;


/**
 * Controller for authentication-related API
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerNewUser(@RequestBody UserDTO user) {
        return ResponseEntity.ok(authenticationService.register(user));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticateUser(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
    
}
