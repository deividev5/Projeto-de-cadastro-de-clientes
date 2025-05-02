import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CadastroService } from '../services/cadastro.service';
import { Cadastro } from '../cadastro/cadastro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-editar.component.html',
  styleUrls: ['./cadastro-editar.component.css']
})
export class CadastroEditarComponent implements OnInit {
  form!: FormGroup;  // Formulário reativo para editar os dados
  cadastroId!: number; // ID do cadastro que será editado

  constructor(
    private fb: FormBuilder, // Responsável por criar o formulário reativo
    private cadastroService: CadastroService, // Serviço para interação com a API
    private route: ActivatedRoute, // Para capturar o ID da URL
    private router: Router // Para navegação
  ) {}

  // Método chamado no carregamento do componente
  ngOnInit(): void {
    // Captura o parâmetro 'id' da URL para editar o cadastro
    this.route.params.subscribe(params => {
      this.cadastroId = +params['id'];  // Converte o parâmetro para número
      this.initForm();  // Inicializa o formulário
      this.carregarCadastro();  // Carrega os dados do cadastro
    });
  }

  /**
   * Inicializa o formulário com validações.
   * O formulário possui os campos 'nome', 'email' e 'telefone', com validações associadas.
   */
  private initForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(14)]], 
    });
  }

  /**
   * Carrega os dados do cadastro com base no ID.
   * Quando o cadastro é encontrado, os dados são preenchidos automaticamente no formulário.
   * Caso contrário, é exibido um alerta.
   */
  private carregarCadastro(): void {
    this.cadastroService.obterCadastros().subscribe(cadastros => {
      const cadastro = cadastros.find(c => c.id !== undefined && +c.id === this.cadastroId);
      if (cadastro) {
        this.form.patchValue(cadastro);  // Preenche o formulário com os dados encontrados
      } else {
        alert('Cadastro não encontrado.');
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Método chamado quando o formulário é submetido.
   * Se o formulário for válido, envia a atualização para a API.
   */
  atualizarCadastro(): void {
    if (this.form.valid) {
      const dadosAtualizados: Cadastro = { ...this.form.value, id: this.cadastroId };
      this.cadastroService.atualizarCadastro(dadosAtualizados).subscribe({
        next: () => {
          alert('Cadastro atualizado com sucesso!');
          this.router.navigate(['/']); // Redireciona para a página inicial
        },
        error: (err) => {
          console.error('Erro ao atualizar cadastro:', err);
          alert('Erro ao atualizar cadastro.');
        }
      });
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }

  /**
   * Método para formatar o campo de telefone com máscara.
   * A máscara muda dependendo do número de caracteres digitados.
   */
  formatarTelefone(): void {
    let valor = this.form.get('telefone')?.value || '';
    
    // Remove todos os caracteres não numéricos
    valor = valor.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX para 11 dígitos e (XX) XXXX-XXXX para 10
    if (valor.length <= 10) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    // Atualiza o valor do campo de telefone com a máscara
    this.form.get('telefone')?.setValue(valor, { emitEvent: false });
  }
}
