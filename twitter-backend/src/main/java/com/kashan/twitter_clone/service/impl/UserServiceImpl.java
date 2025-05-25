package com.kashan.twitter_clone.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.kashan.twitter_clone.dto.UserDTO;
import com.kashan.twitter_clone.entity.User.User;
import com.kashan.twitter_clone.repository.UserRepository;
import com.kashan.twitter_clone.service.UserService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository repo;

    // Now provided by AuthenticationService's registerNewUser()
    // @Override
    // public UserDTO createUser(UserDTO u) {
    //     User saved = repo.save(new User(u));
    //     return new UserDTO(saved);
    // }

    @Override
    public UserDTO getUser(Long id) {
        User u = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Failed to find user with id: " + id));
        return new UserDTO(u);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> all = repo.findAll();
        return all.stream().map((u) -> new UserDTO(u)).collect(Collectors.toList());
    }

    @Override
    public UserDTO editUser(Long id) {
        // Only the handle, display name, birthday should be changeable from here
        // id and creation date can't be changed
        // Role changing should be handled from admin-specific endpoints
        // Password changing needs to be handled with care, likely use a different endpoint

        throw new UnsupportedOperationException("Unimplemented method 'editUser'");
    }

    // More on the DB side, but what should be done with deleted user data?
    // Also are there security checks that need to be done first?
    @Override
    public void deleteUser(Long id) {
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }
    
}
