<?php
class Module {
    private $connection;

    public function __construct($connection) {
        $this->connection = $connection;
    }

    public function getModulesByCourseId($course_id) {
        $sql = "SELECT id, title, thumbnail, video_url, transcript FROM modules WHERE course_id = ?";
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
}

?>
