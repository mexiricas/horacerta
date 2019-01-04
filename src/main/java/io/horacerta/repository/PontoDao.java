package io.horacerta.repository;


import io.horacerta.model.Pessoa;
import io.horacerta.model.PontoDiario;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PontoDao extends CrudRepository<PontoDiario, Long>{
   
   PontoDiario findByDataRegistroAndPessoa(Date dataRegistro, Pessoa pessoa);
   
   PontoDiario findByDataRegistro(Date dataRegistro);

   List<PontoDiario> findByPessoaOrderByDataRegistroDesc(Pessoa pessoa);
   
   @Query(value = "select p from PontoDiario p where p.pessoa = ?1 and p.dataRegistro between ?2 and ?3")
   public List<PontoDiario> findByRegistroPeriodo(Object pessoa, Object dataInicial, Object dataFinal);
   
	
}


