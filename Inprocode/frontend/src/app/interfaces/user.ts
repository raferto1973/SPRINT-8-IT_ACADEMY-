

// user.ts


export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface User {
  id_user:  number;
  email:    string;
  name:     string;
  surname:  string;
  password: string;
  // role:  string;
  // phone: number;
  // address: string;
  // date_of_birth: null;
  // photo: string;
  // registration_date: string;
  // last_update: string;
  // deletedAt: null;
}


