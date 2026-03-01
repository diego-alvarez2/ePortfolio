import { Component, OnInit } from "@angular/core";
import { BoardsService } from "../../../shared/services/boards.services";
import { BoardInterface } from "../../../shared/types/board.interface";
import { InlineFormComponent } from "../../../shared/modules/inlineForm/components/inlineForm/inlineForm.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule, NgForOf } from "@angular/common";
import { TopbarComponent } from "../../../shared/modules/topbar/components/topbar/topbar.component";

@Component({
    standalone: true,
    selector: 'boards',
    templateUrl: './boards.component.html',
    imports: [InlineFormComponent, RouterLink, RouterLinkActive, NgForOf, CommonModule, TopbarComponent]
})

export class BoardsComponent implements OnInit {
    boards: BoardInterface[] = [];
    
    constructor(private boardsService: BoardsService) {}

    ngOnInit(): void {
        this.boardsService.getBoards().subscribe((boards) => {
            this.boards = boards;
            console.log('Boards received', boards);
        });
    } 
    
    createBoard(title: string): void {
        this.boardsService.createBoard(title).subscribe(createBoard => {
            this.boards = [...this.boards, createBoard];
        });
    }
}