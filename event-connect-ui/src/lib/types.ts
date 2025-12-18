// Type definitions for Event Connect

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  totalTickets: number;
  availableTickets: number;
  price: number;
  imageUrl: string;
  category: string;
}

export interface Booking {
  id: number;
  eventId: number;
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventTime: string;
  bookingDate: string;
  quantity: number;
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
  eventImageUrl: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  userId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface BookingRequest {
  eventId: number;
  quantity: number;
}
