package com.tungnt.cloud.service;

import com.tungnt.cloud.entity.Account;
import com.tungnt.cloud.exception.AccountException;
import com.tungnt.cloud.repository.AccountRepository;
import com.tungnt.cloud.repository.RoleRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;

    public UserDetailService( AccountRepository accountRepository, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Account account = accountRepository.findAccountByUsername(username).orElseThrow(AccountException.AccountNotExistException::new);


        return new org.springframework.security.core.userdetails.User(account.getUsername(),
                account.getPassword(),
                Collections.emptyList());

    } catch (AccountException.AccountNotExistException e) {
        e.printStackTrace();
        return null;
    }
    }
}
