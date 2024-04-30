package com.entseeker.controller;

import com.entseeker.Service.UserService;
import com.entseeker.model.Address;
import com.entseeker.model.User;
import com.entseeker.request.UserAddressRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @PostMapping("/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody UserAddressRequest userAddressRequest,
                                              @RequestHeader("Authorization") String jwt) throws Exception {
        Address newAddress = userService.addAddress(userAddressRequest, jwt);
        return new ResponseEntity<>(newAddress, HttpStatus.OK);
    }
}
