package com.kashan.twitter_clone.entity.Tweet;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kashan.twitter_clone.dto.TweetDTO;
import com.kashan.twitter_clone.entity.User.User;
import com.kashan.twitter_clone.operation.NewTweetRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tweet")
public class Tweet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tweeted_by")
    @JsonIgnore
    private User user;

    @Column(name = "body", nullable = false, length = 140)
    private String body;

    @Column(name = "post_date", nullable = false)
    private LocalDate postDate;

    @Column(name = "gif_link", nullable = true)
    private String gifLink;

    @Column(name = "original", nullable = true)
    private Long original;

    @Column(name = "replies_to", nullable = true)
    private Long repliesTo;

    // Inverse mapping of likes/bookmarks from User entity
    @ManyToMany(mappedBy = "likes")
    private List<User> likedBy = new ArrayList<>();

    @ManyToMany(mappedBy = "bookmarks")
    private List<User> bookmarkedBy = new ArrayList<>();

    // For mapping tweet from DTO
    public Tweet(TweetDTO t) {
        this.id = t.getId();
        this.user = new User(t.getUser());
        this.body = t.getBody();
        this.postDate = t.getPostDate();
        this.gifLink = t.getGifLink();
        this.original = t.getOriginal();
        this.repliesTo = t.getRepliesTo();
        this.likedBy = new ArrayList<>(t.getLikedBy());
        this.bookmarkedBy = new ArrayList<>(t.getBookmarkedBy());
    }

    public Tweet(NewTweetRequest t, User u) {
        this.user = u;
        this.body = t.getBody();
        this.postDate = LocalDate.now();
        this.gifLink = t.getGifLink();
        this.original = t.getOriginal();
        this.repliesTo = t.getRepliesTo();
        this.likedBy = new ArrayList<>();
        this.bookmarkedBy = new ArrayList<>();
    }
}
