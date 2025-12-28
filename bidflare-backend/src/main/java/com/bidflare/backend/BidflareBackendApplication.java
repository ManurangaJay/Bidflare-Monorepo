package com.bidflare.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.TimeZone;

@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
@EnableScheduling
@SpringBootApplication
public class BidflareBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BidflareBackendApplication.class, args);
	}

	@PostConstruct
	public void init() {
		// Setting the timezone to Asia/Colombo (UTC+5:30) to match local development environment
		// This ensures that LocalDateTime is interpreted correctly on the cloud (which defaults to UTC)
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Colombo"));
	}

}
