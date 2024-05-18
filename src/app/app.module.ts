import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupabaseService } from './access-layer/supabase.service';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FlagComponent } from './components/flag/flag.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { TaskComponent } from './components/task/task.component';
import { AddFlagComponent } from './components/add-flag/add-flag.component';
import { ColumnComponent } from './components/column/column.component';
import { ItemComponent } from './components/item/item.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    FlagComponent,
    NavbarComponent,
    UsersComponent,
    TaskComponent,
    AddFlagComponent,
    CalendarComponent,
    ColumnComponent,
    ItemComponent,
    CreateTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SupabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
