package com.kashan.twitter_clone.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.kashan.twitter_clone.dto.TweetDTO;
import com.kashan.twitter_clone.repository.TweetRepository;
import com.kashan.twitter_clone.service.JwtService;
import com.kashan.twitter_clone.service.TweetService;

import jakarta.persistence.EntityNotFoundException;

import com.kashan.twitter_clone.entity.Tweet.Tweet;
import com.kashan.twitter_clone.entity.User.User;
import com.kashan.twitter_clone.operation.NewTweetRequest;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class TweetServiceImpl implements TweetService {
    private final TweetRepository repo;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @Override
    public TweetDTO newTweet(NewTweetRequest request, String token) {
        // Find the name of the user
        String name = jwtService.extractUsername(token);
        UserDetails user = userDetailsService.loadUserByUsername(name);

        // Verify token
        if (!jwtService.isTokenValid(token, user)) {
            return null;
        }

        Tweet t = new Tweet(request, (User) user);
        Tweet saved = repo.save(t);

        return new TweetDTO(saved);
    }

    @Override
    public TweetDTO getTweet(Long id) {
        Tweet t = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("No tweet with id: " + id));
        return new TweetDTO(t);
    }

    @Override
    public List<TweetDTO> getAllTweets() {
        List<Tweet> all = repo.findAll();
        return all.stream().map((t) -> new TweetDTO(t)).collect(Collectors.toList());
    }

    // TODO Implement from UserService side
    // @Override
    // public List<TweetDTO> getAllByUser(Long id) {
    //     throw new UnsupportedOperationException("Unimplemented method 'getAllByUser'");
    // }
}
