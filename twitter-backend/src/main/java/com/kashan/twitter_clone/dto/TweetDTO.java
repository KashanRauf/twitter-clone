package com.kashan.twitter_clone.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.kashan.twitter_clone.entity.Tweet.Tweet;
import com.kashan.twitter_clone.entity.User.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TweetDTO {
    private Long id;
    private User user;
    private String body;
    private LocalDate postDate;
    // private Boolean hasGif;
    private String gifLink;
    // private Boolean isRetweet;
    private Long original;
    // private Boolean isReply;
    private Long repliesTo;
    private List<User> likedBy = new ArrayList<>();
    private List<User> bookmarkedBy = new ArrayList<>();
        
    // For mapping DTO from tweet
    public TweetDTO(Tweet t) {
        this.id = t.getId();
        // Causes a ConcurrentModificationException
        this.user = new User(t.getUser());
        this.body = t.getBody();
        this.postDate = t.getPostDate();
        this.gifLink = t.getGifLink();
        this.original = t.getOriginal();
        this.repliesTo = t.getRepliesTo();
        this.likedBy = new ArrayList<>(t.getLikedBy());
        this.bookmarkedBy = new ArrayList<>(t.getBookmarkedBy());
    }
}
