<?php
// public/get_course_details.php

require_once '../controllers/CourseController.php';

$controller = new CourseController($connection);
$controller->getCourseDetails();
?>
