import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../auth/services/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    imports: [RouterLink],
})

export class HomeComponent implements OnInit, OnDestroy {
    
    isLoggedInSubscription: Subscription | undefined;
    
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void { // redirecting to another route
        this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
            if (isLoggedIn) {
                this.router.navigateByUrl('/boards');
            }
        });
    }

    ngOnDestroy(): void {
        this.isLoggedInSubscription?.unsubscribe();
    }
}