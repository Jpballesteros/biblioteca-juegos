import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Juegos, ResponseJuegos, ResponseStatusJuego } from '../juegos';
import { environment } from '../../environments/environment.development';
import { JuegosService } from '../juegos.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listado-juegos',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink, CommonModule],
  templateUrl: './listado-juegos.component.html',
  styleUrl: './listado-juegos.component.css'
})
export class ListadoJuegosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'img', 'editar', 'eliminar'];
  dataSource: Juegos[] = [];
  ruta_imagenes = environment.ruta_imagenes;
  form: FormGroup | undefined;
  currentImage: string | null = null;

juegos: any;

  constructor(private juegosService: JuegosService) { }

  ngOnInit(): void {
    this.obtenerJuegos();
  }

  obtenerJuegos() {
    this.juegosService.obtenerJuegos()
      .subscribe({
        next: (value: ResponseJuegos) => {
          this.juegos = value.juegos;
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            text: 'Error en el servidor'
          });
        }
      });
  }

  eliminarJuego(id: string) {
    this.juegosService.eliminarJuego(id)
      .subscribe({
        next: (value: ResponseStatusJuego) => {
          const { estado, mensaje } = value;
          if (estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'Juego eliminado exitosamente'
            });
            this.obtenerJuegos();
          } else {
            Swal.fire({
              icon: 'error',
              text: mensaje
            });
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            text: 'Error en el servidor'
          });
        }
      });
  }
}
