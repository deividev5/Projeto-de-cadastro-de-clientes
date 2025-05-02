import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadastro } from '../cadastro/cadastro';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  // URL base da API
  private url = 'http://localhost/Cadastro_de_Clientes/php/';

  // Armazena os cadastros localmente
  private vetor: Cadastro[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Obtém todos os cadastros da API
   */
  obterCadastros(): Observable<Cadastro[]> {
    return this.http.get<{ cadastros: Cadastro[] }>(this.url + 'listar').pipe(
      map((res) => {
        this.vetor = res.cadastros;
        return this.vetor;
      }),
      catchError((error) => {
        console.error('Erro ao obter cadastros', error);
        throw error;
      })
    );
  }

  /**
   * Cadastra um novo cliente na API e atualiza o vetor local
   * @param c Cadastro a ser inserido
   */
  CadastrarCliente(c: Cadastro): Observable<Cadastro[]> {
    return this.http
      .post<{ cadastros: Cadastro }>(this.url + 'cadastrar', { cadastros: c })
      .pipe(
        map((res) => {
          this.vetor.push(res.cadastros);
          return [...this.vetor]; // Retorna uma nova cópia do vetor
        })
      );
  }

  /**
   * Remove um cliente da API e atualiza o vetor local
   * @param c Cadastro com ID definido
   */
  removerCliente(c: Cadastro): Observable<Cadastro[]> {
    if (c.id === undefined) {
      throw new Error('id é obrigatório para remover o cliente');
    }

    const params = new HttpParams().set('id', c.id.toString());

    return this.http
      .delete<any>(this.url + 'excluir', {
        params,
        responseType: 'json' as const,
      })
      .pipe(
        map(() => {
          // Remove o item do vetor local
          this.vetor = this.vetor.filter((cadastro) => cadastro.id !== c.id);
          return this.vetor;
        }),
        catchError((error) => {
          console.error('Erro ao excluir o cadastro:', error);
          throw new Error('Falha ao remover o cadastro');
        })
      );
  }

  /**
   * Atualiza um cadastro existente na API e no vetor local
   * @param c Cadastro com ID e novos dados
   */
  atualizarCadastro(c: Cadastro): Observable<Cadastro[]> {
    return this.http
      .put<{ cadastro: Cadastro }>(this.url + 'alterar', { cadastros: c })
      .pipe(
        map((res) => {
          // Encontra e atualiza o cadastro no vetor local
          const index = this.vetor.findIndex(
            (cadastro) => cadastro.id === res.cadastro.id
          );
          if (index !== -1) {
            this.vetor[index] = res.cadastro;
          }
          return [...this.vetor];
        })
      );
  }
}
