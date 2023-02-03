package com.example.instaLite;


import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.instaLite.models.ERole;
import com.example.instaLite.models.File;
import com.example.instaLite.models.Portfolio;
import com.example.instaLite.models.Role;
import com.example.instaLite.repository.FileRepository;
import com.example.instaLite.repository.RoleRepository;
import com.example.instaLite.sevices.PortfolioService;


@SpringBootApplication 
public class InstaLiteApplication  extends SpringBootServletInitializer  implements CommandLineRunner{

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PortfolioService portfolioService;
	
	@Autowired
	private FileRepository FileRepository;
	
	@Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
	    return builder.sources(InstaLiteApplication.class);
	  }
	
	public static void main(String[] args) {
		SpringApplication.run(InstaLiteApplication.class, args);
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
            	registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD");
            }
        };
    }

	@Override
	public void run(String... args) throws Exception {
		
		Random rd = new Random(); 
	    long id = rd.nextLong();
	  
		//Two Roles
		Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);
		Optional<Role> adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);		
				
		if(userRole.isEmpty()) {
			Role user = new Role(ERole.ROLE_USER);
			roleRepository.save(user);
		}
		if(adminRole.isEmpty()) {
			Role user = new Role(ERole.ROLE_ADMIN);
			roleRepository.save(user);
		}
		
		//Single Portfolio
		Portfolio Portfolio = portfolioService.findByTitle("Potfolio");
		if(Portfolio == null) {
			Portfolio portfolio = new Portfolio("Potfolio", "Potfolio Description");
			portfolioService.save(portfolio);	
		}

	}

}
