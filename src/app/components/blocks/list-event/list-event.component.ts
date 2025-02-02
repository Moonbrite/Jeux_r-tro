import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../services/event';
import {Event} from '../../../models/event';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-event',
  imports: [
    DatePipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './list-event.component.html',
  standalone: true,
  styleUrl: './list-event.component.scss'
})
export class ListEventComponent implements OnInit {

  constructor(private serviceEvent: EventService) {
  }

  events:Event[] = [];

  ngOnInit(): void {
    this.serviceEvent.getAll().subscribe({
      next: (event) => {this.events = event},
      error: error => {console.log(error);}
    })
  }

}
