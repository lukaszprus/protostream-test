import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './can-activate.guard';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [CanActivateGuard],
    runGuardsAndResolvers: 'always',
    component: MainComponent,
    data: {
      ac: 'loggedIn'
    },
    children: [
      {
        path: '',
        component: ListComponent
      }, {
        path: 'item/:id',
        component: DetailComponent
      }
    ]
  }, {
    path: 'login',
    canActivate: [CanActivateGuard],
    runGuardsAndResolvers: 'always',
    component: LoginComponent,
    data: {
      ac: 'notLoggedIn'
    }
  },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
