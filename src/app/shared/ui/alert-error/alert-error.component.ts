import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alertError',
  standalone: true,
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.scss'
})
export class AlertErrorComponent {
  @Input() formName!:FormGroup;
  @Input() controleName!:string;

}
