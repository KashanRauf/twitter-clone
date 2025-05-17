package com.kashan.twitter_clone.operation;

import lombok.AllArgsConstructor;
// import lombok.Builder;
import lombok.Data;
// import lombok.NoArgsConstructor;
import lombok.NoArgsConstructor;

@Data
// @Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewTweetResponse {
    // TODO Make it so that requests aren't just fail/succeed, send response codes with meaningful information. Also need to add proper error handling.
    private String info;
}
