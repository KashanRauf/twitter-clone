package com.kashan.twitter_clone.exception;

import java.net.http.HttpHeaders;
import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kashan.twitter_clone.operation.ApiErrorResponse;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.persistence.EntityNotFoundException;


@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    private static ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    public static String responseEntityToJson(ResponseEntity<Object> entity) throws JsonProcessingException {
        if (entity == null) {
            return null;
        }

        return mapper.writeValueAsString(entity);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiErrorResponse errResponse) {
        return new ResponseEntity<>(errResponse, errResponse.getStatus());
    }

    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		String message = "Malformed JSON request body.";
        return buildResponseEntity(new ApiErrorResponse(HttpStatus.BAD_REQUEST, message, ex));
	}

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleResourceNotFound(EntityNotFoundException ex) {
        ApiErrorResponse err = new ApiErrorResponse(HttpStatus.NOT_FOUND);
        err.setErrMessage(ex.getMessage());
        return buildResponseEntity(err);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolation(SQLIntegrityConstraintViolationException ex) {
        ApiErrorResponse err = new ApiErrorResponse(HttpStatus.CONFLICT);
        err.setErrMessage(ex.getMessage());
        return buildResponseEntity(err);
    }

    // TODO Figure out how to handle excpetions in filters
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Object> handleExpiredJwt(ExpiredJwtException ex) {
        String message = "Token expired, must sign sign in again.";
        return buildResponseEntity(new ApiErrorResponse(HttpStatus.UNAUTHORIZED, message, ex));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex) {
        return buildResponseEntity(new ApiErrorResponse(HttpStatus.UNAUTHORIZED, ex));
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<Object> handleSignature(SignatureException ex) {
        return buildResponseEntity(new ApiErrorResponse(HttpStatus.UNAUTHORIZED, ex));
    }
}
