<?php
session_start();
// Replace these database connection details with your own
$host = "localhost:3306"; // Hostname
$username = "root"; // Database username
$password = "root2004"; // Database password
$database = "UserDetails"; // Database name

    // Create a database connection
    $conn = new mysqli($hostname, $username, $password, $database, $port);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $username = $_POST["username"];
    $password = $_POST["password"];

    // Perform SQL select operation
    $sql = "SELECT username, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($db_username, $db_password);
    $stmt->fetch();
    $stmt->close();

    if ($username === $db_username && $password === $db_password) {
        // User found and password is correct
        $_SESSION["username"] = $username;
        header("Location: interface.html");
        exit();
    } else {
        echo "Invalid username or password";
    }

    // Close the database connection
    $conn->close();
}
?>

<!-- Your HTML login form goes here -->

