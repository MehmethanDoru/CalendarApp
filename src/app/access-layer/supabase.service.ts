import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://pwahtlhawtpqzyquytod.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3YWh0bGhhd3RwcXp5cXV5dG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNDQ3MDksImV4cCI6MjAxODgyMDcwOX0.WncRSYmejNpVD6kNrtguPY80mLqIUn03hucZDf45uac';
  
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getSupabase() {
    return this.supabase;
  }
}
