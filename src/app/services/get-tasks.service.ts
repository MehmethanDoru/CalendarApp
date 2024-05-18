import { EventEmitter, Injectable } from '@angular/core';
import { SupabaseService } from '../access-layer/supabase.service';


@Injectable({
  providedIn: 'root'
})
export class GetTasksService {
  tasks: any[] = [];
  tasksFetched: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private supabaseService: SupabaseService) { }

  async fetchTasks() {
    const supabase = this.supabaseService.getSupabase();
    const { data, error } = await supabase.from('tasks').select('*');
    console.log("get-tasktaki data: ", data)
    if (error) {
      console.error(error);
    } else {
      this.tasks = data;
      console.log('get-tasktaki ilk veri: ', this.tasks[0]?.id);
    }
  }
}
