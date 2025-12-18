'use client';

import { Booking } from '@/lib/types';

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: number) => void;
  isCancelling: boolean;
}

export default function BookingCard({ booking, onCancel, isCancelling }: BookingCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden border-2 ${
      booking.status === 'CANCELLED' ? 'border-red-200 opacity-70' : 'border-transparent'
    }`}>
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-48 h-40 md:h-auto relative overflow-hidden">
          <img
            src={booking.eventImageUrl || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400'}
            alt={booking.eventTitle}
            className="w-full h-full object-cover"
          />
          {booking.status === 'CANCELLED' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg transform -rotate-12">
                CANCELLED
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{booking.eventTitle}</h3>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-rose-600">{formatPrice(booking.totalPrice)}</p>
              <p className="text-sm text-gray-500">{booking.quantity} ticket(s)</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(booking.eventDate)} • {booking.eventTime}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {booking.eventLocation}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <p className="text-xs text-gray-400">
              Booked on {new Date(booking.bookingDate).toLocaleDateString('en-IN')}
            </p>
            {booking.status === 'CONFIRMED' && (
              <button
                onClick={() => onCancel(booking.id)}
                disabled={isCancelling}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-300 rounded-lg transition-all disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
