<?php
//incluir a conexão 
include("conexao.php");

//verificar se a conexão foi estabelecida com sucesso
if (!isset($conexao) || !$conexao) {
    die("Error: Conexão com o banco de dados falhou.");
}

//Sql para selecionar os campos corretos 
$sql = "SELECT id, nome, email, telefone FROM cadastros";

//Executar a query
$executar = mysqli_query($conexao, $sql);

//Vetor para armazenar os cadastros 
$cadastros = [];

//Laço para buscar os dados
while ($linha = mysqli_fetch_assoc($executar)) {
    $cadastros[] = [
        "id" => $linha["id"],
        "nome" => $linha["nome"],
        "email" => $linha["email"],
        "telefone" => $linha["telefone"]
    ];
}

//retornar como json
header("Content-Type: application/json");
echo json_encode(['cadastros' => $cadastros]);
