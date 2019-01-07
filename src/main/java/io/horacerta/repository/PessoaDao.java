package io.horacerta.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import io.horacerta.model.Pessoa;

public interface PessoaDao extends CrudRepository<Pessoa, Long>{
	
   Pessoa findByUsername(String username);
   
   @Query(value = "select p from Pessoa p where p.id = ?1")
   public Pessoa findByMeuId(Long id);
   
}
