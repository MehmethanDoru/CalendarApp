import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  firstLastDate: any[] = [];

  setFirstLastDate(date: any) {
    this.firstLastDate = date;
  }

  getFirstLastDate() {
    return this.firstLastDate;
  }
}