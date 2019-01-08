package io.horacerta.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import io.horacerta.model.Users;

public interface UserDao extends CrudRepository<Users, Long>{
	
	Users findByUsername(String username);
	
	@Query(value = "select u.imagem from Users u where u.username = ?1")
	public byte[] findByImage(String username);
	
}
