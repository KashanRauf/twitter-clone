package com.kashan.twitter_clone.operation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiErrorResponse {
    private HttpStatus status;
    @JsonFormat
    private LocalDateTime timestamp;
    private String errMessage;
    private String debugMessage;
    private List<ApiSubError> subError;

    public ApiErrorResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ApiErrorResponse(HttpStatus status) {
        this();
        this.status = status;
    }

    public ApiErrorResponse(HttpStatus status, Throwable ex) {
        this(status);
        this.errMessage = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }

    public ApiErrorResponse(HttpStatus status, String errMessage, Throwable ex) {
        this(status);
        this.errMessage = errMessage;
        this.debugMessage = ex.getLocalizedMessage();
    }
}
