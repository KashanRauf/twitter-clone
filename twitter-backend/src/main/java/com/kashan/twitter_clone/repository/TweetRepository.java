package com.kashan.twitter_clone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kashan.twitter_clone.entity.Tweet.Tweet;
import java.util.List;


public interface TweetRepository extends JpaRepository<Tweet, Long> {
    List<Tweet> findByUserId(Long userId);
}
