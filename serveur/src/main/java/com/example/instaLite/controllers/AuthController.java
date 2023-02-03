package com.example.instaLite.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.instaLite.models.ERole;
import com.example.instaLite.models.Role;
import com.example.instaLite.models.User;
import com.example.instaLite.payload.request.LoginRequest;
import com.example.instaLite.payload.request.SignupRequest;
import com.example.instaLite.payload.response.JwtResponse;
import com.example.instaLite.payload.response.MessageResponse;
import com.example.instaLite.repository.RoleRepository;
import com.example.instaLite.repository.UserRepository;
import com.example.instaLite.security.jwt.JwtUtils;
import com.example.instaLite.sevices.UserDetailsImpl;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

	if(loginRequest.getUsername().isEmpty()) {
		 return new ResponseEntity<>(new MessageResponse("Username is required !"),HttpStatus.BAD_REQUEST);
	}
	
	if(loginRequest.getPassword().isEmpty()) {
		 return new ResponseEntity<>(new MessageResponse("Password is required !"),HttpStatus.BAD_REQUEST);
	}
	  
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(), 
                         roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
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

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}

