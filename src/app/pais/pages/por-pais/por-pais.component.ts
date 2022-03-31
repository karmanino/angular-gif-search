import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = 'Ar';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private PaisService: PaisService) {}
  buscar(termino: string) {
    this.mostrarSugerencias = false;
    console.log(this.termino);
    this.termino = termino;
    this.PaisService.buscarPais(termino).subscribe(
      (paises) => {
        this.hayError = false;
        console.log(paises);
        this.paises = paises;
      },
      (err) => {
        this.hayError = true;
        console.log('error');
        console.info(err);
      }
    );
  }

  sugerencias(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.PaisService.buscarPais(termino).subscribe(
      (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
        this.mostrarSugerencias = true;
      },
      (err) => {
        this.paisesSugeridos = [];
        this.mostrarSugerencias = false;
      }
    );
  }
}
