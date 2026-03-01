import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { SocketService } from "../../../shared/services/socket.service";

@Component({
    standalone: true,
    selector: 'auth-register',
    templateUrl:  './register.component.html',
    imports: [RouterLink, ReactiveFormsModule, CommonModule]
})

export class RegisterComponent implements OnInit {
    

    errorMessage: string | null = null;
    form!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private socketService: SocketService) {}
  
    ngOnInit(): void {
      this.form = this.fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }

    onSubmit(): void {  
        this.authService.register(this.form.value).subscribe({
            next: (currentUser) => {
                console.log('currentUser', currentUser);
                this.authService.setToken(currentUser);
                this.socketService.setupSocketConnection(currentUser);
                this.authService.setCurrentUser(currentUser);
                this.errorMessage = null;
                this.router.navigateByUrl('/');
            },
            error: (err: HttpErrorResponse) => {
                console.log('err', err.error);
                this.errorMessage = err.error.join(', '); // Join the errors with a comma
            },
        });
    }
}
