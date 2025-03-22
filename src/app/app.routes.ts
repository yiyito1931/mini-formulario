import {Routes} from '@angular/router';
import {AuthGuard} from "./global/presentation/guards/auth-guard.service";
import {NotFoundComponent} from "./global/presentation/components/not-found/not-found.component";

export const AppRoutes: Routes = [
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then(m => m.FormularioModule)
  },
  { path: '**', pathMatch: 'full',
    component: NotFoundComponent },
];
