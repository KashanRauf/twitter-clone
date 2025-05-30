package com.kashan.twitter_clone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kashan.twitter_clone.entity.User.User;

public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Attempts to find a user who has the given handle.
     * @param handle of the user.
     * @return An Optional<User> which may or may not have the User with the given handle.
     */
    Optional<User> findByHandle(String handle);
}

