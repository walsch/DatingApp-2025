import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected members = signal<any>([]);
  private http = inject(HttpClient);
  protected readonly title = signal('Dating app');

  async ngOnInit() {
    this.members.set(await this.getMembers());
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch(error) {
      console.log(error);
      throw error;
    }
  }
}
