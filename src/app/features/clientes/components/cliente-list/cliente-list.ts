import { Component, inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cliente-list',
  imports: [
    MatButtonModule
  ],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css',
})
export class ClienteList {

  private readonly clienteService = inject(ClienteService);
  private readonly dialog = inject(MatDialog);

  clientes: Cliente[] = [];

  ngOnInit(): void {
    this.clienteService.clientes$.subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  excluir(cliente: Cliente): void {

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        nome: cliente.nome
      }
    });

    dialogRef.afterClosed().subscribe(confirmou => {

      if (!confirmou) {
        return;
      }

      this.clienteService.excluir(cliente.id);
    });
  }

  editar(cliente: Cliente): void {
    this.clienteService.editar(cliente);
  }

}