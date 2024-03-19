
// CalendarEvent.model.ts


export interface Calendar {
  event:{
    id?:    number;
    title:  string;
    start:  string;
    end:    string;
    color?: string;
  };
  delete?:  boolean;
}
