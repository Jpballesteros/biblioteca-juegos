import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { JuegosService } from '../juegos.service';
import Swal from 'sweetalert2';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-crear-juego',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, JsonPipe, MatCardModule, CommonModule ],
  templateUrl: './crear-juego.component.html',
  styleUrl: './crear-juego.component.css'
})
export class CrearJuegoComponent {
  formJuego!: FormGroup

  constructor(private fb: FormBuilder, private juegosService: JuegosService) {
    this.formJuego = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    })
  }

  get f() {
    return this.formJuego.controls;
  }

  guardarJuego() {
    if (this.formJuego.invalid) {
      return
    }

    this.juegosService.guardarJuego(this.formJuego.value)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'Juego guardado exitosamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error al guardar el juego'
            })
          }
        }, error: () => {
          Swal.fire({
            icon: 'error',
            text: 'Error en el servidor'
          })
        }
      })
  }
  onFileSelected(event: any): void {
    this.formJuego.patchValue({
      imagen: event.target.files[0]

    });
  } 
}
