<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Veuillez remplir tous les champs correctement.";
        http_response_code(400);
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
