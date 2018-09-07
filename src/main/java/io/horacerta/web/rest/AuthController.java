package io.horacerta.web.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/login")
public class AuthController {
	
	@RequestMapping(value = "/autenticar", method = RequestMethod.GET)
	public String autenticar() {
		return "/login.html";
	}

	@RequestMapping(value = "/registrar", method = RequestMethod.GET)
	public void registrar() {
		//TODO Cadastro de usuários
	}
}
