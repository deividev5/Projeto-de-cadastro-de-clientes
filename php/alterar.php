<?php 

//incluir a conexão 
include("conexao.php");

//obter dados 
$obterDados = file_get_contents("php://input");

//extrair os dados em Json
$extrair = json_decode($obterDados);

//separar os dados em JSON
$id = $extrair->cadastros->id;
$nome = $extrair->cadastros->nome;
$email = $extrair->cadastros->email;
$telefone = $extrair->cadastros->telefone;

//SQL
$sql = "UPDATE cadastros SET nome = '$nome', email = '$email', telefone = '$telefone' WHERE id=$id";
mysqli_query($conexao, $sql);

//Exporta os dados cadastrados 
$cadastro = [
    'id' => $id,
    'nome' => $nome,
    'email' => $email,
    'telefone' => $telefone
];

//retorna como Json
echo json_encode(['cadastro'  => $cadastro]);


?>