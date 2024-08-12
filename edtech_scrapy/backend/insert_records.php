<?php
// Include database configuration
require_once 'config/database.php';

$sql_insert_courses = "INSERT INTO `courses` (`title`, `thumbnail`) VALUES
    ('Introduction to Data Science', 'C:/xampp/htdocs/edtech_scrapy/backend/media/DS_thumbnail.jpg'),
    ('CS Degree - What it is', 'C:/xampp/htdocs/edtech_scrapy/backend/media/CS_thumbnail.jpg')";

// Execute the SQL statement
if (mysqli_query($connection, $sql_insert_courses)) {
    echo "Courses inserted successfully.";
} else {
    echo "Error: " . mysqli_error($connection);
}

$course_id_one = mysqli_insert_id($connection); // Get the ID of the last inserted course

// Assuming the second course has an ID of $course_id_one + 1
$course_id_two = $course_id_one + 1;

$sql_insert_videos = "INSERT INTO `videos` (`course_id`, `title`, `video_url`) VALUES
    ($course_id_one, 'Introduction to Data Science', 'C:/xampp/htdocs/edtech_scrapy/backend/media/vid_one.mp4'),
    ($course_id_two, 'CS Degree - What it is', 'C:/xampp/htdocs/edtech_scrapy/backend/media/vid_two.mp4')";

// Execute the SQL statement
if (mysqli_query($connection, $sql_insert_videos)) {
    echo "Videos inserted successfully.";
} else {
    echo "Error: " . mysqli_error($connection);
}

?>