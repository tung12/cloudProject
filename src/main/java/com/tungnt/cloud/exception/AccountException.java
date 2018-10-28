package com.tungnt.cloud.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class AccountException {
    @ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Tài khoản đã tồn tại")
    public static class AccountExistException extends Exception{
        public AccountExistException(){
            super();
        }
        public AccountExistException(String message){
            super(message);
        }
    }

    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Tài khoản không tồn tại")
    public static class AccountNotExistException extends Exception{
        public AccountNotExistException(){
            super();
        }
        public AccountNotExistException(String message){
            super(message);
        }
    }
}
