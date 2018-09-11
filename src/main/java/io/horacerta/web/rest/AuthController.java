package io.horacerta.web.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import io.horacerta.model.Authority;
import io.horacerta.model.Pessoa;
import io.horacerta.model.Users;
import io.horacerta.repository.PessoaDao;
import io.horacerta.service.UserDetailService;

@Controller
@RequestMapping("/login")
public class AuthController {

	@Autowired
	PessoaDao pessoaDao;

	@Autowired
	UserDetailService userDetailService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@RequestMapping(value = "/autenticar", method = RequestMethod.GET)
	public String autenticar() {
		return "/login.html";
	}

	@RequestMapping(value = "/registrar", method = RequestMethod.POST)
	public void registrar(@RequestParam HashMap<String, String> formParam, HttpServletResponse response)
			throws IOException {
		Users usuario = new Users(formParam.get("cadUsername"), passwordEncoder.encode(formParam.get("cadPassword")), true);

		List<Authority> authorities = new ArrayList<Authority>();
		authorities.add(new Authority(usuario ,"ROLE_USER"));
		usuario.setAuthorities(authorities);

		Pessoa pessoa = new Pessoa();
		pessoa.setCargo(formParam.get("cadCargo"));
		pessoa.setNome(formParam.get("cadNome"));
		pessoa.setUsername(formParam.get("cadUsername"));

		try {
			userDetailService.createUser(usuario);
			pessoaDao.save(pessoa);
		} catch (Exception e) {
			response.sendRedirect("/login.html?error");
		}

		response.sendRedirect("/index.html");

	}
}
