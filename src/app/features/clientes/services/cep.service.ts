import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root',
})
export class CepService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://cadastro-clientes-api-06j8.onrender.com/api/Cep';

  buscarCep(cep: string): Observable<CepResponse> {

    const cepLimpo = cep.replace(/\D/g, '');

    return this.http.get<CepResponse>(
      `${this.apiUrl}/${cepLimpo}`
    );
  }
}