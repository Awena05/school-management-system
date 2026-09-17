package School.management.system.School.Controller;

import School.management.system.School.Entity.User;
import School.management.system.School.Repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {

            return Map.of(
                    "success", true,
                    "message", "Login successful",
                    "role", user.get().getRole()
            );
        }

        return Map.of(
                "success", false,
                "message", "Invalid email or password"
        );
    }
}
