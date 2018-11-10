package com.tungnt.cloud.repository;

import com.tungnt.cloud.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findAccountByUsername(String username);
}
