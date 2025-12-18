import Link from 'next/link';
import { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Music: 'bg-purple-500',
      Sports: 'bg-green-500',
      Comedy: 'bg-yellow-500',
      Theatre: 'bg-blue-500',
      Entertainment: 'bg-pink-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <Link href={`/events/${event.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.imageUrl || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800'}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Category Badge */}
          <div className={`absolute top-3 left-3 ${getCategoryColor(event.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {event.category}
          </div>
          {/* Availability Badge */}
          {event.availableTickets < 50 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
              Almost Sold Out!
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Price */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 font-bold px-3 py-1 rounded-lg shadow">
            {formatPrice(event.price)}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
            {event.title}
          </h3>

          <div className="mt-3 space-y-2">
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(event.date)} • {event.time}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* Tickets Available */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {event.availableTickets.toLocaleString()} tickets left
            </span>
            <span className="text-rose-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
              Book Now
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
