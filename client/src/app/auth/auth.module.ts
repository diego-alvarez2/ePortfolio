import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./components/register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), RegisterComponent, LoginComponent, ReactiveFormsModule, CommonModule],
    providers: [AuthService],

})

export class AuthModule {

}