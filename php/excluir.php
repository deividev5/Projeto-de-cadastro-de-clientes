
<?php

// Incluir a conexão
include("conexao.php");

// Obter o ID do curso da URL (usando $_GET)
$id= isset($_GET['id']) ? $_GET['id'] : null;

// Verificar se o ID foi passado
if ($id === null) {
    echo json_encode(["error" => "ID do cadastro não fornecido"]);
    exit;
}

// SQL para excluir o curso
$sql = "DELETE FROM cadastros WHERE id = $id";

// Executar a query
if (mysqli_query($conexao, $sql)) {
    echo json_encode(["message" => "Cadastro excluído com sucesso"]);
} else {
    echo json_encode(["error" => "Erro ao excluir o cadastro"]);
}

?>
