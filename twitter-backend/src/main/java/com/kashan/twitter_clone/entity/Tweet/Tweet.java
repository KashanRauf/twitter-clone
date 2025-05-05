package com.kashan.twitter_clone.entity.Tweet;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import com.kashan.twitter_clone.dto.TweetDTO;
import com.kashan.twitter_clone.entity.User.User;

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
// @Builder
@Getter
// Probably shouldn't have setters unless I want to make them editable
// In which case I should make only specific fields editable (should also apply to other entity classes btw)
@NoArgsConstructor
@AllArgsConstructor
@Entity
// @IdClass(TweetID.class)
@Table(name = "tweet")
public class Tweet {
    // Booleans redundant since I can just check if null, commented out

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    // @Id
    // @Column(name = "tweeted_by", nullable = false)
    // private Long user;

    @ManyToOne
    @JoinColumn(name = "tweeted_by")
    private User user;

    @Column(name = "body", nullable = false, length = 140)
    private String body;

    @Column(name = "post_date", nullable = false)
    private Date postDate;

    // @Column(name = "has_gif", nullable = false)
    // private Boolean hasGif;

    @Column(name = "gif_link", nullable = true)
    private String gifLink;

    // @Column(name = "is_retweet", nullable = false)
    // private Boolean isRetweet;

    @Column(name = "original", nullable = true)
    private Long original;

    // @Column(name = "is_reply", nullable = false)
    // private Boolean isReply;

    @Column(name = "replies_to", nullable = true)
    private Long repliesTo;

    // Might be more sensible to just have a counter?
    // Inverse mapping of likes/bookmarks from User entity
    @ManyToMany(mappedBy = "likes")
    private Set<User> likedBy = new HashSet<>();

    @ManyToMany(mappedBy = "bookmarks")
    private Set<User> bookmarkedBy = new HashSet<>();

    // For mapping tweet from DTO
    public Tweet(TweetDTO t) {
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
