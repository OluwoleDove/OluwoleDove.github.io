<?php
// Include database configuration
require_once 'config/database.php';

$sql_insert_courses = "INSERT INTO `courses` (`title`, `thumbnail`, `rating`) VALUES
    ('What is Google Analytics?', 'http://localhost/edtech_scrapy/backend/media/DS_thumbnail_a.jpg', 3),
    ('WHAT IS CODING - Explained in 3 minutes', 'http://localhost/edtech_scrapy/backend/media/CS_thumbnail_a.jpg', 5)";

// Execute the SQL statement
if (mysqli_query($connection, $sql_insert_courses)) {
    echo "Courses inserted successfully.";
} else {
    echo "Error: " . mysqli_error($connection);
}

$course_id_one = mysqli_insert_id($connection); // Get the ID of the last inserted course

// Assuming the second course has an ID of $course_id_one + 1
$course_id_two = $course_id_one + 1;

$sql_insert_videos = "INSERT INTO `videos` (`course_id`, `title`, `video_url`, `transcript`) VALUES
    (1, 'Introduction to Data Science', 'http://localhost/edtech_scrapy/backend/media/vid_one.mp4', 'Hi Hi'),
    (2, 'CS - What it is', 'http://localhost/edtech_scrapy/backend/media/vid_two.mp4', 'Hi Hi'),
    (3, 'What is Google Analytics', 'http://localhost/edtech_scrapy/backend/media/vid_one_a.mp4', 'Hi Hi'),
    (4, 'WHAT IS CODING - Explained in 3 minutes', 'http://localhost/edtech_scrapy/backend/media/vid_two_a.mp4', 'Hi Hi')";

// Execute the SQL statement
if (mysqli_query($connection, $sql_insert_videos)) {
    echo "Videos inserted successfully.";
} else {
    echo "Error: " . mysqli_error($connection);
}

?>