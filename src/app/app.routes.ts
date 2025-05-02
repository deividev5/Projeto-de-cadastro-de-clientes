import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CadastroEditarComponent } from './cadastro-editar/cadastro-editar.component';

export const routes: Routes = [
    {path: '', component: CadastroComponent}, // Rota para a página Home
    {path: 'cadastrar', component: CadastrarComponent}, //Rota para a página de cadastramento
    {path: 'editar/:id', component: CadastroEditarComponent} //Rota para a página de edição
];
