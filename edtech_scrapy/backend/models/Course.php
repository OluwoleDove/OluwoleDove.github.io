<?php
// models/Course.php

class Course {
    private $connection;

    public function __construct($connection) {
        $this->connection = $connection;
    }

    public function getAllCourses() {
        $sql = "SELECT id, title, thumbnail FROM courses";
        $result = $this->connection->query($sql);

        $courses = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $courses[] = $row;
            }
        }

        return $courses;
    }

    public function getCourseDetails($course_id) {
        $sql = "SELECT c.id, c.title, v.id AS video_id, v.title AS video_title, v.video_url, v.transcript
                FROM courses c
                JOIN videos v ON c.id = v.course_id
                WHERE c.id = ?";
        
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i", $course_id);
        $stmt->execute();
        $result = $stmt->get_result();

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

        return $course;
    }
}
?>
