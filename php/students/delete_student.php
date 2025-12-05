<?php
header("Content-Type: application/json");

if (!isset($_POST['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "ID non envoyé."
    ]);
    exit;
}

$id = $_POST['id'];
$filePath = __DIR__ . '/../../data/students.json';

if (!file_exists($filePath)) {
    echo json_encode([
        "success" => false,
        "message" => "students.json introuvable."
    ]);
    exit;
}

$data = json_decode(file_get_contents($filePath), true);

// vérifier si id existe
if (!isset($data[$id])) {
    echo json_encode([
        "success" => false,
        "message" => "Étudiant introuvable."
    ]);
    exit;
}

unset($data[$id]);

file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));

echo json_encode([
    "success" => true,
    "message" => "Étudiant supprimé avec succès."
]);
?>

