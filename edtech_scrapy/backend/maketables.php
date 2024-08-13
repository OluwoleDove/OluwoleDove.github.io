<?php
// Include database configuration
require_once 'config/database.php';

// SQL create the 'users' table
$sql_users = "CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    google_id VARCHAR(255),
    facebook_id VARCHAR(255),
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// SQL to create the `courses` table
$sql_courses = "CREATE TABLE IF NOT EXISTS `courses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0
)";

// SQL to create the `videos` table
$sql_videos = "CREATE TABLE IF NOT EXISTS `videos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `course_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `video_url` VARCHAR(255) NOT NULL,
    `transcript` TEXT,
    FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE
)";

$sql_courses = "CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    tutor VARCHAR(255) DEFAULT NULL,
    price DECIMAL(10,2) DEFAULT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    description VARCHAR(1000) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// SQL to create the `likes` table
$sql_likes = "CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)";

// SQL to create the `comments` table
$sql_comments = "CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)";

// SQL to create the `shares` table
$sql_shares = "CREATE TABLE shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    share_link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)";

// Execute queries and check for success
if ($connection->query($sql_users) === TRUE) {
    echo "Table 'users' created successfully.<br>";
} else {
    echo "Error creating table 'users': " . $connection->error . "<br>";
}

if ($connection->query($sql_courses) === TRUE) {
    echo "Table 'courses' created successfully.<br>";
} else {
    echo "Error creating table 'courses': " . $connection->error . "<br>";
}

if ($connection->query($sql_videos) === TRUE) {
    echo "Table 'videos' created successfully.<br>";
} else {
    echo "Error creating table 'videos': " . $connection->error . "<br>";
}

if ($connection->query($sql_courses) === TRUE) {
    echo "Table 'courses' created successfully.<br>";
} else {
    echo "Error creating table 'courses': " . $connection->error . "<br>";
}

if ($connection->query($sql_likes) === TRUE) {
    echo "Table 'likes' created successfully.<br>";
} else {
    echo "Error creating table 'likes': " . $connection->error . "<br>";
}

if ($connection->query($sql_comments) === TRUE) {
    echo "Table 'comments' created successfully.<br>";
} else {
    echo "Error creating table 'comments': " . $connection->error . "<br>";
}

if ($connection->query($sql_shares) === TRUE) {
    echo "Table 'shares' created successfully.<br>";
} else {
    echo "Error creating table 'shares': " . $connection->error . "<br>";
}

// Close connection
$connection->close();
?>
