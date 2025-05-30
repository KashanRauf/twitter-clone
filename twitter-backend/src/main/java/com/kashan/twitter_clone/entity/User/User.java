package com.kashan.twitter_clone.entity.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kashan.twitter_clone.dto.UserDTO;
import com.kashan.twitter_clone.entity.Tweet.Tweet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Representation of a user for the database.
 * Implements UserDetails.
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = @UniqueConstraint(columnNames = "handle"))
public class User implements UserDetails {
    // TODO Make it so that user data returned from requests doesn't have password included

    /**
     * Unique ID of user, primary key.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    /**
     * Password of user, non-nullable.
     * Has a length of 60 since it uses BCrypt $2a$
     */
    @Column(name = "password", nullable = false, length = 60)
    private String password;

    /**
     * Handle of user, unique, non-nullable, max length of 16.
     */
    @Column(name = "handle", nullable = false, length = 16)
    private String handle;

    /**
     * Display name of user, nullable, max length of 32.
     */
    @Column(name = "display_name", nullable = true, length = 32)
    private String displayName;

    /**
     * Role of user, non-nullable.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    /**
     * Date that account was created, non-nullable.
     */
    @Column(name = "creation", nullable = false)
    private LocalDate creationDateTime;
    
    /**
     * Birth date of user, nullable.
     */
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    // For user's tweet's
    @OneToMany(mappedBy = "user")


    // TODO May want to add this annotation to other fields in User and Tweet later on
    @JsonIgnore 
    private List<Tweet> tweets = new ArrayList<>();

    /* User relations */
    // Mapping
    @ManyToMany
    @JoinTable(
        name = "user_follows", 
        joinColumns = @JoinColumn(name = "follower"),
        inverseJoinColumns = @JoinColumn(name = "followed")
    )
    private List<User> following = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "user_blocks", 
        joinColumns = @JoinColumn(name = "blocker"),
        inverseJoinColumns = @JoinColumn(name = "blocked")
    )
    private List<User> blocked = new ArrayList<>();

    // Inverse mapping
    @ManyToMany(mappedBy = "following")
    private List<User> followers = new ArrayList<>();

    /* Tweet interactions */
    @ManyToMany
    @JoinTable(
        name = "user_likes",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "tweet_id")
    )
    private List<Tweet> likes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "user_bookmarks",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "tweet_id")
    )
    private List<Tweet> bookmarks = new ArrayList<>();

    // Inverse mapping-- done on Tweet entity

    /**
     * Constructor, converts UserDTO to User
     * @param u a UserDTO.
     */
    public User(UserDTO u) {
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

    // Copy constructor
    public User(User u) {
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return handle;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
