package com.eventconnect.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitConfig {

    private final Map<Long, Bucket> buckets = new ConcurrentHashMap<>();

    public Bucket resolveBucket(Long userId) {
        return buckets.computeIfAbsent(userId, this::createNewBucket);
    }

    private Bucket createNewBucket(Long userId) {
        // 5 bookings per minute per user
        Bandwidth limit = Bandwidth.builder()
                .capacity(5)
                .refillGreedy(5, Duration.ofMinutes(1))
                .build();
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }

    public boolean tryConsume(Long userId) {
        Bucket bucket = resolveBucket(userId);
        return bucket.tryConsume(1);
    }
}
