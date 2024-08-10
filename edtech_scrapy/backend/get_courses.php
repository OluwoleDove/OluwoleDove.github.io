<?php
// Connection to the database
$connection = new mysqli("localhost", "root", "", "scrapy_edtech");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT id, title, thumbnail FROM courses";
$result = $connection->query($sql);

$courses = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

echo json_encode($courses);

$connection->close();
?>
