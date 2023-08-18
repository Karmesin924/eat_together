package SWST.eat_together;

import SWST.eat_together.domain.matching.MatchingAlgorithm;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EatTogetherApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(EatTogetherApplication.class, args);
		MatchingAlgorithm matchingAlgorithm = context.getBean(MatchingAlgorithm.class);
		matchingAlgorithm.startMatchingAsync(); // 이 부분에서 startMatchingAsync 호출
	}
}
