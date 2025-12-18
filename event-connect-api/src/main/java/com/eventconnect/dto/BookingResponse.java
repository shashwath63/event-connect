package com.eventconnect.dto;

import com.eventconnect.entity.Booking;
import com.eventconnect.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private Long eventId;
    private String eventTitle;
    private String eventLocation;
    private String eventDate;
    private String eventTime;
    private LocalDateTime bookingDate;
    private Integer quantity;
    private BigDecimal totalPrice;
    private BookingStatus status;
    private String eventImageUrl;

    public static BookingResponse fromEntity(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .eventId(booking.getEvent().getId())
                .eventTitle(booking.getEvent().getTitle())
                .eventLocation(booking.getEvent().getLocation())
                .eventDate(booking.getEvent().getDate().toString())
                .eventTime(booking.getEvent().getTime().toString())
                .bookingDate(booking.getBookingDate())
                .quantity(booking.getQuantity())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .eventImageUrl(booking.getEvent().getImageUrl())
                .build();
    }
}
