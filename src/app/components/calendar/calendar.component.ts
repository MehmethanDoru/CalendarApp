import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SharedDataService } from 'src/app/services/shared-items.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  currentMonth: any;
  weeksInMonthArray: any[] = [];
  selectedDates: any[] = [];
  startDate: moment.Moment | null = null;
  endDate: moment.Moment | null = null;
  firstLastDate: any[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.currentMonth = moment();
    this.generateDaysInMonthArray();
  }

  nextMonth() {
    this.currentMonth.add(1, 'months');
    this.generateDaysInMonthArray();
  }

  prevMonth() {
    this.currentMonth.subtract(1, 'months');
    this.generateDaysInMonthArray();
  }

  generateDaysInMonthArray() {
    this.weeksInMonthArray = [];
    const firstDayOfMonth = this.currentMonth
      .clone()
      .startOf('month')
      .startOf('week');
    const lastDayOfMonth = this.currentMonth
      .clone()
      .endOf('month')
      .endOf('week');

    let currentDay = firstDayOfMonth.clone();
    let currentWeek = [];

    while (currentDay.isBefore(lastDayOfMonth)) {
      currentWeek.push(currentDay.clone());

      if (currentDay.day() === 6) {
        this.weeksInMonthArray.push(currentWeek);
        currentWeek = [];
      }

      currentDay.add(1, 'day');
    }

    if (currentWeek.length > 0) {
      this.weeksInMonthArray.push(currentWeek);
    }
  }

  // Day in this month?
  isDayInCurrentMonth(date: moment.Moment): boolean {
    return date.isSame(this.currentMonth, 'month');
  }

  clearButton() {
    this.startDate = null;
    this.endDate = null;
  }
  setDate(date: moment.Moment): void {
    if (this.startDate == null) {
      this.startDate = date;
      console.log('b');

      return;
    }
    if (this.startDate != null && this.endDate == null) {
      this.endDate = date;
      console.log('a');
      this.getDatesBetween(this.startDate, this.endDate);
      this.getDatesFirstLast(this.dates);
      return;
    }
    if (this.startDate != null && this.endDate != null) {
      this.startDate = date;
      this.endDate = null;
      console.log('c');
      console.log('d', this.startDate);


      return;
    }
  }

  // Get date range
  dates: moment.Moment[] = [];

  getDatesBetween(
    startDate: moment.Moment,
    endDate: moment.Moment
  ): moment.Moment[] {
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      this.dates.push(currentDate.clone());
      currentDate.add(1, 'day');
    }

    return this.dates;
  }

  getDatesFirstLast(date: any) {
    const rangeLength = this.dates.length;
    this.firstLastDate[0] = date[0];
    this.firstLastDate[1] = date[rangeLength - 1];
    this.sharedDataService.setFirstLastDate(this.firstLastDate);
    this.dates = [];
  }

  // Control days
  isDateInRange(day: moment.Moment) {
    return day.isBetween(this.startDate, this.endDate, 'day');
  }

  isDateSelect(day: moment.Moment) {
    return day.isSame(this.startDate, 'day') || day.isSame(this.endDate, 'day');
  }

  isDateInStart(day: moment.Moment) {
    return day.isSame(this.startDate, 'day');
  }

  isDateInEnd(day: moment.Moment) {
    return day.isSame(this.endDate, 'day');
  }
}
