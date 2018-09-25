package io.horacerta.web.rest;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.horacerta.model.PontoDiario;
import io.horacerta.repository.PontoDao;
import io.horacerta.service.PontoService;
import io.horacerta.util.Utils;

@RestController
public class PontoControler {

	@Autowired
	private PontoService pontoService;

	@Autowired
	private PontoDao pontoDao;

	@RequestMapping(value = "/ponto/listagem", method = RequestMethod.POST)
	public List<PontoDiario> listar(@RequestBody Map<String, String> parametros) {

		Date dataInicial;
		Date dataFinal;
		if (parametros.get("dataFinal") == null || parametros.get("dataInicial") == null) {
			return pontoService.listar();
		} else {
			try {
				dataFinal = Utils.stringToDate(parametros.get("dataFinal"));
				dataInicial = Utils.stringToDate(parametros.get("dataInicial"));
				return pontoService.listar(dataInicial, dataFinal);
			} catch (ParseException e) {
				e.printStackTrace();
				return null;
			}

		}


	}

	@RequestMapping(value = "/ponto", method = RequestMethod.POST)
	public PontoDiario inserir(@RequestBody PontoDiario ponto) throws ParseException {

		if (ponto.getId() == 0) {
			PontoDiario existe = pontoDao.findByDataRegistroAndPessoa(ponto.getDataRegistro(), ponto.getPessoa());
			if (existe == null) {
				return pontoDao.save(ponto);
			} else {
				return null;
			}
		} else {
			return pontoDao.save(ponto);
		}

	}

	@RequestMapping(value = "/consultar/ponto", method = RequestMethod.POST)
	public PontoDiario consultarPonto(@RequestBody PontoDiario ponto) throws ParseException {
		return pontoDao.findByDataRegistroAndPessoa(ponto.getDataRegistro(), ponto.getPessoa());

	}

	@RequestMapping(value = "/consultar/ponto/completo", method = RequestMethod.POST)
	public List<PontoDiario> consultarPontoMes(@RequestBody PontoDiario ponto) throws ParseException {
		return pontoDao.findByPessoaOrderByDataRegistroDesc(ponto.getPessoa());

	}

}
