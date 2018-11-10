package com.tungnt.cloud.service;

import com.tungnt.cloud.entity.Account;
import com.tungnt.cloud.entity.Role;
import com.tungnt.cloud.exception.AccountException;
import com.tungnt.cloud.exception.RoleException;
import com.tungnt.cloud.repository.AccountRepository;
import com.tungnt.cloud.repository.RoleRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.tungnt.cloud.constant.RoleConstant.ROLE_DEFAULT;

@Service
public class AccountService {


    final AccountRepository accountRepository;
    final BCryptPasswordEncoder bCryptPasswordEncoder;
    final RoleRepository roleRepository;

    public AccountService(AccountRepository accountRepository, BCryptPasswordEncoder bCryptPasswordEncoder, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.roleRepository = roleRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public Account createAccount(Account account) throws RoleException.RoleNotExistException, AccountException.AccountExistException {
        if (accountRepository.findAccountByUsername(account.getUsername()).isPresent()) throw new AccountException.AccountExistException();
        Role role = roleRepository.findRolesByRoleName(ROLE_DEFAULT).orElseThrow(RoleException.RoleNotExistException::new);
        account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));
        account.setRoleId(role.getId());
        return accountRepository.saveAndFlush(account);
    }
}
