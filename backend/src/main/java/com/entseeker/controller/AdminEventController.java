package com.entseeker.controller;

import com.entseeker.Service.EventService;
import com.entseeker.Service.UserService;
import com.entseeker.model.Event;
import com.entseeker.model.Restaurant;
import com.entseeker.model.User;
import com.entseeker.request.CreateEventRequest;
import com.entseeker.request.CreateRestaurantRequest;
import com.entseeker.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/events")
public class AdminEventController {

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Event>> getRestaurantEvents(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Event> events = eventService.getRestaurantsEvents(restaurantId);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping("/restaurant/{restaurantId}")
    public ResponseEntity<Event> createEvent(
            @RequestBody CreateEventRequest req,
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Event event = eventService.createEvent(req, restaurantId);
        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<MessageResponse> deleteEvent(@RequestHeader("Authorization") String jwt,
                                                       @PathVariable Long eventId ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        eventService.deleteEvent(eventId);

        MessageResponse res = new MessageResponse();
        res.setMessage("Event deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
