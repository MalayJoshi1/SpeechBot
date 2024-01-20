<?php
// Replace these database connection details with your own
$host = "localhost:3306"; // Hostname
$username = "root"; // Database username
$password = "root2004"; // Database password
$database = "UserDetails"; // Database name
// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the contact form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // You should perform validation and sanitization of user input here to prevent security issues

    // Insert the submitted data into the database
    $sql = "INSERT INTO contact_messages (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        // Successful submission
        echo "Thank you for your message. We will get back to you soon.";
    } else {
        // Failed submission
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection when you're done
$conn->close();
?>
