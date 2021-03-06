package io.horacerta.security.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Conditional;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import io.horacerta.model.CustomUserDetail;
import io.horacerta.model.Pessoa;
import io.horacerta.util.AuthCondition;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
@Conditional(AuthCondition.class)
public class UserDetailFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		
		Cookie[] cookies = httpRequest.getCookies();
		
		String username = null;	
		
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("username")) {
					username = cookie.getValue();
				}
			}
		}
		
		
		if(!currentPrincipalName.equals("anonymousUser") && username == null) {
			Pessoa pessoaLogada = ((CustomUserDetail) authentication.getPrincipal()).getPessoa();
			Cookie usernameCookie = new Cookie("idPessoa", pessoaLogada.getId().toString());	
			httpResponse.addCookie(usernameCookie);
		}
		
		chain.doFilter(request, httpResponse);
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
