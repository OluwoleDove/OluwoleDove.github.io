<?php
// models/Video.php

class Video {
    private $connection;

    public function __construct($connection) {
        $this->connection = $connection;
    }

    public function getVideosByCourseId($course_id) {
        $sql = "SELECT id, title, video_url, transcript
                FROM videos
                WHERE course_id = ?";
        
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i", $course_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $videos = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $videos[] = $row;
            }
        }

        return $videos;
    }
}
?>
