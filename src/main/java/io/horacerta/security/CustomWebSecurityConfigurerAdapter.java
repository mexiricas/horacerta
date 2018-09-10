package io.horacerta.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;


@Configuration
@EnableWebSecurity
public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

	@Autowired
	private DataSource dataSource;
	
	@Value("${spring.profiles.active}")
	private String profile;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		
		auth
			.userDetailsService(getJdbcUserDetailsManager())
			.passwordEncoder(new BCryptPasswordEncoder())
		.and()
			.jdbcAuthentication()
			.dataSource(dataSource)
			.passwordEncoder(new BCryptPasswordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		if(this.profile.equals("desenvolvedor")) {
			http
				.authorizeRequests()
				.antMatchers("/**")
				.permitAll()
			.and()
				.csrf().disable();
		}
		else {

			 http
	         .authorizeRequests()
	             .antMatchers("/*.jpg", "/*.png", "/login/**").permitAll()
	             .anyRequest().authenticated()
	             .and()
	         .formLogin()
	             .loginPage("/login/autenticar")
	             .permitAll()
	             .defaultSuccessUrl("/")
	         .and()
	         	.logout().deleteCookies("username")              
	         	.permitAll()
	         .and()
	         	.csrf().disable();
		}
		
	}
	
	

	@Override
	public void configure(WebSecurity web) throws Exception {
		 web.ignoring().antMatchers("/resources/**");
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public JdbcUserDetailsManager getJdbcUserDetailsManager() {
		JdbcUserDetailsManager userDetailsService = new JdbcUserDetailsManager();
		userDetailsService.setDataSource(dataSource);
		return userDetailsService;
	}

}
