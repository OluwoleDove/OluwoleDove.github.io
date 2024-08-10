<?php
// public/get_courses.php

require_once '../controllers/CourseController.php';

$controller = new CourseController($connection);
$controller->getCourses();
?>
