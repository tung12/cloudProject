package com.tungnt.cloud.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ProductException {

    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Sản phẩm không tồn tại")
    public static class ProductNotExistException extends Exception{
        public ProductNotExistException(){
            super();
        }
        public ProductNotExistException(String message){
            super(message);
        }
    }
}
