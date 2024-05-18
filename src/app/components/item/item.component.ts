import { Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  currentDate = moment();
  @Input() task: any;
  @Input() isCurrent: boolean = false;
  // @Output() taskUpdated: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    // console.log('Item ngOnInit:', this.task);
    this.processTasks(this.task);
  }

  private processTasks(task: any): void {
    if (task) {
      const lastDate = moment(task.last_date);
      const createDate = moment(task.create_date);
      task.daysRemaining = lastDate.diff(this.currentDate, 'days') ;
      task.creationDuration = lastDate.diff(createDate, 'days');
      if (lastDate > this.currentDate) {
        task.daysRemaining += 1;
      }
      const allDates = [];
      const currentDate = createDate.clone();

      while (currentDate.isSameOrBefore(lastDate, 'day')) {
        allDates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'day');
      }

      const tasksForAllDates = allDates.map((date) => {
        return {
          ...task,
          create_date: date,
          last_date: date,
          daysRemaining: lastDate.diff(date, 'days'),
        };
      });

      task.betweenDays = tasksForAllDates; 
      // console.log('Görev ve tarihler: ', task);
    } else {
      console.log('Veritabanında hiç görev bulunamadı.');
    }
  }

  calculateWidth(): string {
    const widthPerDay = 219;
    const creationDuration = this.task.creationDuration || 0;
    var calculatedWidth = 0;
    if (creationDuration == 0) {
      calculatedWidth = widthPerDay;
    } else {
      calculatedWidth = 114 + widthPerDay * creationDuration;
    }

    return `${calculatedWidth}px`;
  }
}