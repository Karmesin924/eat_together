package SWST.eat_together;

import SWST.eat_together.domain.matching.MatchService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class EatTogetherApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(EatTogetherApplication.class, args);
		MatchService matchService = context.getBean(MatchService.class);
		matchService.startMatching();
	}
}
