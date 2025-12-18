import { ApiResponse, AuthResponse, Booking, BookingRequest, Event, LoginRequest, SignupRequest } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

class ApiClient {
    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = this.getToken();

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: 'Network error. Please try again.',
            };
        }
    }

    // Auth endpoints
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Event endpoints
    async getEvents(): Promise<ApiResponse<Event[]>> {
        return this.request<Event[]>('/api/events');
    }

    async getTopEvents(): Promise<ApiResponse<Event[]>> {
        return this.request<Event[]>('/api/events/top');
    }

    async getEvent(id: number): Promise<ApiResponse<Event>> {
        return this.request<Event>(`/api/events/${id}`);
    }

    async searchEvents(query: string): Promise<ApiResponse<Event[]>> {
        return this.request<Event[]>(`/api/events/search?query=${encodeURIComponent(query)}`);
    }

    async getEventsByCategory(category: string): Promise<ApiResponse<Event[]>> {
        return this.request<Event[]>(`/api/events/category/${encodeURIComponent(category)}`);
    }

    // Booking endpoints
    async createBooking(booking: BookingRequest): Promise<ApiResponse<Booking>> {
        return this.request<Booking>('/api/bookings', {
            method: 'POST',
            body: JSON.stringify(booking),
        });
    }

    async getMyBookings(): Promise<ApiResponse<Booking[]>> {
        return this.request<Booking[]>('/api/bookings/me');
    }

    async cancelBooking(id: number): Promise<ApiResponse<Booking>> {
        return this.request<Booking>(`/api/bookings/${id}`, {
            method: 'DELETE',
        });
    }
}

export const api = new ApiClient();
