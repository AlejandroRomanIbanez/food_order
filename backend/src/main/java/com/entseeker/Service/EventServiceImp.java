package com.entseeker.Service;

import com.entseeker.model.Event;
import com.entseeker.model.Restaurant;
import com.entseeker.repository.EventRepository;
import com.entseeker.request.CreateEventRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImp implements EventService {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Event createEvent(CreateEventRequest req, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        Event event = new Event();
        event.setRestaurant(restaurant);
        event.setName(req.getName());
        event.setImage(req.getImage());
        event.setLocation(req.getLocation());
        event.setStartedAt(req.getStartedAt());
        event.setEndsAt(req.getEndsAt());

        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public void deleteEvent(Long eventId) throws Exception {
        Event event = findEventById(eventId);

        eventRepository.delete(event);
    }

    public Event findEventById(Long eventId) throws Exception {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if(optionalEvent.isEmpty()){
            throw new Exception("Restaurant not found for user id: " + eventId);
        }
        return optionalEvent.get();
    }

    @Override
    public List<Event> getRestaurantsEvents(Long restaurantId) {
        return eventRepository.getEventsByRestaurantId(restaurantId);
    }
}
