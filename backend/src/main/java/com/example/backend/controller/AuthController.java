package com.example.backend.controller;
import com.example.backend.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            String token = generateToken(user);
            return ResponseEntity.ok(new AuthResponse("Login successful", token, user.getUsername()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Invalid credentials"));
        }
    }

    private String generateToken(User user) {
        return "sampleToken";
    }

    @Getter
    @Setter
    static class LoginRequest {
        private String username;
        private String password;
    }

    @Setter
    @Getter
    static class AuthResponse {
        private String message;
        private String token;
        private String username;

        public AuthResponse(String message) {
            this.message = message;
        }

        public AuthResponse(String message, String token, String username) {
            this.message = message;
            this.token = token;
            this.username = username;
        }
    }
}

