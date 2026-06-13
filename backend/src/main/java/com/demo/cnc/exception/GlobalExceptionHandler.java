package com.demo.cnc.exception;

import com.demo.cnc.dto.ApiResponse;
import java.time.format.DateTimeParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequest(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.fail(exception.getMessage()));
    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<ApiResponse<Object>> handleDateParse(DateTimeParseException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.fail("Date values must use yyyy-MM-dd format"));
    }
}
