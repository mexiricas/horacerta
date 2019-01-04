package io.horacerta.repository;

import org.springframework.data.repository.CrudRepository;

import io.horacerta.model.Pessoa;

public interface PessoaDao extends CrudRepository<Pessoa, Long>{
	
   Pessoa findByUsername(String username);
}
