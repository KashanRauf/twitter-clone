package com.kashan.twitter_clone.service;

import java.util.List;

import com.kashan.twitter_clone.dto.TweetDTO;
import com.kashan.twitter_clone.operation.NewTweetRequest;

public interface TweetService {
    TweetDTO newTweet(NewTweetRequest request, String token);
    TweetDTO getTweet(Long id);
    List<TweetDTO> getAllTweets();
    List<TweetDTO> getAllByUser(Long id);
}
