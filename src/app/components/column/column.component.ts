import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  @Input() date: any;
  @Input() tasks: any[] | undefined;

  ngOnInit(): void {
  }
}
