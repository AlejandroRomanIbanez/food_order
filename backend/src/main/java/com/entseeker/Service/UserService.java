package com.entseeker.Service;

import com.entseeker.model.Address;
import com.entseeker.model.User;
import com.entseeker.request.UserAddressRequest;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;

    public Address addAddress(UserAddressRequest userAddressRequest, String jwt) throws Exception;

    public void deleteAddress(Long addressId, String jwt) throws Exception;
}
