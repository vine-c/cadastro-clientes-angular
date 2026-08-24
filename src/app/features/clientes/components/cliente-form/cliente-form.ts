import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CepService } from '../../services/cep.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cliente-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm implements OnInit {

  buscandoCep = false;
  mensagemCep = '';

  clienteEditando: Cliente | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly cepService = inject(CepService);
  private readonly clienteService = inject(ClienteService);

  clienteForm = this.fb.nonNullable.group({

    nome: ['', Validators.required],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    telefone: [''],

    cpf: [
      '',
      Validators.required
    ],

    cep: [
      '',
      Validators.required
    ],

    logradouro: [''],

    numero: [''],

    bairro: [''],

    cidade: [''],

    uf: ['']

  });


  ngOnInit(): void {

    this.clienteService.clienteEdicao$.subscribe(cliente => {

      this.clienteEditando = cliente;

      if (cliente) {
        this.clienteForm.patchValue(cliente);
      }

    });

  }


  salvar(): void {
  if (this.clienteForm.invalid) {
    this.clienteForm.markAllAsTouched();
    return;
  }

  const cliente: Cliente = {
    id: this.clienteEditando?.id ?? Date.now().toString(),
    ...this.clienteForm.getRawValue()
  };

  if (this.clienteEditando) {
    this.clienteService.atualizar(cliente);
  } else {
    this.clienteService.adicionar(cliente);
  }

  this.clienteForm.reset();

  this.clienteEditando = null;
}


  buscarCep(): void {

    const cep = this.clienteForm.controls.cep.value;

    this.mensagemCep = '';

    if (!cep) {

      this.mensagemCep = 'Informe o CEP.';

      return;
    }


    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {

      this.mensagemCep = 'Informe um CEP válido.';

      return;
    }


    this.buscandoCep = true;


    this.cepService.buscarCep(cep).subscribe({

      next: (endereco) => {

        this.clienteForm.patchValue({

          logradouro: endereco.logradouro,

          bairro: endereco.bairro,

          cidade: endereco.localidade,

          uf: endereco.uf

        });
        if (endereco.uf === null){
          this.mensagemCep ='CEP não encontrado.';
        }
        this.buscandoCep = false;

      },


      error: (erro) => {

        console.error('Erro ao buscar CEP:', erro);

        this.buscandoCep = false;


        if (erro.status === 404) {

          this.mensagemCep = 'CEP não encontrado.';

        } else {

          this.mensagemCep =
            'Não foi possível consultar o CEP. Tente novamente.';

        }

      }

    });

  }


  onCepInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    value = value.substring(0, 8);

    if (value.length > 5) {

      value =
        value.substring(0, 5) +
        '-' +
        value.substring(5);

    }

    this.clienteForm.controls.cep.setValue(value, {
      emitEvent: false
    });

  }


  onCpfInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    value = value.substring(0, 11);


    if (value.length > 9) {

      value =
        value.substring(0, 3) +
        '.' +
        value.substring(3, 6) +
        '.' +
        value.substring(6, 9) +
        '-' +
        value.substring(9);

    } else if (value.length > 6) {

      value =
        value.substring(0, 3) +
        '.' +
        value.substring(3, 6) +
        '.' +
        value.substring(6);

    } else if (value.length > 3) {

      value =
        value.substring(0, 3) +
        '.' +
        value.substring(3);

    }


    this.clienteForm.controls.cpf.setValue(value, {
      emitEvent: false
    });

  }


  onTelefoneInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    value = value.substring(0, 11);


    if (value.length > 10) {

      value =
        '(' +
        value.substring(0, 2) +
        ') ' +
        value.substring(2, 7) +
        '-' +
        value.substring(7);

    } else if (value.length > 6) {

      value =
        '(' +
        value.substring(0, 2) +
        ') ' +
        value.substring(2, 6) +
        '-' +
        value.substring(6);

    } else if (value.length > 2) {

      value =
        '(' +
        value.substring(0, 2) +
        ') ' +
        value.substring(2);

    }


    this.clienteForm.controls.telefone.setValue(value, {
      emitEvent: false
    });

  }

}