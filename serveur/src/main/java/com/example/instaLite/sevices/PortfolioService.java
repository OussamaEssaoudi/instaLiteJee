package com.example.instaLite.sevices;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.instaLite.models.Portfolio;
import com.example.instaLite.payload.response.MessageResponse;
import com.example.instaLite.exception.ApiRequestException;
import com.example.instaLite.models.EAccess;
import com.example.instaLite.models.File;
import com.example.instaLite.repository.PortfolioRepository;
import com.example.instaLite.util.FileUtility;
import com.example.instaLite.repository.FileRepository;


@Service
public class PortfolioService {

	@Autowired
	private PortfolioRepository PortfolioRepository;
	
	@Autowired
	private FileRepository FileRepository;

		
	public List<Portfolio> findAllPortfolios() {
		return PortfolioRepository.findAll();
	}

	public Optional<Portfolio> findPortfolioById(Long id) {
		return PortfolioRepository.findById(id);
	}

	public Portfolio savePortfolio(Portfolio newPortfolio) {

		Portfolio Portfolio = PortfolioRepository.save(newPortfolio);
		return Portfolio;

	}
	

	public Portfolio updatePortfolio(Long id, Portfolio Portfolio) {

		Optional<Portfolio> retrievedPortfolio = PortfolioRepository.findById(id);
		if (retrievedPortfolio == null)
			try {
				throw new Exception("Portfolio not found");
			} catch (Exception e) {
				e.printStackTrace();
			}

		PortfolioRepository.save(Portfolio);
		return PortfolioRepository.findById(id).get();

	}
	
	public void save(Portfolio Portfolio) {
		PortfolioRepository.save(Portfolio);
	}

	public Portfolio deletePortfolio(Long Id) {

		Optional<Portfolio> retrievedPortfolio = PortfolioRepository.findById(Id);
		if (retrievedPortfolio == null)
			try {
				throw new Exception("User not found");
			} catch (Exception e) {
				e.printStackTrace();
			}
		PortfolioRepository.deleteById(Id);
		return retrievedPortfolio.get();
	}

	public Portfolio findByTitle(String string) {
		return PortfolioRepository.findByTitle(string);
	}
	
	
	public String uploadImage(String path, MultipartFile file, String extension, String title, String description,EAccess access) throws IOException {
		
	    long number = (long)(new Random().nextDouble()*1234567L);
		String type = null;
		Portfolio Portfolio = this.findByTitle("Potfolio");
		
		//Fullpath
		String filePath = path + number ;
	
		if(extension.equals(".jpeg") || extension.equals(".jpg") || extension.equals(".png")) {
			type = "image/png";
		}else if(extension.equals(".mp4")) {
			type = "video/mp4";
		}
		Set<File> files = new HashSet<>();
		File FileContent = new File( number,
				                     title,
				                     description,
									 type,
									 filePath,
									 FileUtility.compressFile(file.getBytes()),
									 Portfolio,
									 access
								    );
		files.add(FileContent);	
		FileRepository.save(FileContent);
		return filePath;
	}

	
	@Transactional
	public String uploadFile(Long id, String title, String description, String access, MultipartFile File) throws IOException {
		
		final Optional<File> dbFile = FileRepository.findById(id);
		String response = null;
			
		if (!dbFile.isPresent()) {
			return response = "File Not Found !";
		}
		
		if(access != null && (!access.equals(EAccess.Private.toString())  &&  !access.equals(EAccess.Hidden.toString()) && !access.equals(EAccess.Public.toString()))){
			return response = "Access type is invalid, please choose from these types :"+EAccess.Hidden.toString()+"-"+EAccess.Private.toString()+"-"+EAccess.Public.toString();
		}
		
//		if(dbFile.get().getTitle().equals(title) ||
//		   dbFile.get().getDescription().equals(description) || 
//		   dbFile.get().getAccess().equals(access) || 
//		   Arrays.equals(dbFile.get().getImage(), FileUtility.compressFile(File.getBytes()))
//		   ) {
//			return response = "Title or description or access or File must be different than the current ones !";
//		}
		
		if(title != null) {
			dbFile.get().setTitle(title);
			response = "File Updated";
		}
		
		if(description != null) {
			dbFile.get().setDescription(description);
			response = "File Updated";
		}
		
		if(access != null) {
			dbFile.get().setAccess(EAccess.valueOf(access));
			response = "File Updated";
		}
		
		if(File != null) {
			String extension = File.getOriginalFilename().substring(File.getOriginalFilename().lastIndexOf("."));
			if (!extension.equals(".mp4") && !extension.equals(".jpeg") && !extension.equals(".jpg")
					&& !extension.equals(".png")) {
				return response = "We only accept PNG ,JPG ,JPEG and mp4 files !";
			}
			
			if(extension.equals(".mp4")) {
				dbFile.get().setType("video/mp4");
			}
			
			if(extension.equals(".png")) {
				dbFile.get().setType("image/png");
			}
			
			if(extension.equals(".jpeg")) {
				dbFile.get().setType("image/jpeg");
			}
			
			if(extension.equals(".jpg")) {
				dbFile.get().setType("image/jpg");
			}
			
			dbFile.get().setImage(FileUtility.compressFile(File.getBytes()));
			response = "File Updated";
		}
	
		return response;
	}
	
	
	
	
	
	
	
	
	
	
}
