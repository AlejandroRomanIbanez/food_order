package com.entseeker.controller;

import com.entseeker.Service.EventService;
import com.entseeker.Service.UserService;
import com.entseeker.model.Event;
import com.entseeker.model.Restaurant;
import com.entseeker.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @GetMapping()
    public ResponseEntity<List<Event>> getAllEvents(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Event> events = eventService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

}
