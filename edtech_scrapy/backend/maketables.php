<?php
// Include database configuration
require_once 'config/database.php';

// SQL to create the `courses` table
$sql_courses = "CREATE TABLE IF NOT EXISTS `courses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL
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

// Execute queries and check for success
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

// Close connection
$connection->close();
?>
