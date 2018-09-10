package io.horacerta.model;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class Usuario implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String username;
	private String password;
	private List<GrantedAuthority> authorities;
	
	public Usuario (String username, String password, List<GrantedAuthority> authorities) {
		this.username = username;
		this.password = password;
		this.authorities = authorities;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<GrantedAuthority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	
	
}
