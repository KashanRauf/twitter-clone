package com.kashan.twitter_clone.dto;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

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
    private Date creationDateTime;
    private Date birthDate;
    private Set<Tweet> tweets = new HashSet<>();
    private Set<User> following = new HashSet<>();
    private Set<User> blocked = new HashSet<>();
    private Set<Tweet> likes = new HashSet<>();
    private Set<Tweet> bookmarks = new HashSet<>();
    private Set<User> followers = new HashSet<>();

    /* I should learn if this is the exact same as using a mapper and how it is secure */

    // For mapping DTO from user
    public UserDTO(User u) {
        this.id = u.getId();
        this.password = u.getPassword();
        this.handle = u.getHandle();
        this.displayName = u.getDisplayName();
        this.role = u.getRole();
        this.creationDateTime = new Date(u.getCreationDateTime().getTime());
        this.birthDate = new Date(u.getBirthDate().getTime());
        this.tweets = new HashSet<>(u.getTweets());
        this.following = new HashSet<>(u.getFollowing());
        this.blocked = new HashSet<>(u.getBlocked());
        this.likes = new HashSet<>(u.getLikes());
        this.bookmarks = new HashSet<>(u.getBookmarks());
        this.followers = new HashSet<>(u.getFollowers());
    }
}
