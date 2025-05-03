package com.kashan.twitter_clone.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kashan.twitter_clone.dto.UserDTO;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    // public ResponseEntity<UserDTO> getUser(Integer userID) {
    //
    // }
}
