package com.example.instaLite.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.instaLite.models.Portfolio;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
	
	Portfolio findByTitle(String title);
	
	public List<Portfolio> findAll();
	
}
