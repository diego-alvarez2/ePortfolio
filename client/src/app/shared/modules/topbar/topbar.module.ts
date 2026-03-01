import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  imports: [CommonModule, RouterOutlet, TopbarComponent],
})
export class TopbarModule {}
