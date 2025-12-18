'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface BookingFormProps {
  eventId: number;
  eventTitle: string;
  price: number;
  availableTickets: number;
  onSuccess: () => void;
}

export default function BookingForm({
  eventId,
  eventTitle,
  price,
  availableTickets,
  onSuccess,
}: BookingFormProps) {
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = price * quantity;

  const handleBooking = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { api } = await import('@/lib/api');
      const response = await api.createBooking({ eventId, quantity });

      if (response.success) {
        setSuccess(true);
        onSuccess();
      } else {
        setError(response.message || 'Booking failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-green-800">Booking Confirmed!</h3>
        <p className="text-green-600 mt-2">
          You&apos;ve booked {quantity} ticket(s) for {eventTitle}
        </p>
        <a
          href="/my-bookings"
          className="inline-block mt-4 text-green-700 font-medium hover:underline"
        >
          View My Bookings →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Book Tickets</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Tickets
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold transition-colors"
          >
            -
          </button>
          <span className="text-2xl font-bold text-gray-900 w-12 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(availableTickets, Math.min(10, quantity + 1)))}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Max 10 tickets per booking • {availableTickets.toLocaleString()} available
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{formatPrice(price)} × {quantity}</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-rose-600">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={handleBooking}
        disabled={isLoading || availableTickets === 0}
        className="w-full py-3 px-6 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : !isAuthenticated ? (
          'Login to Book'
        ) : availableTickets === 0 ? (
          'Sold Out'
        ) : (
          `Book Now • ${formatPrice(totalPrice)}`
        )}
      </button>

      {!isAuthenticated && (
        <p className="text-center text-sm text-gray-500 mt-3">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-rose-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      )}
    </div>
  );
}
