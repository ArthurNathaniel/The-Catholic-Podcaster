<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "recording_app_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $data = file_get_contents('php://input');
    $recordingName = $_POST['recordingName'];
    $file_path = 'recordings/' . $recordingName . '.wav';
    file_put_contents($file_path, $data);

    $sql = "INSERT INTO recordings (name, file_path) VALUES ('$recordingName', '$file_path')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
