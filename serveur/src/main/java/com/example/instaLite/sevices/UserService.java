package com.example.instaLite.sevices;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.instaLite.models.ERole;
import com.example.instaLite.models.Role;
import com.example.instaLite.models.User;
import com.example.instaLite.payload.response.MessageResponse;
import com.example.instaLite.repository.RoleRepository;
import com.example.instaLite.repository.UserRepository;
import com.google.protobuf.Option;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;
	
	public List<User> getAll() {		
		return userRepository.findAll();
	}

	public String add(User user) {
		if(userRepository.existsByEmail(user.getEmail())) {
			return "User with the same email already exists";
		}
		if (userRepository.existsByUsername(user.getUsername())) {
			return "User with the same userName already exists";
		}
		if(!user.getRoles().contains("ROLE_USER") || !user.getRoles().contains("ROLE_ADMIN")) {
			return "Role not found!";
		}
		User userF = new User(user.getUsername(), 
	               user.getEmail(),
	               encoder.encode(user.getPassword()));

		Set<Role> roles = user.getRoles();
		userRepository.save(user);
		return "User added!";
	}

	public Boolean delete(Long id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isEmpty()) {
			return false;
		}
		userRepository.deleteById(id);
		return true;
	}

	@Transactional
	public String update(String currentUser, Long id ,String username,String password) {
		Optional<Role> roleAdmin = roleRepository.findByName(ERole.ROLE_ADMIN);
		Optional<User> userToUpdate = userRepository.findById(id);
		Optional<User> currUser = userRepository.findByUsername(currentUser);
		if(userToUpdate.isEmpty() || currUser.isEmpty()) {
			return "Not authorized!";
		}
		if(currUser.get().getRoles().contains(roleAdmin.get()) || currUser.get() == userToUpdate.get()) {
			if(userToUpdate.get().getUsername().equals(username)) {
				return "Same username!";
			}
			if(userRepository.existsByUsername(username)) {
				return "UserName already taken!";
			}
			if(username != null && password == null) {
				userToUpdate.get().setUsername(username);
			}
			if(username == null && password != null) {
				String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
				Pattern pat = Pattern.compile(passwordRegex);
				if(!pat.matcher(password).matches()) {
				      return "Please provide a valid password!";
				}
				userToUpdate.get().setPassword(encoder.encode(password));
			}
			if(username != null && password != null) {
				String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
				Pattern pat = Pattern.compile(passwordRegex);
				if(!pat.matcher(password).matches()) {
				      return "Please provide a valid password!";
				}
				userToUpdate.get().setUsername(username);
				userToUpdate.get().setPassword(encoder.encode(password));
			}

			return "User updated!";
		}
		return "Not authorized!";
	}

	public ResponseEntity<?> getUserById(String currentUser,Long id) {	
		Optional<Role> roleAdmin = roleRepository.findByName(ERole.ROLE_ADMIN);
		Optional<User> currUser = userRepository.findByUsername(currentUser);
		Optional<User> user = userRepository.findById(id);
		if(currUser.isEmpty()) {
			return new ResponseEntity<>("Not authorized!",HttpStatus.BAD_REQUEST);
		}
		if(user.isEmpty()) {
			return new ResponseEntity<>("User not found!",HttpStatus.NOT_FOUND);
		}
		if(currUser.get().getRoles().contains(roleAdmin.get()) || currUser.get() == user.get()) {
			return new ResponseEntity<>(user.get(),HttpStatus.OK);
		}
		return new ResponseEntity<>("Not authorized!",HttpStatus.BAD_REQUEST);
	}

}
