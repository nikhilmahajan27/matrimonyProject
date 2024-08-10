package com.vivah.app.service;


import com.vivah.app.dtos.RegistrationDto;
import com.vivah.app.model.MatrimonyProfile;
import com.vivah.app.model.User;
import com.vivah.app.repo.MatrimonyProfileRepository;
import com.vivah.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MatrimonyProfileRepository profileRepository;

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username).get(0);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        throw new RuntimeException("Invalid credentials");
    }

    public void registerUser(RegistrationDto registrationDto) {
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setPassword(registrationDto.getPassword());
        userRepository.save(user);

        MatrimonyProfile profile = new MatrimonyProfile();
        profile.setFirstName(registrationDto.getFirstName());
        profile.setLastName(registrationDto.getLastName());
        profile.setGender(registrationDto.getGender());
        profile.setDateOfBirth(registrationDto.getDateOfBirth());
        profile.setMaritalStatus(registrationDto.getMaritalStatus());
        profile.setAddress(registrationDto.getAddress());
        profile.setReligion(registrationDto.getReligion());
        profile.setEmail(registrationDto.getEmail());
        profile.setMobileNumber(registrationDto.getMobileNumber());
        profile.setEducation(registrationDto.getEducation());
        profile.setOccupation(registrationDto.getOccupation());
        profile.setIncome(registrationDto.getIncome());
        profile.setAboutMe(registrationDto.getAboutMe());
        profile.setUser(user);
        user.setProfile(profile);
        User userSaved = userRepository.findByUsername(registrationDto.getUsername()).get(0);
        profile.setUserId(userSaved.getId());
        profileRepository.save(profile);

//        profileRepository.save(profile);
    }
}
