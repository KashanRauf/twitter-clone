package com.kashan.twitter_clone.service;

import java.util.List;

import com.kashan.twitter_clone.dto.UserDTO;

public interface UserService {
    // UserDTO createUser(UserDTO u);
    UserDTO getUser(Long id);
    List<UserDTO> getAllUsers();
    UserDTO editUser(Long id);
    void deleteUser(Long id);
}
