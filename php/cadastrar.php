<?php

//incluit conexão
include("conexao.php");

//obter dados
$obterDados = file_get_contents("php://input");

//estrair os dados em json
$extrair = json_decode($obterDados);

//separar od dados em json
$nome = $extrair->cadastros->nome;
$email = $extrair->cadastros->email;
$telefone = $extrair->cadastros->telefone;

//SQL
$sql = "INSERT INTO cadastros (nome, email, telefone) VALUES ('$nome', '$email', '$telefone')";
mysqli_query($conexao, $sql);

//exportar os dados cadastrados
$cadastro = [
    'nome' => $nome,
    'email' => $email,
    'telefone' => $telefone
];

//retornar como json
echo json_encode([['cadastro' => $cadastro]]);

?>