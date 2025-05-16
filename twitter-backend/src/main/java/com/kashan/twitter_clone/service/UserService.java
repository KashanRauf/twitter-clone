package com.kashan.twitter_clone.service;

import java.util.List;

import com.kashan.twitter_clone.dto.UserDTO;

/**
 * Interface for user service layer, with methods relating to interacting with Users in the database.
 */
public interface UserService {
    // UserDTO createUser(UserDTO u);
    
    /**
     * Gets the user with the given id if they exist.
     * @param id of the user being fetched.
     * @return A UserDTO representing the user with the given id.
     */
    UserDTO getUser(Long id);
    /**
     * Gets all users that exist in the database.
     * @return A List of UserDTOs for each user.
     */
    List<UserDTO> getAllUsers();
    /**
     * Updates data pertaining to the user with the given id if they exist.
     * @param id of the user being edited.
     * @return A UserDTO with the updated information.
     */
    UserDTO editUser(Long id);
    /**
     * Removes the user with the given id from the database if they exist.
     * @param id of the user being deleted.
     */
    void deleteUser(Long id);
}
