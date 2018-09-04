package horacerta.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import horacerta.model.PontoDiario;

public interface PontoDaoCustom {
	
	@Query("SELECT p FROM PontoDiario p WHERE p.dataRegistro >= :dataInicial and p.dataRegistro <= :dataFinal")
	public List<PontoDiario> listar(@Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);

}
