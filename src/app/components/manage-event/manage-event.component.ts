import {Component} from '@angular/core';
import {EventService} from '../../services/event';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Event} from '../../models/event';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-manage-event',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatError,
    MatLabel,
    MatCardTitle,
  ],
  templateUrl: './manage-event.component.html',
  standalone: true,
  styleUrl: './manage-event.component.scss'
})
export class ManageEventComponent  {

  eventForm: FormGroup; // FormGroup pour gérer les événements

  constructor(
    private fb: FormBuilder,
    private eventService: EventService // Service pour gérer les événements
  ) {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]], // Validation pour le nom
      description: ['', [Validators.required, Validators.maxLength(500)]], // Validation pour la description
      date: ['', [Validators.required]] // Validation pour la date
    });
  }

  ngOnInit(): void {}

  submitEvent(): void {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;

      // Créer un nouvel événement
      const newEvent = new Event(eventData.name, eventData.description, eventData.date);

      // Appeler le service pour sauvegarder l'événement
      this.eventService.post(newEvent).subscribe({
        next: (data: Event) => {
          console.log('Événement créé avec succès :', data);
          this.eventForm.reset(); // Réinitialiser le formulaire après succès
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'événement :', err);
        }
      });
    }
  }
}
