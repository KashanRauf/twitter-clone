package com.kashan.twitter_clone.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


// Used solely for testing
@Controller
@RequestMapping("/api/test")
public class TestController {
    @GetMapping
    public @ResponseBody String greeting() {

        return "Hello, World!";
    }
}
