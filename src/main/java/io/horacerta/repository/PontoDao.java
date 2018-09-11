package io.horacerta.repository;


import java.util.Date;

import org.springframework.data.repository.CrudRepository;

import io.horacerta.model.PontoDiario;

public interface PontoDao extends CrudRepository<PontoDiario, Long>,PontoDaoCustom{
	
//   PontoDiario findByDataRegistroAndPessoa(Date dataRegistro, Integer idPessoa);
   PontoDiario findByDataRegistro(Date dataRegistro);
	
}


