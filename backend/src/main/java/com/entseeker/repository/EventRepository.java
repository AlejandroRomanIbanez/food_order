package com.entseeker.repository;

import com.entseeker.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    public List<Event> getEventsByRestaurantId(Long restaurantId);
}
