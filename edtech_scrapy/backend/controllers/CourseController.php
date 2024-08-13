<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include necessary files
require_once '../config/database.php';
require_once '../models/Course.php';
require_once '../models/Video.php';
require_once '../models/Module.php'; // Include Module model

class CourseController {
    private $courseModel;
    private $videoModel;
    private $moduleModel;
    private $connection;

    public function __construct($connection) {
        $this->connection = $connection;
        $this->courseModel = new Course($connection);
        $this->videoModel = new Video($connection);
        $this->moduleModel = new Module($connection);
    }

    public function getCourses() {
        header('Content-Type: application/json');
        echo json_encode($this->courseModel->getAllCourses());
    }

    public function getCourseDetails() {
        $course_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
        // Get course details
        $course = $this->courseModel->getCourseDetails($course_id);
        if (!$course) {
            echo json_encode(['status' => 'error', 'message' => 'Course not found']);
            return;
        }
    
        // Get video details for the main course video
        $videos = $this->videoModel->getVideosByCourseId($course_id);
    
        // Get module details including video URLs
        $modules = $this->moduleModel->getModulesByCourseId($course_id);
    
        // Attach the first video to the course details
        $course['video'] = count($videos) > 0 ? $videos[0] : null; // Main video for the course
    
        // Attach modules to the course details
        $course['modules'] = $modules;
    
        header('Content-Type: application/json');
        echo json_encode($course);
    }
    
    public function getModulesByCourseId($course_id) {
        $sql = "SELECT id, title, thumbnail, video_url FROM modules WHERE course_id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i", $course_id);
        $stmt->execute();
        $result = $stmt->get_result();
    
        $modules = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $modules[] = $row;
            }
        }
    
        return $modules;
    }
    

    public function likeCourse() {
        $course_id = isset($_POST['course_id']) ? intval($_POST['course_id']) : 0;
        $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;

        if ($course_id && $user_id) {
            $sql = "INSERT INTO likes (course_id, user_id) VALUES (?, ?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("ii", $course_id, $user_id);
            $stmt->execute();

            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        }
    }

    public function commentOnCourse() {
        $course_id = isset($_POST['course_id']) ? intval($_POST['course_id']) : 0;
        $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
        $comment = isset($_POST['comment']) ? $_POST['comment'] : '';

        if ($course_id && $user_id && $comment) {
            $sql = "INSERT INTO comments (course_id, user_id, comment) VALUES (?, ?, ?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("iis", $course_id, $user_id, $comment);
            $stmt->execute();

            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        }
    }

    public function shareCourse() {
        $course_id = isset($_POST['course_id']) ? intval($_POST['course_id']) : 0;
        $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
        $share_link = isset($_POST['share_link']) ? $_POST['share_link'] : '';

        if ($course_id && $user_id && $share_link) {
            $sql = "INSERT INTO shares (course_id, user_id, share_link) VALUES (?, ?, ?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("iis", $course_id, $user_id, $share_link);
            $stmt->execute();

            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        }
    }
}

?>
