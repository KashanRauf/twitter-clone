package com.kashan.twitter_clone.dto;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

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
    private Date postDate;
    // private Boolean hasGif;
    private String gifLink;
    // private Boolean isRetweet;
    private Long original;
    // private Boolean isReply;
    private Long repliesTo;
    private Set<User> likedBy = new HashSet<>();
    private Set<User> bookmarkedBy = new HashSet<>();
        
    // For mapping DTO from tweet
    public TweetDTO(Tweet t) {
        this.id = t.getId();
        this.user = t.getUser();
        this.body = t.getBody();
        this.postDate = t.getPostDate();
        this.gifLink = t.getGifLink();
        this.original = t.getOriginal();
        this.repliesTo = t.getRepliesTo();
        this.likedBy = new HashSet<>(t.getLikedBy());
        this.bookmarkedBy = new HashSet<>(t.getBookmarkedBy());
    }
}
