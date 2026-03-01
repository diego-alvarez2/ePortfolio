import { CommonModule, NgClass } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'inline-form',
    templateUrl: './inlineForm.component.html',
    imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgClass, CommonModule],
})

export class InlineFormComponent {
    @Input() title: string = '';
    @Input() defaultText: string = 'Not defined';
    @Input() hasButton: boolean = false;
    @Input() buttonText: string = 'Submit';
    @Input() inputPlaceholder: string = '';
    @Input() inputType: string = 'input';

    @Output() handleSubmit = new EventEmitter<string>();

    isEditing: boolean = false;

    private fb = inject(FormBuilder);
    form = this.fb.group({
        title: [''],
    });

    activeEditing(): void {
        if (this.title) {
            this.form.patchValue({ title: this.title})
        }
        this.isEditing = true;
    }

    onSubmit(): void {
        if(this.form.value.title) {
            this.handleSubmit.emit(this.form.value.title)
        }
        this.isEditing = false;
        this.form.reset();
    }
}