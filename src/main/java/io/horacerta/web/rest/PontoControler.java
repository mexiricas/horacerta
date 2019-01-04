package io.horacerta.web.rest;

import io.horacerta.model.Pessoa;
import io.horacerta.model.PontoDiario;
import io.horacerta.repository.PessoaDao;
import io.horacerta.repository.PontoDao;
import io.horacerta.service.PontoService;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
public class PontoControler {

   @Autowired
   private PontoService pontoService;

   @Autowired
   private PontoDao pontoDao;

   @Autowired
   private PessoaDao pessoaDao;

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

   @SuppressWarnings("unchecked")
   @RequestMapping(value = "/consultar/ponto/periodo", method = RequestMethod.POST)
   public List<PontoDiario> consultarPonto(@RequestBody Map<String, Object> parametros) throws ParseException {

      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

      Pessoa pessoa = new Pessoa();
      pessoa = pessoaDao.findByUsername((String) ((HashMap<String, Object>) parametros.get("pessoa")).get("username"));

      Date dataIni = sdf.parse(parametros.get("dataIni").toString());
      Date dataFim = sdf.parse(parametros.get("dataFim").toString());

      return (List<PontoDiario>) pontoDao.findByRegistroPeriodo(pessoa, dataIni, dataFim);

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
