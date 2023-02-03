package com.example.instaLite.sevices;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.instaLite.models.File;
import com.example.instaLite.models.Like;
import com.example.instaLite.models.Portfolio;
import com.example.instaLite.models.User;
import com.example.instaLite.repository.FileRepository;
import com.example.instaLite.repository.LikeRepository;
import com.example.instaLite.repository.UserRepository;



@Service
public class LikeService {

	@Autowired
	private LikeRepository likeRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FileRepository fileRepository;
	
	@Transactional
	public String likeFile(Long userId,Long fileId) {
		// Find out if the user and file provided exist
		Optional<User> user = userRepository.findById(userId);
		Optional<File> file = fileRepository.findById(fileId);
		if(user.isEmpty() || file.isEmpty()) {
			return "File or user doesn't exist";
		}
		// Find out if user Already liked the image  or video
		Optional<Like> like = likeRepository.findByUserAndFile(user.get(), file.get());
		if(like.isPresent()) {
			return "File is alreay liked by the user";
		}
		// Create and save the like 
		Like newLike = new Like(user.get(), file.get());
		likeRepository.save(newLike);
		// Update the file number of likes
		file.get().setNumLike(file.get().getNumLike() + 1);
		return "File liked";
	}
	
	@Transactional
	public String disLikeFile(Long userId,Long fileId) {
		// Find out if the user and file provided exist
		Optional<User> user = userRepository.findById(userId);
		Optional<File> file = fileRepository.findById(fileId);
		if(user.isEmpty() || file.isEmpty()) {
			return "File or user doesn't exist";
		}
		// Find out if user Already liked the image  or video
		Optional<Like> like = likeRepository.findByUserAndFile(user.get(), file.get());
		if(like.isEmpty()) {
			return "File is not liked by the user";
		}
		// Delete the like 
		likeRepository.delete(like.get());
		// Update the file number of likes
		file.get().setNumLike(file.get().getNumLike() - 1);
		return "File disliked";
	}
	
}
