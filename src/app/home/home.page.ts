import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number | null = 0;
  resultado: string = '';

  constructor() {}

  limparValor() {
    if (this.valor === 0) {
      this.valor = null;
    }
  }

  async converter() {
    if (!this.moedaOrigem || !this.moedaDestino || !this.valor) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.get('http://data.fixer.io/api/latest', {
        params: {
          access_key: '276467d39724e730ea86668731f5e1db',
          symbols: `${this.moedaOrigem},${this.moedaDestino}`,
        },
      });

      const taxas = response.data.rates;
      const taxaOrigem = taxas[this.moedaOrigem];
      const taxaDestino = taxas[this.moedaDestino];
      const valorConvertido = (this.valor / taxaOrigem) * taxaDestino;

      // Formatar o valor convertido como moeda
      this.resultado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: this.moedaDestino,
      }).format(valorConvertido);
    } catch (error) {
      console.error('Erro ao obter taxas de câmbio:', error);
      alert('Erro ao obter taxas de câmbio.');
    }
  }
}
