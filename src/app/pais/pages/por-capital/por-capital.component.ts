import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  termino: string = 'Buenos Aires';
  hayError: boolean = false;
  paises: Country[] = [];
  constructor(private PaisService: PaisService) {}
  buscar(termino: string) {
    console.log(this.termino);
    this.termino = termino;
    this.PaisService.buscarCapital(termino).subscribe(
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
    this.hayError = false;
  }
}
