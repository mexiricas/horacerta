package io.horacerta.repository;


import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import io.horacerta.model.PontoDiario;

public interface PontoDao extends CrudRepository<PontoDiario, Long>{
//   PontoDiario findByDataRegistroAndPessoa(Date dataRegistro, Integer idPessoa);
   PontoDiario findByDataRegistro(Date dataRegistro);
   
   public List<PontoDiario> findByDataRegistroBetween(Date dataInicial, Date dataFinal);
	
}


