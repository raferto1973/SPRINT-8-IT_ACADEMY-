
// calendar.component.ts

import { Component, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EditEventDialogComponent } from './calendar-dialog/calendar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar.service';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import caLocale from '@fullcalendar/core/locales/ca'; // Locale Catalán



// Asegúrat de que la ruta sigui correcta
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

// Component del calendari
export class CalendarComponent implements AfterViewInit {
  calendarOptions: any;

  constructor(
    private calendarService: CalendarService,
    private elRef: ElementRef,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
  ) {

    // Opcions del calendari
    this.calendarOptions = {
      themeSystem: 'bootstrap5',
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale: caLocale,
      defaultAllDay: true,
      events: [],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      displayEventTime: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridDay,dayGridWeek,dayGridMonth,listMonth',
      },
    };
  }

  // Mètode per gestionar l'event de canvi de mida
  handleEventResize(resizeInfo: any) {
    throw new Error('Method not implemented.');
  }

  // Mètode per carregar els events després de que la vista s'hagi inicialitzat
  ngAfterViewInit() {
    this.loadEvents();
  }

  // Mètode per carregar els events
  loadEvents(): void {
    this.calendarService.getEvents().subscribe((events) => {
      this.calendarOptions.events = events;
      console.log(events);
      this.cdr.detectChanges(); // Solicita a Angular que verifique cambios
    });
  }



  // Mètode per obrir el formulari de diàleg per afegir un nou event
  handleDateClick(arg: any): void {
    // Preparar un evento vacío con la fecha seleccionada
    const newEvent = {
      title: '',
      start: arg.dateStr,
      end: arg.dateStr,
    };

    this.openDialog(newEvent);
  }

  // Mètode per obrir el formulari de diàleg per editar un event
  handleEventClick(clickInfo: any): void {
    // Extraer la información del evento para editar
    const eventToEdit = {
      id: clickInfo.event.id || clickInfo.event.extendedProps.publicId,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr
        ? clickInfo.event.endStr
        : clickInfo.event.startStr,
    };

    // Obrir el diàleg amb la informació de l'event
    this.openDialog(eventToEdit, true);
  }

  // Mètode per convertir la data de format ISO a format MySQL
  convertirFechaISOaMySQL(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const hora = fecha.toISOString().split('T')[1].substring(0, 5) + ':00';
    return `${fechaFormateada} ${hora}`;
  }


  // Mètode per obrir el diàleg
  openDialog(eventData: any, isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(EditEventDialogComponent, {
      width: '300px',
      data: { event: eventData },
    });

    // Subscriure's al resultat del diàleg
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        // Assegurat de que la data estigui en format MySQL
      const eventoAEnviar = {
        ...result.event,
        start: this.convertirFechaISOaMySQL(result.event.start),
        end: this.convertirFechaISOaMySQL(result.event.end),
      };

        console.log(eventoAEnviar);

        // Comprovar si s'ha d'eliminar, editar o afegir un event
        if (result.event.delete && isEdit) {
          // Eliminar evento
          this.calendarService.deleteEvent(result.event.id.toString()).subscribe(() => this.loadEvents());
        } else if (isEdit) {
          // Actualizar evento
          this.calendarService.updateEvent(result.event.id.toString(), eventoAEnviar).subscribe(() => this.loadEvents());
        } else {
          // Crear evento
          this.calendarService.addEvent(eventoAEnviar).subscribe(() => this.loadEvents());
        }
      }
    });
  }




}
