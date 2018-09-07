package io.horacerta.security;
//package horacerta.config;

//import javax.sql.DataSource;


//@Configuration
//@EnableWebSecurity
//public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {
//
//	@Autowired
//	private DataSource dataSource;
//
//	@Autowired
//	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		auth.jdbcAuthentication().dataSource(dataSource)
//				.passwordEncoder(new BCryptPasswordEncoder());
//	}
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		 http
//         .authorizeRequests()
//             .antMatchers("/*.jpg", "/*.png").permitAll()
//             .anyRequest().authenticated()
//             .and()
//         .formLogin()
//             .loginPage("/login/autenticar")
//             .permitAll()
//             .defaultSuccessUrl("/")
//         .and()
//         	.logout().deleteCookies("username")              
//         	.permitAll()
//         .and()
//         	.csrf().disable();
//	}
//	
//	
//
//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		 web.ignoring().antMatchers("/resources/**");
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//}
