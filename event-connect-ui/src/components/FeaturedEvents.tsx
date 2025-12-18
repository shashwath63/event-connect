'use client';

import { Event } from '@/lib/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface FeaturedEventsProps {
  events: Event[];
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-rose-900 to-pink-900 opacity-95" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text text-sm font-bold tracking-wider uppercase">
            🔥 Trending Now
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">
            Top 3 Most Booked Events
          </h2>
        </div>

        {/* Featured Carousel */}
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                index === activeIndex ? 'md:scale-105 z-10' : 'md:scale-100'
              }`}
            >
              {/* Card */}
              <div className="relative h-80 overflow-hidden bg-gray-900 rounded-2xl">
                <img
                  src={event.imageUrl || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800'}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />

                {/* Rank Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                    'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                  }`}>
                    #{index + 1}
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-rose-300 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-white/80 text-sm">
                      {event.location}
                    </p>
                    <span className="bg-rose-500 text-white font-bold px-3 py-1 rounded-lg text-sm">
                      {formatPrice(event.price)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center space-x-2 mt-8 md:hidden">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
