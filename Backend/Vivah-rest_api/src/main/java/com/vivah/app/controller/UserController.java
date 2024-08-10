package com.vivah.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivah.app.assembler.Assembler;
import com.vivah.app.dtos.LoginDto;
import com.vivah.app.dtos.ProfileDto;
import com.vivah.app.dtos.RegistrationDto;
import com.vivah.app.model.MatrimonyProfile;
import com.vivah.app.model.User;
import com.vivah.app.repo.UserRepository;
import com.vivah.app.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Assembler assembler;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationDto registrationDto) {
        List<User> users = userRepository.findByUsername(registrationDto.getUsername());
        if (users != null && !users.isEmpty()) { // Check for non-empty list
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already in use"); // Use CONFLICT for
                                                                                                  // clarity
        }
        userService.registerUser(registrationDto);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            User user = userService.authenticate(loginDto.getUsername(), loginDto.getPassword());
            MatrimonyProfile profile = user.getProfile();

            // Create DTO to avoid serialization issues
            ProfileDto profileDto = assembler.convertToProfileDto(profile);

            return ResponseEntity.ok(profileDto);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/adminlogin")
    public ResponseEntity<?> adminlogin(@RequestBody LoginDto loginDto) {
        try {
            User user = userService.authenticate(loginDto.getUsername(), loginDto.getPassword());
            MatrimonyProfile profile = user.getProfile();

            // Create DTO to avoid serialization issues
            ProfileDto profileDto = assembler.convertToProfileDto(profile);

            return ResponseEntity.ok(profileDto);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

}
