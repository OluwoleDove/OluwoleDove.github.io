<?php

require_once '../config/database.php';

class AuthController {
    private $connection;

    public function __construct($connection) {
        $this->connection = $connection;
    }

    public function register($email, $password) {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insert into the database
        $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("ss", $email, $hashedPassword);
        $stmt->execute();

        // Send verification email
        $this->sendVerificationEmail($email);
    }

    public function login($email, $password) {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();

            // Verify password
            if (password_verify($password, $user['password'])) {
                if ($user['is_active']) {
                    // Log the user in (you can set session or token here)
                    echo json_encode(['status' => 'success']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Please verify your email']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }
    }

    private function sendVerificationEmail($email) {
        // Code to send email (e.g., using PHPMailer)
    }

    public function verifyEmail($token) {
        // Activate the user's account based on the token
    }

    public function googleLogin($google_id) {
        // Code to handle Google OAuth login
    }

    public function facebookLogin($facebook_id) {
        // Code to handle Facebook OAuth login
    }
}
?>