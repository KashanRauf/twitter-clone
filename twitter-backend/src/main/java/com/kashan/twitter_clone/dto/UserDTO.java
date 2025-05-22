package com.kashan.twitter_clone.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.kashan.twitter_clone.entity.Tweet.Tweet;
import com.kashan.twitter_clone.entity.User.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Getter
// @Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String password;
    private String handle;
    private String displayName;
    private UserRole role;
    private LocalDate creationDateTime;
    private LocalDate birthDate;
    private List<Tweet> tweets = new ArrayList<>();
    private List<User> following = new ArrayList<>();
    private List<User> blocked = new ArrayList<>();
    private List<Tweet> likes = new ArrayList<>();
    private List<Tweet> bookmarks = new ArrayList<>();
    private List<User> followers = new ArrayList<>();

    /* I should learn if this is the exact same as using a mapper and how it is secure */

    // For mapping DTO from user
    public UserDTO(User u) {
        this.id = u.getId();
        this.password = u.getPassword();
        this.handle = u.getHandle();
        this.displayName = u.getDisplayName();
        this.role = u.getRole();
        this.creationDateTime = u.getCreationDateTime();
        this.birthDate = u.getBirthDate();
        this.tweets = new ArrayList<>(u.getTweets());
        this.following = new ArrayList<>(u.getFollowing());
        this.blocked = new ArrayList<>(u.getBlocked());
        this.likes = new ArrayList<>(u.getLikes());
        this.bookmarks = new ArrayList<>(u.getBookmarks());
        this.followers = new ArrayList<>(u.getFollowers());
    }
}
