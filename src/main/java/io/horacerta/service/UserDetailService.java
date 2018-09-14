package io.horacerta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.horacerta.model.CustomUserDetail;
import io.horacerta.model.Pessoa;
import io.horacerta.model.Users;
import io.horacerta.repository.PessoaDao;
import io.horacerta.repository.UserDao;

@Service
public class UserDetailService implements UserDetailsService{

	@Autowired
	private PessoaDao pessoaDao;
	
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String username){

		Pessoa pessoa = pessoaDao.findByUsername(username);
		Users user = userDao.findByUsername(username);
		
		if(user == null){
			throw new UsernameNotFoundException(username + " não encontrado!");
		}
		
		return new CustomUserDetail(pessoa, user);
		
	}
	
	public void criarUsuario(Users user) {
		userDao.save(user);
	}
	
	public Boolean checarUsuarioExiste(String username) {
		Users user = userDao.findByUsername(username);
		return user != null;
	}

}
