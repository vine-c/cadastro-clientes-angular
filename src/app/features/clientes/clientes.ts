import { Component } from '@angular/core';
import { ClienteForm } from './components/cliente-form/cliente-form';
import { ClienteList } from './components/cliente-list/cliente-list';

@Component({
  selector: 'app-clientes',
  imports: [
    ClienteForm,
    ClienteList
  ],
  template: `

    <main class="pagina">

      <header class="pagina-header">

        <h1>Cadastro de Clientes</h1>

        <p>
          Cadastre, consulte e gerencie seus clientes.
        </p>

      </header>


      <app-cliente-form></app-cliente-form>

      <app-cliente-list></app-cliente-list>

    </main>

  `,
  styleUrl: './clientes.css',
})
export class Clientes {}