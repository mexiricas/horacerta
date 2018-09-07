package io.horacerta.web.rest;

import io.horacerta.model.PontoDiario;
import io.horacerta.repository.PontoDao;
import io.horacerta.service.PontoService;
import io.horacerta.util.Utils;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PontoControler {
	
	@Autowired
	private PontoService pontoService;
	
	@Autowired
   private PontoDao pontoDao;
	
	@RequestMapping(value="/ponto/listagem", method = RequestMethod.POST)
	public List<PontoDiario> listar(@RequestBody Map<String, String> parametros){
		Date dataInicial;
		Date dataFinal;
		try {
			dataFinal = Utils.stringToDate( parametros.get("dataFinal"));
			dataInicial = Utils.stringToDate(parametros.get("dataInicial"));
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
		
		return pontoService.listar(dataInicial, dataFinal);
		
	}
	
	@RequestMapping(value="/ponto", method = RequestMethod.POST)
	public void inserir(@RequestBody PontoDiario ponto) {
		pontoService.inserir(ponto);
		
	}
	
	@RequestMapping(value="/consultar/ponto", method = RequestMethod.POST)
   public PontoDiario consultarPonto(@RequestBody Map<String, Object> parametros) throws ParseException {
	   
	   Date dataRegistro;
	   dataRegistro = Utils.stringToDate((String) parametros.get("dataRegistro"));

	   return pontoDao.findByDataRegistro(dataRegistro);
      
   }
	
	

}
