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
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-secondary/20 text-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Discover Unforgettable
              <span className="block text-primary drop-shadow-[0_0_10px_rgba(185,28,28,0.8)] animate-pulse">Experiences</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
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
                    className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg backdrop-blur-sm transition-all"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(185,28,28,0.4)] hover:shadow-[0_0_25px_rgba(185,28,28,0.6)]"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Events (Top 3) */}
      {topEvents.length > 0 && <FeaturedEvents events={topEvents} />}

      {/* All Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b border-border pb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center">
              <span className="w-2 h-8 bg-primary mr-3 rounded-sm shadow-[0_0_10px_rgba(185,28,28,0.8)]"></span>
              All Events
            </h2>
            <p className="text-muted-foreground mt-1 ml-5">Browse our complete collection of upcoming events</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedCategory === category || (category === 'All' && !selectedCategory)
                    ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(185,28,28,0.5)]'
                    : 'bg-muted/30 text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-primary/50'
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
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md animate-pulse border border-border">
                <div className="h-48 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-3xl bg-muted/10">
            <div className="text-6xl mb-4 opacity-50">🎭</div>
            <h3 className="text-xl font-semibold text-foreground">No events found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
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

