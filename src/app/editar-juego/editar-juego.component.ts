import { Component, Input, OnInit, input } from '@angular/core';
import { JuegosService } from '../juegos.service';
import { Juegos } from '../juegos';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-juego',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './editar-juego.component.html',
  styleUrl: './editar-juego.component.css'
})
export class EditarJuegoComponent implements OnInit {
  @Input('id') idJuego!: string
  infoJuegos!: Juegos
  formJuego!: FormGroup
  

  constructor(private juegosService: JuegosService, private fb: FormBuilder) {
    this.formJuego = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    })
  }

  ngOnInit(): void {
    this.obtenerJuegoPorId()
  }

  get controls() {
    return this.formJuego.controls
  }

  obtenerJuegoPorId() {
    this.juegosService.obtenerJuegoPorId(this.idJuego)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            this.formJuego.patchValue({
              id: value.producto.id,
              nombre: value.producto.nombre,
              descripcion: value.producto.descripcion,
              precio: value.producto.precio,
              // imagen: value.producto.imagen
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

  actualizarJuego() {
    if (this.formJuego.invalid) {
      return
    } 

    this.juegosService.actualizarJuego(this.formJuego.value)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'Juego actualizado exitosamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error al actualizar juego'
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
}
