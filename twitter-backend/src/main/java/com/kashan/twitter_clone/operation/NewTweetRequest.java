package com.kashan.twitter_clone.operation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewTweetRequest {
    private String body;
    private String gifLink;
    private Long repliesTo;
    private Long original;
}
