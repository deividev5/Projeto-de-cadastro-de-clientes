import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Cadastro } from './cadastro';
import { CadastroService } from '../services/cadastro.service';
import { NgFor, CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [HttpClientModule, NgFor, HeaderComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {


  // Vetor com os cadastros retornados pela API
  vetor: Cadastro[] = [];


  // Injeta o serviço de cadastro e o roteador
  constructor(private cadastro_service: CadastroService, private router: Router) {}

  // Método executado ao inicializar o componente
  ngOnInit() {
    this.selecao(); // Carrega os cadastros da API
  }

  /**
   * Busca os cadastros no backend e preenche o vetor local
   */
  selecao(): void {
    this.cadastro_service.obterCadastros().subscribe((res: Cadastro[]) => {
      this.vetor = res;
    });
  }

  /**
   * Remove o cliente após confirmação
   * @param c Cadastro a ser removido
   */
  remover(c: Cadastro): void {
    if (confirm(`Tem certeza que deseja excluir o cliente "${c.nome}"?`)) {
      this.cadastro_service.removerCliente(c).subscribe((res: Cadastro[]) => {
        this.vetor = res; // Atualiza a lista local após a exclusão
      });
    }
  }

  /**
   * Redireciona para a tela de edição do cliente
   * @param id ID do cadastro
   */
  Editar(id: number | undefined): void {
    if (id === undefined) return; // Evita erro caso o ID esteja ausente
    this.router.navigate(['/editar', id]); // Navega para a rota de edição
  }

}
