package com.kashan.twitter_clone.entity.User;

import java.sql.Date;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = @UniqueConstraint(columnNames = "handle"))
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "handle", nullable = false, length = 16)
    private String handle;

    @Column(name = "display_name", nullable = true, length = 50)
    private String displayName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Temporal(TemporalType.DATE)
    @Column(name = "creation", nullable = false)
    private Date creationDateTime;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "birth_date", nullable = true)
    private Date birthDate;

    // For user's tweet's
    @OneToMany(mappedBy = "user")
    private Set<Tweet> tweets = new HashSet<>();

    /* User relations */
    // Mapping
    @ManyToMany
    @JoinTable(
        name = "user_follows", 
        joinColumns = @JoinColumn(name = "follower"),
        inverseJoinColumns = @JoinColumn(name = "followed")
    )
    private Set<User> following = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "user_blocks", 
        joinColumns = @JoinColumn(name = "blocker"),
        inverseJoinColumns = @JoinColumn(name = "blocked")
    )
    private Set<User> blocked = new HashSet<>();

    // Inverse mapping
    @ManyToMany(mappedBy = "following")
    private Set<User> followers = new HashSet<>();

    /* Tweet interactions */
    @ManyToMany
    @JoinTable(
        name = "user_likes",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "tweet_id")
    )
    private Set<Tweet> likes = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "user_bookmarks",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "tweet_id")
    )
    private Set<Tweet> bookmarks = new HashSet<>();

    // Inverse mapping-- done on Tweet entity

    // For mapping user from DTO
    public User(UserDTO u) {
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
