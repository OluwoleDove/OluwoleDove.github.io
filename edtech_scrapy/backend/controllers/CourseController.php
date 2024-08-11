<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// controllers/CourseController.php
require_once '../config/database.php';
require_once '../models/Course.php';
require_once '../models/Video.php';

class CourseController {
    private $courseModel;
    private $videoModel;

    public function __construct($connection) {
        $this->courseModel = new Course($connection);
        $this->videoModel = new Video($connection);
    }

    public function getCourses() {
        header('Content-Type: application/json');
        echo json_encode($this->courseModel->getAllCourses());
    }

    public function getCourseDetails() {
        $course_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $course = $this->courseModel->getCourseDetails($course_id);
        $videos = $this->videoModel->getVideosByCourseId($course_id);

        $course['videos'] = $videos;

        header('Content-Type: application/json');
        echo json_encode($course);
    }
}
?>
