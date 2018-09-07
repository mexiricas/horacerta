package io.horacerta.repository;


import io.horacerta.model.PontoDiario;

import java.util.Date;

import org.springframework.data.repository.CrudRepository;

public interface PontoDao extends CrudRepository<PontoDiario, Integer>,PontoDaoCustom{
	
   PontoDiario findByDataRegistro(Date dataRegistro);
	
}


