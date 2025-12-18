package com.eventconnect.repository;

import com.eventconnect.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByDateGreaterThanEqualOrderByDateAsc(LocalDate date);

    List<Event> findByCategoryIgnoreCase(String category);

    @Query("SELECT e FROM Event e WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(e.location) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Event> searchEvents(String search);

    @Query("SELECT e FROM Event e LEFT JOIN e.bookings b " +
           "GROUP BY e.id ORDER BY COUNT(b.id) DESC LIMIT 3")
    List<Event> findTop3MostBookedEvents();
}
