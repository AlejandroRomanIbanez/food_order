package com.entseeker.Service;

import com.entseeker.model.Event;
import com.entseeker.model.User;
import com.entseeker.request.CreateEventRequest;

public interface EventService {

    public Event createEvent(CreateEventRequest req, String jwt, Long restaurantId);
}
