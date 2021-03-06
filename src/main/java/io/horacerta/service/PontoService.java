package io.horacerta.service;

import io.horacerta.model.PontoDiario;
import io.horacerta.repository.PontoDao;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PontoService {

	@Autowired
	private PontoDao pontoDao;


//	public List<PontoDiario> listar(Date dataInicial, Date dataFinal){
//		return pontoDao.findByDataRegistroBetween(dataInicial, dataFinal);
//	}

	public List<PontoDiario> listar(){
		return (List<PontoDiario>) pontoDao.findAll();
	}

	public void inserir(PontoDiario ponto) {
		pontoDao.save(ponto);
	}

}
