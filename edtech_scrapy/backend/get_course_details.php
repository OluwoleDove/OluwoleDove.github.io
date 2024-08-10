<?php
// Connection to the database
$connection = new mysqli("localhost", "root", "", "scrapy_edtech");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$course_id = $_GET['id'];

$sql = "SELECT c.id, c.title, v.id AS video_id, v.title AS video_title, v.video_url, v.transcript
        FROM courses c
        JOIN videos v ON c.id = v.course_id
        WHERE c.id = $course_id";

$result = $connection->query($sql);

$course = [];
$videos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $course['id'] = $row['id'];
        $course['title'] = $row['title'];
        $videos[] = [
            'id' => $row['video_id'],
            'title' => $row['video_title'],
            'video_url' => $row['video_url'],
            'transcript' => $row['transcript']
        ];
    }
}

$course['videos'] = $videos;

echo json_encode($course);

$connection->close();
?>
