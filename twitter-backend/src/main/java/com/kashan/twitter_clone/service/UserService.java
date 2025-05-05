package com.kashan.twitter_clone.service;

import java.util.List;

import com.kashan.twitter_clone.dto.UserDTO;

public interface UserService {
    // TODO remove service functions handled elsewhere (e.g. create user)
    UserDTO createUser(UserDTO u);
    UserDTO getUser(Long id);
    List<UserDTO> getAllUsers();
    // What data should be editable/not?
    UserDTO editUser(Long id);
    // More on the DB side, but what should be done with deleted user data?
    void deleteUser(Long id);
}
