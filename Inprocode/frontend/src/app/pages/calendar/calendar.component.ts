
// calendar.component.ts



import { Component, OnInit } from '@angular/core';

import { CalendarOptions,  DateSelectArg,  EventChangeArg, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import esLocale from '@fullcalendar/core/locales/es';

import { EventService } from '../../services/event.service';
import { CalendarEvent } from '../../models/event.model';




// Asegúrate de que la ruta sea correcta
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {

  // Define la propiedad calendarOptions para las opciones del calendario
  calendarOptions: CalendarOptions = {};

  // Define la propiedad currentEvents para almacenar los eventos
  currentEvents:   CalendarEvent[] = [];


  constructor(private eventService: EventService) { }


  ngOnInit() {
    this.initCalendarOptions();
    this.fetchEvents();
  }

  initCalendarOptions() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale: esLocale,
      defaultAllDay: true,
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridDay,dayGridWeek,dayGridMonth,listMonth'
      },

      events: this.currentEvents,       // Usa la propiedad currentEvents para los eventos
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventChange: this.handleEventChange.bind(this), // Este es para eventos existentes que se arrastran a una nueva fecha/hora
    };
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events: CalendarEvent[]) => { // Asegúrate de que getEvents devuelva CalendarEvent[]
        this.currentEvents = events;
        this.calendarOptions.events = events; // Usa el tipo correcto para eventos
      },
      error: (err) => console.error('Error al cargar eventos:', err)
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Ingrese el nombre del evento:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Limpiar selección de calendario

    if (title) {
      const newEvent: CalendarEvent = {
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };

      this.eventService.createEvent(newEvent).subscribe({
        next: (event) => {
          calendarApi.addEvent(event);
          this.currentEvents.push(event); // Agregar al array local para mantener el estado
        },
        error: (e) => console.error(e)
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const eventName = prompt('Editar el nombre del evento:', clickInfo.event.title);

    if (eventName) {
      const eventIdAsString = clickInfo.event.id.toString(); // Convertir el id a string

      // Asumiendo que start, end y allDay están disponibles directamente en clickInfo.event
      const updatedEvent: CalendarEvent = {
        id:     eventIdAsString, // Asegurar que el id sea un string
        title:  eventName,
        start:  clickInfo.event.startStr,
        end:    clickInfo.event.endStr,
        allDay: clickInfo.event.allDay
      };

      this.eventService.updateEvent(updatedEvent.id!, updatedEvent).subscribe({
        next: () => {
          clickInfo.event.setProp('title', eventName); // Actualizar el título del evento en el calendario
          // Buscar y actualizar el evento en el array local
          const index = this.currentEvents.findIndex(event => event.id === updatedEvent.id);
          if (index > -1) {
            this.currentEvents[index] = updatedEvent;
          }
        },
        error: (e) => console.error(e)
      });
    }
  }



  handleEventChange(changeInfo: EventChangeArg) {
    const updatedEvent: CalendarEvent = {

      ...changeInfo.event.extendedProps,
      id:     changeInfo.event.id as string,
      title:  changeInfo.event.title,
      start:  changeInfo.event.startStr,
      end:    changeInfo.event.endStr,
      allDay:   changeInfo.event.allDay
    };

    this.eventService.updateEvent(updatedEvent.id!, updatedEvent).subscribe({
      next: () => {
        // Aquí podrías manejar la respuesta si es necesario
      },
      error: (e) => console.error(e)
    });
  }
}
