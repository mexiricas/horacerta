package horacerta.repository;


import org.springframework.data.repository.CrudRepository;

import horacerta.model.PontoDiario;

public interface PontoDao extends CrudRepository<PontoDiario, Integer>,PontoDaoCustom{
	
	

	
}


