import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GetTasksService } from 'src/app/services/get-tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dates: { date: moment.Moment; tasks: any[] }[] = [];
  tasks: any[] = [];
  currentDate = moment();
  filteredTasks: any[] = [];
  columnData: any[] = [];
  constructor(private getTasksService: GetTasksService) {}


  generateDates() {
    const currentDate = moment();
  
    for (let i = -3; i <= 3; i++) {
      const date = currentDate.clone().add(i, 'days');
      const tasksForDate = this.getTasksForDate(date);
      this.dates.push({ date, tasks: tasksForDate });
    }
  }
  

  getColumnData(dateInfo: { date: moment.Moment; tasks: any[] }): any[] {
    this.filteredTasks = [];
  
    const momentDate = dateInfo.date.format('YYYY-MM-DD');
    
    this.tasks.forEach((task) => {
      const startDate = moment(task.create_date).startOf('day');
      const endDate = moment(task.last_date).endOf('day');
  
      if (dateInfo.date.isBetween(startDate, endDate, 'day', '[]')) {
        this.filteredTasks.push(task);

      }
    });
  
    return this.filteredTasks;
  }
  

  ngOnInit(): void {
    this.generateDates();
    this.fetchAndFilterTasks();
  }

async fetchAndFilterTasks(): Promise<void> {
  await this.getTasksService.fetchTasks();
  const currentDate = moment();

  this.tasks = this.getTasksService.tasks.filter((task) =>
    moment(task.create_date).isBetween(
      currentDate.clone().subtract(3, 'days'),
      currentDate.clone().add(3, 'days').endOf('day'),
      'day',
      '[]'
    )
  );
}


  getTasksForDate(date: moment.Moment): any[] {
    return this.getTasksService.tasks.filter((task) =>
      moment(task.date).isSame(date, 'day')
    );
  }
}
