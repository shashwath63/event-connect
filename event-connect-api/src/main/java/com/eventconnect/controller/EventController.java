package com.eventconnect.controller;

import com.eventconnect.dto.ApiResponse;
import com.eventconnect.dto.EventResponse;
import com.eventconnect.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<EventResponse>>> getAllEvents() {
        List<EventResponse> events = eventService.getAllEvents();
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getUpcomingEvents() {
        List<EventResponse> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getTop3MostBooked() {
        List<EventResponse> events = eventService.getTop3MostBookedEvents();
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventResponse>> getEventById(@PathVariable Long id) {
        try {
            EventResponse event = eventService.getEventById(id);
            return ResponseEntity.ok(ApiResponse.success(event));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<EventResponse>>> searchEvents(@RequestParam String query) {
        List<EventResponse> events = eventService.searchEvents(query);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getEventsByCategory(@PathVariable String category) {
        List<EventResponse> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(events));
    }
}
