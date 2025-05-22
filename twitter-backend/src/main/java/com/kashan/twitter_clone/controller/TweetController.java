package com.kashan.twitter_clone.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kashan.twitter_clone.dto.TweetDTO;
import com.kashan.twitter_clone.operation.NewTweetRequest;
import com.kashan.twitter_clone.operation.NewTweetResponse;
import com.kashan.twitter_clone.service.TweetService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@AllArgsConstructor
@RestController
@RequestMapping("/api/tweets")
@CrossOrigin(origins = {"http://127.0.0.1:5173", "http://localhost:5173"})
public class TweetController {
    private final TweetService tweetService;

    @PostMapping("/new")
    public NewTweetResponse newTweet(@RequestHeader("Authorization") String token,  @RequestBody NewTweetRequest request) {
        token = token.substring(7);
        TweetDTO dto = tweetService.newTweet(request, token);

        return new NewTweetResponse("Tweet posted at: " + dto.getPostDate().toString());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TweetDTO> getTweet(@PathVariable("id") Long id) {
        TweetDTO t = tweetService.getTweet(id);

        return ResponseEntity.ok(t);
    }

    @GetMapping
    public ResponseEntity<List<TweetDTO>> getAllTweets() {
        List<TweetDTO> all = tweetService.getAllTweets();
        return ResponseEntity.ok(all);
    }
    
    
}
