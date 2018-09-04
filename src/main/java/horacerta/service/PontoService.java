package horacerta.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import horacerta.model.PontoDiario;
import horacerta.repository.PontoDao;


@Service
public class PontoService {
	
	@Autowired
	private PontoDao pontoDao;
	
	
	public List<PontoDiario> listar(Date dataInicial, Date dataFinal){
		return pontoDao.listar(dataInicial, dataFinal);
		
	}
	
	public void inserir(PontoDiario ponto) {
		pontoDao.save(ponto);
	}

}
