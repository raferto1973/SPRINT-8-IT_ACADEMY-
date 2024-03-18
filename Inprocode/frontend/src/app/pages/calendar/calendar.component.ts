
// calendar.component.ts

import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ FullCalendarModule, ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
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
    events: [ // Eventos
    ],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.handleEventChange.bind(this), // Este es para eventos existentes que se arrastran a una nueva fecha/hora
  };

  handleDateSelect(selectInfo) {
    const title = prompt('Ingrese el nombre del evento:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Limpiar selección de calendario

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });

      // Aquí deberías también hacer una llamada a tu servicio para añadir el evento en la base de datos
    }
  }

  handleEventClick(clickInfo) {
    const eventName = prompt('Editar el nombre del evento:', clickInfo.event.title);

    if (eventName) {
      clickInfo.event.setProp('title', eventName);
      // Actualizar el evento en la base de datos
    }
  }

  handleEventClick(clickInfo) {
    if (confirm(`¿Estás seguro de que quieres eliminar el evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      // Eliminar el evento de la base de datos
    }
  }



}
