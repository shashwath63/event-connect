package com.eventconnect.service;

import com.eventconnect.config.RateLimitConfig;
import com.eventconnect.dto.BookingRequest;
import com.eventconnect.dto.BookingResponse;
import com.eventconnect.entity.Booking;
import com.eventconnect.entity.BookingStatus;
import com.eventconnect.entity.Event;
import com.eventconnect.entity.User;
import com.eventconnect.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventService eventService;
    private final RateLimitConfig rateLimitConfig;

    @Transactional
    public BookingResponse createBooking(User user, BookingRequest request) {
        // Rate limiting check
        if (!rateLimitConfig.tryConsume(user.getId())) {
            throw new RuntimeException("Rate limit exceeded. Maximum 5 bookings per minute allowed.");
        }

        Event event = eventService.getEventEntityById(request.getEventId());

        // Check ticket availability
        if (event.getAvailableTickets() < request.getQuantity()) {
            throw new RuntimeException("Not enough tickets available. Only " +
                event.getAvailableTickets() + " tickets remaining.");
        }

        // Calculate total price
        BigDecimal totalPrice = event.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        // Create booking
        Booking booking = Booking.builder()
                .user(user)
                .event(event)
                .quantity(request.getQuantity())
                .totalPrice(totalPrice)
                .status(BookingStatus.CONFIRMED)
                .build();

        booking = bookingRepository.save(booking);

        // Update event availability
        eventService.updateEventAvailability(event, request.getQuantity());

        return BookingResponse.fromEntity(booking);
    }

    public List<BookingResponse> getUserBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByBookingDateDesc(userId).stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingResponse cancelBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Verify ownership
        if (!booking.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only cancel your own bookings");
        }

        // Check if already cancelled
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }

        // Cancel booking
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        // Restore event availability
        eventService.restoreEventAvailability(booking.getEvent(), booking.getQuantity());

        return BookingResponse.fromEntity(booking);
    }

    public BookingResponse getBookingById(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only view your own bookings");
        }

        return BookingResponse.fromEntity(booking);
    }
}
