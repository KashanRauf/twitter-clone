package com.kashan.twitter_clone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kashan.twitter_clone.entity.User.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByHandle(String handle);
}

