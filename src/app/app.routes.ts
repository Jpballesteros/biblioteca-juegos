import { Routes } from '@angular/router';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { CrearJuegoComponent } from './crear-juego/crear-juego.component';
import { EditarJuegoComponent } from './editar-juego/editar-juego.component';
import { ListadoJuegosComponent } from './listado-juegos/listado-juegos.component';

export const routes: Routes = [
    {
        path: '',
        component: NavegacionComponent,
        children: [
            {
                path: 'listado',
                component: ListadoJuegosComponent
            },
            {
                path: 'crear',
                component: CrearJuegoComponent
            },
            {
                path: 'editar/:id',
                component: EditarJuegoComponent
            }
        ]
    }
];
