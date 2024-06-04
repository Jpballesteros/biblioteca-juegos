import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juegos, ResponseJuegoId, ResponseJuegos, ResponseStatusJuego,  } from './juegos';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class JuegosService {
  private readonly endpoint = environment.api_url

  constructor(private http: HttpClient) {}

  obtenerJuegos(): Observable<ResponseJuegos> {
    return this.http.get<ResponseJuegos>(`${this.endpoint}juegos/listar`)

  }

  guardarJuego(data: Juegos){
    const formData = new FormData();
    formData.append('nombre', data.nombre)
    formData.append('descripcion', data.descripcion)
    formData.append('precio', data.precio)
    formData.append('imagen', data.imagen)
    return this.http.post(`${this.endpoint}juegos/crear`, formData)
  }

  obtenerJuegoPorId(id: string): Observable<ResponseJuegoId> {
    return this.http.get<ResponseJuegoId>(`${this.endpoint}juegos/detalle/${id}`)
  }


  actualizarJuego(data: Juegos) {
    const formData = new FormData();
    formData.append('imagen', data.imagen);
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    formData.append('precio', data.precio);

    return this.http.put(`${this.endpoint}juegos/actualizar/${data.id}`, formData)
  }

  eliminarJuego(id: string) {
    return this.http.delete<ResponseStatusJuego>(`${this.endpoint}juegos/eliminar/${id}`)
  }

}