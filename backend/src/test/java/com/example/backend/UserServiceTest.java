package com.example.backend;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAuthenticate_ValidCredentials() {
        String username = "testUser";
        String password = "testPassword";
        User mockUser = new User();
        mockUser.setUsername(username);
        mockUser.setPassword(password);

        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        User result = userService.authenticate(username, password);
        assertNotNull(result);
        assertEquals(username, result.getUsername());
    }

    @Test
    public void testAuthenticate_InvalidPassword() {
        String username = "testUser";
        String password = "testPassword";
        String wrongPassword = "wrongPassword";
        User mockUser = new User();
        mockUser.setUsername(username);
        mockUser.setPassword(password);

        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        User result = userService.authenticate(username, wrongPassword);
        assertNull(result);
    }

    @Test
    public void testAuthenticate_InvalidUsername() {
        String username = "testUser";
        String password = "testPassword";

        when(userRepository.findByUsername(username)).thenReturn(null);

        User result = userService.authenticate(username, password);
        assertNull(result);
    }

    @Test
    public void testAuthenticate_NullUsername() {
        String username = null;
        String password = "testPassword";

        User result = userService.authenticate(username, password);
        assertNull(result);
    }

    @Test
    public void testAuthenticate_NullPassword() {
        String username = "testUser";
        String password = null;
        User mockUser = new User();
        mockUser.setUsername(username);
        mockUser.setPassword("testPassword");

        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        User result = userService.authenticate(username, password);
        assertNull(result);
    }

    @Test
    public void testAuthenticate_EmptyUsername() {
        String username = "";
        String password = "testPassword";

        User result = userService.authenticate(username, password);
        assertNull(result);
    }

    @Test
    public void testAuthenticate_EmptyPassword() {
        String username = "testUser";
        String password = "";
        User mockUser = new User();
        mockUser.setUsername(username);
        mockUser.setPassword("testPassword");

        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        User result = userService.authenticate(username, password);
        assertNull(result);
    }
}