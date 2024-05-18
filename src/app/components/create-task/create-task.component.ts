import { Component } from '@angular/core';
import * as moment from 'moment';
import { SharedDataService } from 'src/app/services/shared-items.service';
import { SupabaseService } from 'src/app/access-layer/supabase.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  isCalendarOpen: boolean = false;
  inputStartDate: string = '';
  inputEndDate: string = '';
  startDate: moment.Moment | null = null;
  endDate: moment.Moment | null = null;
  isCreateTask=false;

  constructor(private sharedDataService: SharedDataService, private supabaseService: SupabaseService) {}

  openCalendar(): void {
    const inputElement = document.getElementById('inputDateRange') as HTMLInputElement;
    inputElement.value = 'Select date from calendar';
    if (this.isCalendarOpen == false) {
      this.isCalendarOpen = true;
    } else {
      this.isCalendarOpen = false;
    }
  }

async createTask(): Promise<void> {
    try {
      const firstLastDate = this.sharedDataService.getFirstLastDate();
      console.log('First and Last Date:', firstLastDate);
      console.log('Create Task:', firstLastDate[0], firstLastDate[1]);

      const formattedStartDate = moment(firstLastDate[0]).format('YYYY-MM-DD');
      const formattedEndDate = moment(firstLastDate[1]).format('YYYY-MM-DD');
      const inputElementName = document.getElementById('inputName') as HTMLInputElement;
      const name = inputElementName.value;
      inputElementName.value = '';

      const inputElementDesc = document.getElementById('inputDesc') as HTMLInputElement;
      const desc = inputElementDesc.value;
      inputElementDesc.value = '';

      const supabase = this.supabaseService.getSupabase();

      const { data, error } = await supabase
        .from('tasks')
        .insert([
          { name: name, description: desc, create_date:formattedStartDate, last_date: formattedEndDate },
        ])
        .select();

      this.isCalendarOpen = false;
      this.isCreateTask = false;
      location.reload();
    } catch (e) {
      console.error('An error occurred:', e);
    }
  }

}
