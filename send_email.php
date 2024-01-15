<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    $errors = [];

    if (empty($name)) {
        $errors[] = "Veuillez entrer votre nom.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Format d'email invalide. Veuillez utiliser un format correct, par exemple: exemple@domaine.com.";
    }
    if (empty($message)) {
        $errors[] = "Veuillez entrer un message.";
    }

    if (count($errors) > 0) {
        $formattedErrors = array_map(function($error) {
            return trim($error, '[]"');
        }, $errors);
        http_response_code(400);
        echo json_encode($formattedErrors);
        exit;
    }

    $recipient = "aurelien.fvre@gmail.com";
    $subject = "Nouveau message de $name via votre site web";

    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Message envoyé avec succès.";
    } else {
        http_response_code(500);
        echo "Une erreur s'est produite et le message n'a pas pu être envoyé.";
    }
} else {
    http_response_code(403);
    echo "Il y a eu un problème avec votre soumission, veuillez réessayer.";
}
?>