export interface Connection {
  id: string;
  name: string;
  createdAt?: any;
}

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  createdAt?: any;
}

export interface Message {
  id?: string;
  userId: string;
  content: string;
  contacts: string[];
  scheduleAt?: any;
  status: 'agendada' | 'enviada';
  createdAt?: any;
  connectionId: string;
}
