<?php
    session_start();

    require "info.php";

    if (!$_SESSION["safe"]) {

        die("Can not Continue");

    }

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $chatUUID = filter_var($_POST["chatUUID"]);
    $chatTitle = filter_var($_POST["chatTitle"]);
    $chatFromID = filter_var($_POST["chatFromID"]);
    $chatToID = filter_var($_POST["chatToID"]);

    $sql = sprintf(
        "INSERT INTO chats (uuid, title, from_id, to_id) VALUES ('%s', '%s', %s, %s)",
        $chatUUID,
        $chatTitle,
        $chatFromID,
        $chatToID
    );


    $data = array();


    if ($conn->query($sql) === TRUE) {
        $data[] = true;
    } else {
        $data[] = false;
    }
    $conn->close();

    echo json_encode($data);

?>