import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private readonly clienteEdicaoSubject =
  new BehaviorSubject<Cliente | null>(null);

readonly clienteEdicao$ =
  this.clienteEdicaoSubject.asObservable();

  private readonly storageKey = 'clientes';

  private readonly clientesSubject =
    new BehaviorSubject<Cliente[]>(this.listar());

  readonly clientes$ =
    this.clientesSubject.asObservable();

    editar(cliente: Cliente): void {
  this.clienteEdicaoSubject.next(cliente);
}
  listar(): Cliente[] {
    const dados = localStorage.getItem(this.storageKey);

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  }

  adicionar(cliente: Cliente): void {
    const clientes = this.listar();

    clientes.push(cliente);

    this.salvar(clientes);
  }

  atualizar(clienteAtualizado: Cliente): void {
    const clientes = this.listar();

    const index = clientes.findIndex(
      cliente => cliente.id === clienteAtualizado.id
    );

    if (index === -1) {
      return;
    }

    clientes[index] = clienteAtualizado;

    this.salvar(clientes);
  }

  excluir(id: string): void {
    const clientes = this.listar();

    const novosClientes = clientes.filter(
      cliente => cliente.id !== id
    );

    this.salvar(novosClientes);
  }

  private salvar(clientes: Cliente[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(clientes)
    );

    this.clientesSubject.next(clientes);
  }
}