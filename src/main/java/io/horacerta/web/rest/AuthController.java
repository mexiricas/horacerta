package io.horacerta.web.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import io.horacerta.model.Pessoa;
import io.horacerta.model.Usuario;
import io.horacerta.repository.PessoaDao;

@Controller
@RequestMapping("/login")
public class AuthController {
	
	@Autowired
	PessoaDao pessoaDao;
	
	@Autowired
	JdbcUserDetailsManager jdbcUserDetailsManager;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@RequestMapping(value = "/autenticar", method = RequestMethod.GET)
	public String autenticar() {
		return "/login.html";
	}
	
	@RequestMapping(value = "/registrar", method = RequestMethod.POST)
	public void registrar(@RequestParam HashMap<String, String> formParam, HttpServletResponse response) throws IOException {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		Usuario usuario = new Usuario(formParam.get("cadUsername"), passwordEncoder.encode(formParam.get("cadPassword")), authorities);
		
		Pessoa pessoa = new Pessoa();
		pessoa.setCargo(formParam.get("cadCargo"));
		pessoa.setNome(formParam.get("cadNome"));
		pessoa.setUsername(formParam.get("cadUsername"));
		
		try {
			jdbcUserDetailsManager.createUser(usuario);
			pessoaDao.save(pessoa);
		}catch(Exception e) {
			response.sendRedirect("/login.html?error");
		}
		
		response.sendRedirect("/index.html");
		
	}
}
