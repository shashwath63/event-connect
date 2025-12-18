package com.eventconnect.service;

import com.eventconnect.dto.EventResponse;
import com.eventconnect.entity.Event;
import com.eventconnect.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(EventResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<EventResponse> getUpcomingEvents() {
        return eventRepository.findByDateGreaterThanEqualOrderByDateAsc(LocalDate.now()).stream()
                .map(EventResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return EventResponse.fromEntity(event);
    }

    public List<EventResponse> getTop3MostBookedEvents() {
        return eventRepository.findTop3MostBookedEvents().stream()
                .map(EventResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<EventResponse> searchEvents(String query) {
        return eventRepository.searchEvents(query).stream()
                .map(EventResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<EventResponse> getEventsByCategory(String category) {
        return eventRepository.findByCategoryIgnoreCase(category).stream()
                .map(EventResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Event getEventEntityById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public void updateEventAvailability(Event event, int quantityBooked) {
        event.setAvailableTickets(event.getAvailableTickets() - quantityBooked);
        eventRepository.save(event);
    }

    public void restoreEventAvailability(Event event, int quantityRestored) {
        event.setAvailableTickets(event.getAvailableTickets() + quantityRestored);
        eventRepository.save(event);
    }
}
