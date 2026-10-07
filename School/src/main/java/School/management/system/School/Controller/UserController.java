package School.management.system.School.Controller;

import School.management.system.School.Model.User;
import School.management.system.School.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {

        if (user.getZanzibarId() == null ||
                user.getZanzibarId().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Zanzibar ID is required");
        }
        if (user.getEmployeeNumber() == null ||
                user.getEmployeeNumber().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Employee Number is required");
        }
        if (user.getFullName() == null ||
                user.getFullName().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Full Name is required");
        }
        if (userRepository
                .findByZanzibarId(user.getZanzibarId())
                .isPresent()) {

            return ResponseEntity.badRequest()
                    .body("Zanzibar ID already exists");
        }
        if (userRepository
                .findByEmployeeNumber(user.getEmployeeNumber())
                .isPresent()) {

            return ResponseEntity.badRequest()
                    .body("Employee Number already exists");
        }

        // Default Role
        if (user.getRole() == null ||
                user.getRole().trim().isEmpty()) {

            user.setRole("STAFF");
        }
        user.setPassword(null);

        User savedUser = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put("id", savedUser.getId());
        response.put("zanzibarId", savedUser.getZanzibarId());
        response.put("employeeNumber", savedUser.getEmployeeNumber());
        response.put("fullName", savedUser.getFullName());
        response.put("role", savedUser.getRole());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/create-password")
    public ResponseEntity<?> createPassword(
            @RequestBody CreatePasswordRequest request) {
        if (request.getZanzibarId() == null ||
                request.getZanzibarId().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Zanzibar ID is required");
        }
        if (request.getEmployeeNumber() == null ||
                request.getEmployeeNumber().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Employee Number is required");
        }
        if (request.getPassword() == null ||
                request.getPassword().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Password is required");
        }
        if (request.getConfirmPassword() == null ||
                request.getConfirmPassword().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Confirm Password is required");
        }
        if (!request.getPassword()
                .equals(request.getConfirmPassword())) {

            return ResponseEntity.badRequest()
                    .body("Passwords do not match");
        }
        User user = userRepository
                .findByZanzibarId(request.getZanzibarId())
                .orElse(null);

        if (user == null) {

            return ResponseEntity.status(404)
                    .body("User not found");
        }
        if (!user.getEmployeeNumber()
                .equals(request.getEmployeeNumber())) {

            return ResponseEntity.status(401)
                    .body("Zanzibar ID and Employee Number do not match");
        }

        if (user.getPassword() != null &&
                !user.getPassword().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Password already exists. Please login.");
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put("message", "Password created successfully");

        return ResponseEntity.ok(response);
    }

    public static class CreatePasswordRequest {

        private String zanzibarId;
        private String employeeNumber;
        private String password;
        private String confirmPassword;

        public String getZanzibarId() {
            return zanzibarId;
        }

        public void setZanzibarId(String zanzibarId) {
            this.zanzibarId = zanzibarId;
        }

        public String getEmployeeNumber() {
            return employeeNumber;
        }

        public void setEmployeeNumber(String employeeNumber) {
            this.employeeNumber = employeeNumber;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
    }
}