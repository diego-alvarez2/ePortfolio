import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BoardsService } from '../../../shared/services/boards.services';
import { BoardService } from '../../services/board.service';
import { BoardInterface } from '../../../shared/types/board.interface';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SocketService } from '../../../shared/services/socket.service';
import { SocketEventsEnum } from '../../../shared/types/socketEvents.enum';
import { AuthService } from '../../../auth/services/auth.service';
import { ColumnsService } from '../../../shared/services/columns.service';
import { ColumnInterface } from '../../../shared/types/column.interface';
import { TopbarComponent } from "../../../shared/modules/topbar/components/topbar/topbar.component";
import { InlineFormComponent } from "../../../shared/modules/inlineForm/components/inlineForm/inlineForm.component";
import { ColumnInputInterface } from '../../../shared/types/columnInput.interface';
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { TaskInterface } from '../../../shared/types/task.interface';
import { TasksService } from '../../../shared/services/tasks.service';
import { TaskInputInterface } from '../../../shared/types/taskInput.interface';



@Component({
  standalone: true,
  selector: 'board',
  templateUrl: './board.component.html',
  imports: [AsyncPipe, CommonModule, TopbarComponent, InlineFormComponent, ɵInternalFormsSharedModule]
})
export class BoardComponent implements OnInit {
  boardId: string;
  data$: Observable<{
    board: BoardInterface;
    columns: ColumnInterface[];
    tasks: TaskInterface[]
  }>

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private socketService: SocketService,
    private authService: AuthService,
    private columnsService: ColumnsService,
    private tasksService: TasksService
  ) {
    const boardId = this.route.snapshot.paramMap.get('boardId');

    if (!boardId) {
      throw new Error('Cant get boardID from url');
    }

    this.boardId = boardId;
    this.data$ = combineLatest([
      this.boardService.board$.pipe(filter(Boolean)),
      this.boardService.columns$,
      this.boardService.tasks$,
    ]).pipe(map(([board, columns, tasks]) => ({
      board,
      columns,
      tasks,
    })))
  }

  ngOnInit(): void {
    
    this.fetchData();
    this.initializeListeners();

    this.authService.currentUser$
    .pipe(
      filter(user => !!user),
      take(1)
    )
    .subscribe(() => {
      this.socketService.emit(
        SocketEventsEnum.boardsJoin,
        { boardId: this.boardId }
      );

      this.socketService
        .listen<ColumnInterface>(SocketEventsEnum.columnsCreateSuccess)
        .subscribe((column) => {
          setTimeout(() => this.boardService.addColumn(column), 0);
        });

        this.socketService
        .listen<TaskInterface>(SocketEventsEnum.tasksCreateSuccess)
        .subscribe((task) => {
          setTimeout(() => this.boardService.addTask(task), 0);
        });
    });

  }

  initializeListeners(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.boardService.leaveBoard(this.boardId);
      }
    });
  }

  fetchData(): void {
    this.boardsService.getBoard(this.boardId).subscribe((board) => {
      console.log('board', board);
      this.boardService.setBoard(board);
    });
    this.columnsService.getColumns(this.boardId).subscribe(columns => {
      this.boardService.setColumns(columns);
    });
    this.tasksService.getTasks(this.boardId).subscribe(tasks => {
      this.boardService.setTasks(tasks);
    });
  }

  createColumn(title: string): void {
    const columnInput: ColumnInputInterface ={
      title,
      boardId: this.boardId,
    };
    this.columnsService.createColumn(columnInput);
  }

  createTask(title: string, columnId: string): void {
    const taskInput: TaskInputInterface = {
      title,
      boardId: this.boardId,
      columnId
    };
    this.tasksService.createTask(taskInput);
  }

  getTaskByColumn(columnId: string, tasks: TaskInterface[]): TaskInterface[] {
    return tasks.filter((task) => task.columnId === columnId);
  }    

}
