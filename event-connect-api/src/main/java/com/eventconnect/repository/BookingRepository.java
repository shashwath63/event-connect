package com.eventconnect.repository;

import com.eventconnect.entity.Booking;
import com.eventconnect.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserIdOrderByBookingDateDesc(Long userId);

    List<Booking> findByUserIdAndStatus(Long userId, BookingStatus status);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.user.id = :userId " +
           "AND b.bookingDate > :since")
    long countRecentBookingsByUser(@Param("userId") Long userId,
                                   @Param("since") LocalDateTime since);

    boolean existsByUserIdAndEventIdAndStatus(Long userId, Long eventId, BookingStatus status);
}
