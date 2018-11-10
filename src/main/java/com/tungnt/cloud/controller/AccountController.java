package com.tungnt.cloud.controller;

import com.tungnt.cloud.entity.Account;
import com.tungnt.cloud.exception.AccountException;
import com.tungnt.cloud.exception.RoleException;
import com.tungnt.cloud.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AccountController {

    final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity createAccount(@RequestBody Account account) throws RoleException.RoleNotExistException, AccountException.AccountExistException {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.createAccount(account));
    }

//    @PostMapping(value = "/register")
//    public ResponseEntity createAccount(@RequestBody Account account) throws RoleException.RoleNotExistException, AccountException.AccountExistException {
//        accountService.createAccount(account);
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }
}
