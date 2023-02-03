package com.example.instaLite.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.instaLite.models.User;
import com.example.instaLite.payload.response.MessageResponse;
import com.example.instaLite.repository.UserRepository;
import com.example.instaLite.sevices.LikeService;

import io.jsonwebtoken.Jwts;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class LikeController {
		
	 @Autowired
	 LikeService likeService; 
	 
	 @Value("${instaLite.app.jwtSecret}")
	 private String jwtSecret;
	 
	 @Autowired
	 UserRepository userRepository;
	 
	 
	 @RequestMapping(value = "/api/like", method = RequestMethod.POST)
	 public ResponseEntity<?> like(@RequestParam Long userId,@RequestParam Long fileId) {
//	   String token = autho.substring(7);
//	   String currentUser = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
//	   Optional<User> user = userRepository.findByUsername(currentUser);
//	   if(user.isEmpty() || user.get().getId() != userId) {
//		   return new ResponseEntity<>(new MessageResponse("You are not allowed to do that!"),HttpStatus.UNAUTHORIZED);
//	   }
	   String response = likeService.likeFile(userId, fileId);
	   if(response == "File or user doesn't exist") {
		   return new ResponseEntity<>(new MessageResponse("File or user doesn't exist!"),HttpStatus.BAD_REQUEST);
	   }
	   if(response == "File is alreay liked by the user") {
		   return new ResponseEntity<>(new MessageResponse("File is already liked by the user!"),HttpStatus.CONFLICT);
	   }
	   return new ResponseEntity<>(new MessageResponse(response),HttpStatus.CREATED);
	 }
	 
	 @RequestMapping(value = "/api/dislike", method = RequestMethod.POST)
	 public ResponseEntity<?> dislike(@RequestParam Long userId,@RequestParam Long fileId) {
//		   String token = autho.substring(7);
//		   String currentUser = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
//		   Optional<User> user = userRepository.findByUsername(currentUser);
//		   if(user.isEmpty() || user.get().getId() != userId) {
//			   return new ResponseEntity<>(new MessageResponse("You are not allowed to do that!"),HttpStatus.UNAUTHORIZED);
//		   }
		   String response = likeService.disLikeFile(userId, fileId);
		   if(response == "File or user doesn't exist") {
			   return new ResponseEntity<>(new MessageResponse("File or user doesn't exist!"),HttpStatus.BAD_REQUEST);
		   }
		   if(response == "File is not liked by the user") {
			   return new ResponseEntity<>(new MessageResponse("File is not liked by the user!"),HttpStatus.CONFLICT);
		   }
		   return new ResponseEntity<>(new MessageResponse(response),HttpStatus.OK);
	 }
}
