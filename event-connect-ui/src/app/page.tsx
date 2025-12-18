'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/lib/types';
import { api } from '@/lib/api';
import EventCard from '@/components/EventCard';
import FeaturedEvents from '@/components/FeaturedEvents';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [topEvents, setTopEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['All', 'Music', 'Sports', 'Comedy', 'Theatre', 'Entertainment'];

  useEffect(() => {
    fetchEvents();
    fetchTopEvents();
  }, []);

  const fetchEvents = async (category?: string) => {
    setIsLoading(true);
    try {
      let response;
      if (category && category !== 'All') {
        response = await api.getEventsByCategory(category);
      } else {
        response = await api.getEvents();
      }
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopEvents = async () => {
    try {
      const response = await api.getTopEvents();
      if (response.success && response.data) {
        setTopEvents(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch top events:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchEvents(selectedCategory);
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.searchEvents(searchQuery);
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    fetchEvents(category);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover Unforgettable
              <span className="block text-yellow-300">Experiences</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              From electrifying concerts to thrilling sports events, find and book tickets to the best experiences in your city.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search events, artists, venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 outline-none text-lg"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gray-900 hover:bg-gray-800 rounded-xl font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L60 45.7C120 41 240 33 360 35.3C480 38 600 51 720 55.8C840 61 960 56 1080 48.5C1200 41 1320 30 1380 24.7L1440 19V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Featured Events (Top 3) */}
      {topEvents.length > 0 && <FeaturedEvents events={topEvents} />}

      {/* All Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">All Events</h2>
            <p className="text-gray-600 mt-1">Browse our complete collection of upcoming events</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category || (category === 'All' && !selectedCategory)
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-900">No events found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
