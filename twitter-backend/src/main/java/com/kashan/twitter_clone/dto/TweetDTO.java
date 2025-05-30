package com.kashan.twitter_clone.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.kashan.twitter_clone.entity.Tweet.Tweet;
import com.kashan.twitter_clone.entity.User.User;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TweetDTO {
    private Long id;
    private UserDTO user;
    private String body;
    private LocalDate postDate;
    private String gifLink;
    private Long original;
    private Long repliesTo;
    private List<User> likedBy = new ArrayList<>();
    private List<User> bookmarkedBy = new ArrayList<>();
        
    // For mapping DTO from tweet
    public TweetDTO(Tweet t) {
        this.id = t.getId();
        this.user = new UserDTO(t.getUser());
        this.body = t.getBody();
        this.postDate = t.getPostDate();
        this.gifLink = t.getGifLink();
        this.original = t.getOriginal();
        this.repliesTo = t.getRepliesTo();
        this.likedBy = new ArrayList<>(t.getLikedBy());
        this.bookmarkedBy = new ArrayList<>(t.getBookmarkedBy());
    }
}
