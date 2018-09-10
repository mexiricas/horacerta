package io.horacerta.repository;


import io.horacerta.model.Pessoa;
import io.horacerta.model.PontoDiario;

import java.util.Date;

import org.springframework.data.repository.CrudRepository;

public interface PontoDao extends CrudRepository<PontoDiario, Integer>,PontoDaoCustom{
	
//   PontoDiario findByDataRegistroAndPessoa(Date dataRegistro, Integer idPessoa);
   PontoDiario findByDataRegistro(Date dataRegistro);
	
}


