package com.horacerta.horacerta;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class HoracertaApplicationTests {

	@Test
	public void contextLoads() {
	   
	   String password = "Jose@2019";
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      String hashedPassword = passwordEncoder.encode(password);

      System.out.println(hashedPassword);
	}

}
