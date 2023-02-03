package com.example.instaLite.controllers;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.instaLite.exception.ApiRequestException;
import com.example.instaLite.models.EAccess;
import com.example.instaLite.models.File;
import com.example.instaLite.payload.response.FileResponse;
import com.example.instaLite.payload.response.MessageResponse;
import com.example.instaLite.repository.FileRepository;
import com.example.instaLite.repository.PortfolioRepository;
import com.example.instaLite.sevices.PortfolioService;
import com.example.instaLite.util.FileUtility;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

	@Autowired
	private PortfolioService service;

	@Value("${project.files}")
	private String path;
	
	@Value("${project.required}")
	private String requiredFiled ; 

	@Autowired
	FileRepository FileRepository;

	@Autowired
	PortfolioRepository PortfolioRepository;

	/*
	 * Post Single File
	 * 
	 */
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/upload",method = RequestMethod.POST)
	public ResponseEntity<FileResponse> fileUpload(@RequestParam(value = "title",required=false)  String title, @RequestParam(value = "description",required=false) String description, @RequestParam(value = "file",required=false) MultipartFile file, @RequestParam(value = "access",required=false) String access) {
	

		String Response;
		try {
			if(file == null) {
				throw new ApiRequestException("File is required !");	
			}else if(title == null) {
				throw new ApiRequestException("File title is required !");
			}else if(description == null) {	
				throw new ApiRequestException("File description is required !");
			}else if(access == null) {
				throw new ApiRequestException("File access is required !");
			}
					
			if(	!access.equals(EAccess.Private.toString())  &&  !access.equals(EAccess.Hidden.toString()) && !access.equals(EAccess.Public.toString())){
				throw new ApiRequestException("Access type is invalid, please choose from these types :"+EAccess.Hidden.toString()+"-"+EAccess.Private.toString()+"-"+EAccess.Public.toString()+"-"+access);
			}
			
			String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			if (!extension.equals(".mp4") && !extension.equals(".jpeg") && !extension.equals(".jpg")
					&& !extension.equals(".png")) {
				throw new ApiRequestException("We only accept PNG ,JPG ,JPEG and mp4 files !");
			}
			
			Response = service.uploadImage(path, file, extension, title, description, EAccess.valueOf(access));
		} catch (IOException e) {
			e.printStackTrace();
			throw new ApiRequestException("File is not uploaded due to error on server !");
		}
		return ResponseEntity
				.ok(new FileResponse(file.getOriginalFilename(), Response, "File is successfully uploaded !"));
		
	}

	/*
	 * Get Single File 
	 * 
	 */
	@GetMapping(value = "/file/content/{id}")
	public ResponseEntity<?> GetFile(@PathVariable("id") Long id) throws IOException {
		
		final Optional<File> dbFile = FileRepository.findById(id);

		if (!dbFile.isPresent()) {
			return new ResponseEntity<>(new MessageResponse("File Not Found !"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().contentType(MediaType.valueOf(dbFile.get().getType()))
				.body(FileUtility.decompressFile(dbFile.get().getImage()));
	}
	
	/*
	 * Get Single File Information
	 * 
	 */
	@GetMapping(value = "/file/{id}")
	public ResponseEntity<?> GetFileInformation(@PathVariable("id") Long id) throws IOException {
		
		final Optional<File> dbFile = FileRepository.findFileById(id);

		if (!dbFile.isPresent()) {
			return new ResponseEntity<>(new MessageResponse("File Not Found !"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().body(dbFile);
	}

	/*
	 * Delete File
	 * 
	 */

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value = "delete/file/{id}")
	public ResponseEntity<?> DeleteFile(@PathVariable("id") Long id) {

		
		final Optional<File> dbFile = FileRepository.findById(id);

		if (!dbFile.isPresent()) {
			return new ResponseEntity<>(new MessageResponse("File Not Found !"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		FileRepository.deleteById(dbFile.get().getId());

		return ResponseEntity.ok().body(new MessageResponse("File has been deleted !"));
	}

	/*
	 * Download File
	 * 
	 */
	//@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@GetMapping(value = "download/files/{id}")
	public ResponseEntity<?> downloadFile(@PathVariable("id") Long id, HttpServletResponse response)
			throws IOException {

		final Optional<File> dbFile = FileRepository.findById(id);

		if (!dbFile.isPresent()) {
			return new ResponseEntity<>(new MessageResponse("File Not Found !"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType("application/mixed"))
				.body(FileUtility.decompressFile(dbFile.get().getImage()));

	}

	/*
	 * Get ALL Files
	 * 
	 */
	@RequestMapping(value = "/files",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List getFiles() {
		return FileRepository.findAll(); 
	}
	
	/*
	 * Update File
	 * 
	 */
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	@PatchMapping(value = "update/file/{id}")
	public ResponseEntity<?> updateFile(@PathVariable("id") Long id,
			                            @RequestParam(required=false)  String title, 
			                            @RequestParam(required=false)  String description,
			                            @RequestParam(required=false)  String access,
			                            @RequestParam(required=false)  MultipartFile file 
			                                                      
			) throws IOException{
		String response = service.uploadFile(id, title, description, access, file);
			
		if(!response.equals("File Updated")) {
			return new ResponseEntity<>(new MessageResponse(response), HttpStatus.BAD_REQUEST);
		}
		
	   return new ResponseEntity<>(new MessageResponse(response), HttpStatus.OK);
	}
		
	
}
