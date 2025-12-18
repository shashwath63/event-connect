'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Booking } from '@/lib/types';
import { api } from '@/lib/api';
import BookingCard from '@/components/BookingCard';

export default function MyBookingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await api.getMyBookings();
      if (response.success && response.data) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    setCancellingId(bookingId);
    try {
      const response = await api.cancelBooking(bookingId);
      if (response.success) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    } finally {
      setCancellingId(null);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'confirmed') return booking.status === 'CONFIRMED';
    if (filter === 'cancelled') return booking.status === 'CANCELLED';
    return true;
  });

  const confirmedCount = bookings.filter(b => b.status === 'CONFIRMED').length;
  const cancelledCount = bookings.filter(b => b.status === 'CANCELLED').length;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-white/80">Manage and track all your event bookings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
            <p className="text-sm text-gray-600">Confirmed</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
            <p className="text-sm text-gray-600">Cancelled</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          {(['all', 'confirmed', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && ` (${bookings.length})`}
              {f === 'confirmed' && ` (${confirmedCount})`}
              {f === 'cancelled' && ` (${cancelledCount})`}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-32 h-24 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You haven't booked any events yet. Start exploring!"
                : `You don't have any ${filter} bookings.`}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancel}
                isCancelling={cancellingId === booking.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
