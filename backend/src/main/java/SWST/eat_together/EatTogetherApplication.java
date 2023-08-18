package SWST.eat_together;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EatTogetherApplication {

	public static void main(String[] args) {
		SpringApplication.run(EatTogetherApplication.class, args);
	}
}
