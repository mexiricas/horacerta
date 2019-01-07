package io.horacerta.web.rest;

import io.horacerta.model.CustomUserDetail;
import io.horacerta.model.Pessoa;
import io.horacerta.repository.PessoaDao;
import io.horacerta.service.UserDetailService;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Pedro Ribeiro
 *
 */

@RestController
@RequestMapping(value = "/configuracao")
public class ConfiguracaoController {

   @Autowired
   private PessoaDao pessoaDao;

   @Autowired
   UserDetailService userDetailService;

   @RequestMapping(value = "/salvar/pessoa", method = RequestMethod.POST)
   public Pessoa inserirPessoa(@RequestBody Pessoa pessoa) {

      Pessoa p = pessoaDao.findByMeuId(pessoa.getId());

      UserDetails cud = userDetailService.loadUserByUsername(p.getUsername());

      if (p.getUsername() != pessoa.getUsername()) {
         ((CustomUserDetail) cud).getUser().setUsername(pessoa.getUsername());
         userDetailService.criarUsuario(((CustomUserDetail) cud).getUser());
      }
      return pessoaDao.save(pessoa);
   }

   @RequestMapping(value = "/salvar/novasenha", method = RequestMethod.POST)
   public boolean novaSenha(@RequestBody HashMap<String, Object> parametros) {

      UserDetails cud = userDetailService.loadUserByUsername((String) parametros.get("username"));

      if (BCrypt.checkpw((String) parametros.get("senhaAtual"), cud.getPassword())) {

         BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
         String hashedPassword = passwordEncoder.encode((String) parametros.get("novaSenha"));

         ((CustomUserDetail) cud).getUser().setPassword(hashedPassword);

         userDetailService.criarUsuario(((CustomUserDetail) cud).getUser());
         return true;
      }
      return false;
   }
}
