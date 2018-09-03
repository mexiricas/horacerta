package horacerta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@ComponentScan(basePackageClasses = { HoraCerta.class })
@PropertySource(value = "classpath:/application.properties")
public class HoraCerta {

	public static void main(String[] args) {
		SpringApplication.run(HoraCerta.class, args);
	}
}
