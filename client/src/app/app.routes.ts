import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/components/home/home.component';
import { AuthGuardService } from './auth/services/authGuard.service';
import { BoardsComponent } from './boards/components/boards/boards.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: '', component: HomeComponent},
    { 
        path: 'boards', 
        component: BoardsComponent,
        canActivate: [AuthGuardService]
    },
];
