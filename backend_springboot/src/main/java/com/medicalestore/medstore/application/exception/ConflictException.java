package com.medicalestore.medstore.application.exception;

public class ConflictException extends RuntimeException {
    public ConflictException(String msg) {
        super(msg);
    }
}
