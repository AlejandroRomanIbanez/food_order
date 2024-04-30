package com.entseeker.Service;

import com.entseeker.config.JwtProvider;
import com.entseeker.model.Address;
import com.entseeker.model.User;
import com.entseeker.repository.AddressRepository;
import com.entseeker.repository.UserRepository;
import com.entseeker.request.UserAddressRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private AddressRepository addressRespository;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new Exception("User not found");
        }

        return user;
    }

    @Override
    public Address addAddress(UserAddressRequest userAddressRequest, String jwt) throws Exception {
        User user = findUserByJwtToken(jwt);

        Address address = new Address();
        address.setStreetAddress(userAddressRequest.getStreetAddress());
        address.setCity(userAddressRequest.getCity());
        address.setState(userAddressRequest.getState());
        address.setCountry(userAddressRequest.getCountry());
        address.setPincode(userAddressRequest.getPincode());

        address = addressRespository.save(address);

        user.getAddresses().add(address);
        userRepository.save(user);

        return address;
    }

    @Override
    public void deleteAddress(Long addressId, String jwt) throws Exception {
        User user = findUserByJwtToken(jwt);

        Optional<Address> optionalAddress = addressRespository.findById(addressId);
        if(optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            user.getAddresses().remove(address);
            userRepository.save(user);
        } else {
            throw new Exception("Address not found");
        }
    }
}
