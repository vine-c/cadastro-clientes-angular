import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clientes } from './features/clientes/clientes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Clientes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cadastro-clientes');
}
