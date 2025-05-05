package com.kashan.twitter_clone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kashan.twitter_clone.entity.Tweet.Tweet;

public interface TweetRepository extends JpaRepository<Tweet, Long> {}
