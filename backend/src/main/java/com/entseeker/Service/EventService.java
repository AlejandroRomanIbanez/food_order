package com.entseeker.Service;

import com.entseeker.model.Event;
import com.entseeker.model.User;
import com.entseeker.request.CreateEventRequest;

import java.util.List;

public interface EventService {

    public Event createEvent(CreateEventRequest req, Long restaurantId) throws Exception;

    public List<Event> getAllEvents();

    public void deleteEvent(Long eventId) throws Exception;

    public List<Event> getRestaurantsEvents(Long restaurantId) throws Exception;
}
