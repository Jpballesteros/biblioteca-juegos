export interface ResponseJuegos {
    estado: number;
    juegos: Juegos[]
}

export interface Juegos {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    imagen: string;
}

export interface ResponseJuegoId {
    estado: number;
    juego: Juegos;
}

export interface ResponseStatusJuego {
    estado: number;
    mensaje: string;
}