<?php
//Variáveis de acesso 
$url = 'localhost';
$usuario = "root";
$senha = '';
$base = 'cadastros_cliente';

//criando conexão
$conexao = mysqli_connect($url, $usuario, $senha, $base);

//Verificar caso tenha erro
if (!$conexao) {
    die("Falha na conexão" . mysqli_connect_error());
}

//Arrumar os caracteres especiais 
mysqli_set_charset($conexao, "utf8");