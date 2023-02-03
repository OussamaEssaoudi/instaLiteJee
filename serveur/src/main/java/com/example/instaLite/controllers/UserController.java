package com.example.instaLite.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import com.example.instaLite.models.ERole;
import com.example.instaLite.models.Role;
import com.example.instaLite.models.User;
import com.example.instaLite.payload.request.SignupRequest;
import com.example.instaLite.payload.response.MessageResponse;
import com.example.instaLite.repository.RoleRepository;
import com.example.instaLite.repository.UserRepository;
import com.example.instaLite.security.jwt.JwtUtils;
import com.example.instaLite.sevices.UserService;

import io.jsonwebtoken.Jwts;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Value("${instaLite.app.jwtSecret}")
	private String jwtSecret;
	
	@Autowired
	UserService userService;
	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	/* ---------------------------------------------------------- */
	// List of Users
	@RequestMapping(value = "/",method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public List<User> getAllUsers() {
		return userService.getAll();
	}
	/* ---------------------------------------------------------- */
	
	/* ---------------------------------------------------------- */
	// Get user by id
	@RequestMapping(value = "/user",method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	public ResponseEntity<?> getUserById(@RequestHeader(HttpHeaders.AUTHORIZATION) String autho,@RequestParam Long id) {
		String token = autho.substring(7);
		String currentUser = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
		return userService.getUserById(currentUser,id);
	}
	/* ---------------------------------------------------------- */
	
	/* ---------------------------------------------------------- */
	// Add user
	@RequestMapping(value = "/add",method = RequestMethod.POST)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> addUser(@Valid @RequestBody SignupRequest signUpRequest) {
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+
	              "[a-zA-Z0-9_+&*-]+)*@" +
	              "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
	              "A-Z]{2,7}$";
		Pattern pat = Pattern.compile(emailRegex);
		if(!pat.matcher(signUpRequest.getEmail()).matches()) {
		      return ResponseEntity
		              .badRequest()
		              .body(new MessageResponse("Error: Please provide a valid email!"));
		}
		String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
		Pattern pat2 = Pattern.compile(passwordRegex);
		if(!pat2.matcher(signUpRequest.getPassword()).matches()) {
		      return ResponseEntity
		              .badRequest()
		              .body(new MessageResponse("Error: Please provide a valid password!"));
		}
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
		      return ResponseEntity
		          .badRequest()
		          .body(new MessageResponse("Error: Username is already taken!"));
		    }

		    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
		      return ResponseEntity
		          .badRequest()
		          .body(new MessageResponse("Error: Email is already in use!"));
		    }
		 // Create new user's account
		    User user = new User(signUpRequest.getUsername(), 
		               signUpRequest.getEmail(),
		               encoder.encode(signUpRequest.getPassword()));

		    Set<String> strRoles = signUpRequest.getRole();
		    Set<Role> roles = new HashSet<>();

		    if (strRoles == null) {
		      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		      roles.add(userRole);
		    } else {
		      strRoles.forEach(role -> {
		        switch (role) {
		        case "ROLE_ADMIN":
		          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
		              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		          roles.add(adminRole);

		          break;
		        default:
		          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		          roles.add(userRole);
		        }
		      });
		    }

		    user.setRoles(roles);
		    userRepository.save(user);

		    return ResponseEntity.ok(new MessageResponse("User added successfully!"));
	}
	/* ---------------------------------------------------------- */
	
	/* ---------------------------------------------------------- */
	// Delete user by id
	@RequestMapping(value = "/delete",method = RequestMethod.DELETE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteUser(@RequestParam Long id) {
		if(!userService.delete(id)) {
			return ResponseEntity
			          .badRequest()
			          .body(new MessageResponse("Error: User not found!"));
		}
		return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
	}
	/* ---------------------------------------------------------- */
	
	/* ---------------------------------------------------------- */
	// Update user by id
	@RequestMapping(value = "/update",method = RequestMethod.PATCH)
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	public ResponseEntity<?> updateUser(
			@RequestHeader(HttpHeaders.AUTHORIZATION) String autho,
			@RequestParam(required = true) Long id,
			@RequestParam(required = false) String username,
			@RequestParam(required = false) String password) {
		String token = autho.substring(7);
		String currentUser = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
		
		
		
		if(username == "") {
			 return new ResponseEntity<>(new MessageResponse("Username is required !"),HttpStatus.BAD_REQUEST);
		}
		
		String updateUser = userService.update(currentUser,id,username,password);
		if(updateUser == "Not authorized!") {
			return new ResponseEntity<>("Not authorized!",HttpStatus.BAD_REQUEST);
		}
		if(updateUser == "Same username!") {
			return new ResponseEntity<>("Same username!",HttpStatus.BAD_REQUEST);
		}
		if(updateUser == "UserName already taken!") {
			return new ResponseEntity<>("UserName already taken!",HttpStatus.CONFLICT);
		}
		if(updateUser == "Please provide a valid password!") {
			return new ResponseEntity<>("Please provide a valid password!",HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
	}
	/* ---------------------------------------------------------- */
}
