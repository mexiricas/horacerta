package horacerta.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/login")
public class AuthController {
	
	@RequestMapping(value = "/autenticar", method = RequestMethod.GET)
	public String autenticar() {
		return "/login.html";
	}
	
	@RequestMapping(value = "/processar", method = RequestMethod.POST)
	public void processar() {
		//Processar autenticação
	}
}
