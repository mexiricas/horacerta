package io.horacerta.repository;

import org.springframework.data.repository.CrudRepository;

import io.horacerta.model.Users;

public interface UserDao extends CrudRepository<Users, Long>{
	
	Users findByUsername(String username);
	
}
