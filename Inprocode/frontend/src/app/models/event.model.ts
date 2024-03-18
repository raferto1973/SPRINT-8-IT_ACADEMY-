
// event.model.ts


export interface CalendarEvent {
  id?:    string;
  title:  string;
  start:  string; // ISO string 'YYYY-MM-DDTHH:mm:ss'
  end:    string; // ISO string 'YYYY-MM-DDTHH:mm:ss'
  allDay: boolean;
}

