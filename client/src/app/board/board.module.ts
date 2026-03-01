import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/authGuard.service';
import { BoardComponent } from './components/board/board.component';
import { BoardService } from './services/board.service';
import { TopbarModule } from '../shared/modules/topbar/topbar.module';
import { ColumnsService } from '../shared/services/columns.service';
import { TasksService } from '../shared/services/tasks.service';

const routes: Routes = [
  {
    path: 'boards/:boardId',
    component: BoardComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), BoardComponent, RouterLink, TopbarModule],
  providers: [BoardService, ColumnsService, TasksService],
})
export class BoardModule {}
