<?php
header("Content-Type: application/json");

// Vérifier si un nom de fichier est fourni
if (!isset($_GET['file']) || empty($_GET['file'])) {
    echo json_encode([
        "success" => false,
        "message" => "Aucun fichier spécifié."
    ]);
    exit;
}

$file = $_GET['file'];

// Sécurisation du nom de fichier
// On empêche les chemins du type "../"
if (strpos($file, "..") !== false) {
    echo json_encode([
        "success" => false,
        "message" => "Nom de fichier non valide."
    ]);
    exit;
}

// Chemin exact du dossier de stockage
$folder = __DIR__ . "/../../data/";

// Chemin complet du fichier à supprimer
$fullPath = realpath($folder . $file);

// Vérification que le fichier existe dans le dossier autorisé
if (!$fullPath || strpos($fullPath, realpath($folder)) !== 0) {
    echo json_encode([
        "success" => false,
        "message" => "Fichier introuvable ou accès interdit."
    ]);
    exit;
}

// Vérifier que le fichier existe vraiment
if (!file_exists($fullPath)) {
    echo json_encode([
        "success" => false,
        "message" => "Le fichier n'existe pas."
    ]);
    exit;
}

// Tentative de suppression
if (unlink($fullPath)) {
    echo json_encode([
        "success" => true,
        "message" => "Fichier supprimé avec succès."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la suppression du fichier."
    ]);
}
?>
