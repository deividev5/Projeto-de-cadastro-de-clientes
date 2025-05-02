import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CadastroService } from '../services/cadastro.service';
import { Router } from '@angular/router';
import { Cadastro } from '../cadastro/cadastro';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {

  // Objeto de cadastro vinculado ao formulário
  cadastro: Cadastro = new Cadastro();

  constructor(
    private cadastroService: CadastroService, // Serviço responsável pelas operações com o backend
    private router: Router                    // Usado para navegação após o cadastro
  ) {}

  /**
   * Envia os dados preenchidos no formulário para o backend
   * e redireciona o usuário para a página inicial após sucesso
   */
  cadastrar(): void {
    this.cadastroService.CadastrarCliente(this.cadastro).subscribe(() => {
      alert("Cadastro feito com sucesso!");
      this.router.navigate(['/']);
    });
  }

  /**
   * Aplica formatação brasileira ao campo de telefone
   * Formatos suportados:
   * - (XX) XXXX-XXXX
   * - (XX) XXXXX-XXXX
   */
  formatarTelefone(): void {
    let telefone = (this.cadastro.telefone || '').replace(/\D/g, ''); // Remove caracteres não numéricos

    if (telefone.length <= 10) {
      this.cadastro.telefone = telefone.replace(
        /(\d{2})(\d{4})(\d{0,4})/,
        '($1) $2-$3'
      );
    } else {
      this.cadastro.telefone = telefone.replace(
        /(\d{2})(\d{5})(\d{0,4})/,
        '($1) $2-$3'
      );
    }
  }
}
