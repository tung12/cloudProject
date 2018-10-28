package com.tungnt.cloud.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class RoleException {
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Role not exist ")
    public static class RoleNotExistException extends Exception{
        public RoleNotExistException(){
            super();
        }
        public RoleNotExistException(String message){
            super(message);
        }
    }
}
