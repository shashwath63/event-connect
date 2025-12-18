package com.eventconnect.dto;

import com.eventconnect.entity.Event;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private Integer totalTickets;
    private Integer availableTickets;
    private BigDecimal price;
    private String imageUrl;
    private String category;

    public static EventResponse fromEntity(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .date(event.getDate())
                .time(event.getTime())
                .location(event.getLocation())
                .totalTickets(event.getTotalTickets())
                .availableTickets(event.getAvailableTickets())
                .price(event.getPrice())
                .imageUrl(event.getImageUrl())
                .category(event.getCategory())
                .build();
    }
}
