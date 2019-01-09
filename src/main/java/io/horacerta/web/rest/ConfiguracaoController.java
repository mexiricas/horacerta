package io.horacerta.web.rest;

import io.horacerta.model.CustomUserDetail;
import io.horacerta.model.Pessoa;
import io.horacerta.repository.PessoaDao;
import io.horacerta.repository.UserDao;
import io.horacerta.service.UserDetailService;

import java.io.FileNotFoundException;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
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
   private UserDao userDao;

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

   @RequestMapping(value = "/salvar/imagem", method = RequestMethod.POST)
   public boolean salvarImagem(@RequestBody HashMap<String, Object> parametros) throws FileNotFoundException {

      byte[] bytes = ((String) parametros.get("imagem")).getBytes();

      UserDetails cud = userDetailService.loadUserByUsername((String) parametros.get("username"));

      ((CustomUserDetail) cud).getUser().setImagem(bytes);

      userDetailService.criarUsuario(((CustomUserDetail) cud).getUser());
      return true;
   }

   @RequestMapping(value = "/montar/imagem", method = RequestMethod.POST)
   public HashMap<String, String> montarImagem(@RequestBody HashMap<String, Object> parametros) {
      byte[] bytes = (byte[]) userDao.findByImage((String) parametros.get("username"));

      HashMap<String, String> map = new HashMap<>();

      if (bytes != null) {
         String base64 = new String(bytes);

         map.put("base64", base64);
         return map;
      } else {
         map.put("base00", null);
         return map;
      }

   }
}
