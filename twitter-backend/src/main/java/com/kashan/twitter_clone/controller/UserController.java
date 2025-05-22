package com.kashan.twitter_clone.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kashan.twitter_clone.dto.UserDTO;
import com.kashan.twitter_clone.service.UserService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


/**
 * Controller for user-related API, not including registration or authentication.
 */
@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://127.0.0.1:5173", "http://localhost:5173"})
public class UserController {
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        // System.out.println("Attempted to get user with id: " + id);
        UserDTO got = userService.getUser(id);
        return ResponseEntity.ok(got);
    }

    @GetMapping
    public void getAllUsers() {
        return;
    }

    @PutMapping("/{id}")
    public void editUser(@PathVariable("id") Long id, @RequestBody UserDTO dto) {
        return;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        return;
    }
}
