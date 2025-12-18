package com.eventconnect.controller;

import com.eventconnect.dto.ApiResponse;
import com.eventconnect.dto.BookingRequest;
import com.eventconnect.dto.BookingResponse;
import com.eventconnect.entity.User;
import com.eventconnect.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody BookingRequest request) {
        try {
            BookingResponse response = bookingService.createBooking(user, request);
            return ResponseEntity.ok(ApiResponse.success("Booking confirmed successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings(
            @AuthenticationPrincipal User user) {
        List<BookingResponse> bookings = bookingService.getUserBookings(user.getId());
        return ResponseEntity.ok(ApiResponse.success(bookings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        try {
            BookingResponse booking = bookingService.getBookingById(id, user.getId());
            return ResponseEntity.ok(ApiResponse.success(booking));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> cancelBooking(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        try {
            BookingResponse response = bookingService.cancelBooking(id, user.getId());
            return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
