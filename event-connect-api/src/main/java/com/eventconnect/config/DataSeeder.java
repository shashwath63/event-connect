package com.eventconnect.config;

import com.eventconnect.entity.Event;
import com.eventconnect.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final EventRepository eventRepository;

    @Override
    public void run(String... args) {
        if (eventRepository.count() == 0) {
            List<Event> events = Arrays.asList(
                Event.builder()
                    .title("Coldplay: Music of the Spheres World Tour")
                    .description("Experience the magic of Coldplay live! Join Chris Martin and the band for an unforgettable night of music featuring hits from their latest album and all-time classics.")
                    .date(LocalDate.of(2025, 1, 15))
                    .time(LocalTime.of(19, 0))
                    .location("DY Patil Stadium, Mumbai")
                    .totalTickets(50000)
                    .availableTickets(45000)
                    .price(new BigDecimal("4999.00"))
                    .imageUrl("https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800")
                    .category("Music")
                    .build(),

                Event.builder()
                    .title("Arijit Singh Live in Concert")
                    .description("The voice of Bollywood, Arijit Singh, brings his soulful melodies to the stage. An evening of romantic songs and heartfelt performances.")
                    .date(LocalDate.of(2025, 1, 20))
                    .time(LocalTime.of(18, 30))
                    .location("NSCI Dome, Mumbai")
                    .totalTickets(10000)
                    .availableTickets(7500)
                    .price(new BigDecimal("2499.00"))
                    .imageUrl("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800")
                    .category("Music")
                    .build(),

                Event.builder()
                    .title("IPL 2025: Mumbai Indians vs Chennai Super Kings")
                    .description("The biggest rivalry in cricket! Watch Mumbai Indians take on Chennai Super Kings in this electrifying IPL match.")
                    .date(LocalDate.of(2025, 4, 10))
                    .time(LocalTime.of(19, 30))
                    .location("Wankhede Stadium, Mumbai")
                    .totalTickets(33000)
                    .availableTickets(28000)
                    .price(new BigDecimal("1500.00"))
                    .imageUrl("https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800")
                    .category("Sports")
                    .build(),

                Event.builder()
                    .title("Stand-up Comedy Night with Zakir Khan")
                    .description("Get ready to laugh your heart out with India's favorite comedian Zakir Khan and his hilarious take on everyday life.")
                    .date(LocalDate.of(2025, 2, 5))
                    .time(LocalTime.of(20, 0))
                    .location("Phoenix Marketcity, Bangalore")
                    .totalTickets(1500)
                    .availableTickets(800)
                    .price(new BigDecimal("999.00"))
                    .imageUrl("https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800")
                    .category("Comedy")
                    .build(),

                Event.builder()
                    .title("Sunburn Festival 2025")
                    .description("Asia's biggest electronic dance music festival returns! Three days of non-stop EDM featuring international DJs.")
                    .date(LocalDate.of(2025, 12, 28))
                    .time(LocalTime.of(14, 0))
                    .location("Vagator Beach, Goa")
                    .totalTickets(100000)
                    .availableTickets(75000)
                    .price(new BigDecimal("5999.00"))
                    .imageUrl("https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800")
                    .category("Music")
                    .build(),

                Event.builder()
                    .title("Hamlet - Theatre Play")
                    .description("A modern adaptation of Shakespeare's timeless tragedy. Experience the drama, intrigue, and emotion of this classic masterpiece.")
                    .date(LocalDate.of(2025, 3, 15))
                    .time(LocalTime.of(17, 0))
                    .location("Prithvi Theatre, Mumbai")
                    .totalTickets(200)
                    .availableTickets(150)
                    .price(new BigDecimal("750.00"))
                    .imageUrl("https://images.unsplash.com/photo-1503095396549-807759245b35?w=800")
                    .category("Theatre")
                    .build(),

                Event.builder()
                    .title("Comic Con India 2025")
                    .description("The ultimate pop culture extravaganza! Meet your favorite stars, discover exclusive merchandise, and immerse yourself in the world of comics and entertainment.")
                    .date(LocalDate.of(2025, 12, 12))
                    .time(LocalTime.of(10, 0))
                    .location("IEML, Greater Noida")
                    .totalTickets(50000)
                    .availableTickets(35000)
                    .price(new BigDecimal("1299.00"))
                    .imageUrl("https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=800")
                    .category("Entertainment")
                    .build(),

                Event.builder()
                    .title("AR Rahman: Unplugged")
                    .description("Oscar-winning composer AR Rahman performs his greatest hits in an intimate unplugged setting. A musical journey through decades of masterpieces.")
                    .date(LocalDate.of(2025, 2, 14))
                    .time(LocalTime.of(19, 0))
                    .location("Nehru Stadium, Chennai")
                    .totalTickets(25000)
                    .availableTickets(18000)
                    .price(new BigDecimal("3499.00"))
                    .imageUrl("https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800")
                    .category("Music")
                    .build()
            );

            eventRepository.saveAll(events);
            System.out.println("Sample events have been seeded to the database!");
        }
    }
}
