package com.kashan.twitter_clone.service;

import com.kashan.twitter_clone.dto.UserDTO;
import com.kashan.twitter_clone.operation.AuthenticationRequest;
import com.kashan.twitter_clone.operation.AuthenticationResponse;

public interface AuthenticationService {
    AuthenticationResponse register(UserDTO user);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
