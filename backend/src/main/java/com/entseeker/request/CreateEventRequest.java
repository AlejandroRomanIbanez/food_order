package com.entseeker.request;

import lombok.Data;

import java.util.Date;

@Data
public class CreateEventRequest {

    private String name;
    private String image;
    private String location;
    private Date startedAt;
    private Date endsAt;

}
