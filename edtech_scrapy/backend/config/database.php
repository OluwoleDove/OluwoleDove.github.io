<?php
// config/database.php

require_once '../params.php'; // Adjust the path if needed

$servername = "localhost";
$username = "root";
$password = $db_password;
$dbname = "scrapy_edtech";

// Create connection
$connection = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
?>
