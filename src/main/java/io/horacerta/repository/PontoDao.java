package io.horacerta.repository;


import io.horacerta.model.Pessoa;
import io.horacerta.model.PontoDiario;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PontoDao extends CrudRepository<PontoDiario, Long>{
   
   PontoDiario findByDataRegistroAndPessoa(Date dataRegistro, Pessoa pessoa);
   
   PontoDiario findByDataRegistro(Date dataRegistro);

   List<PontoDiario> findByPessoaOrderByDataRegistroDesc(Pessoa pessoa);
   
   public List<PontoDiario> findByDataRegistroBetween(Date dataInicial, Date dataFinal);
   
	
}


