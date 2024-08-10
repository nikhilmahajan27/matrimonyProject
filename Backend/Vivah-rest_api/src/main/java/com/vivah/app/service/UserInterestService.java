package com.vivah.app.service;

import com.vivah.app.model.MatrimonyProfile;
import com.vivah.app.model.UserInterests;
import com.vivah.app.repo.MatrimonyProfileRepository;
import com.vivah.app.repo.UserInterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserInterestService {

    @Autowired
    private UserInterestRepository userInterestRepository;

    @Autowired
    private MatrimonyProfileRepository matrimonyProfileRepository;

    @Transactional
    public void removeInterest(Long userId, Long interestedInUserId) {
        if (userInterestRepository.existsByUserIdAndInterestedInUserId(userId, interestedInUserId)) {
            userInterestRepository.deleteByUserIdAndInterestedInUserId(userId, interestedInUserId);
        } else {
            throw new IllegalArgumentException("Interest record not found.");
        }
    }

    public List<MatrimonyProfile> getInterestedProfiles(Long profileId) {
        // Assuming there's a method in your repository to find profiles interested in a given profileId
        List<UserInterests> userInterests = userInterestRepository.findByInterestedInUserId(profileId);
        List<MatrimonyProfile> profiles = new ArrayList<MatrimonyProfile>();

        for(UserInterests user: userInterests){
            MatrimonyProfile prof = matrimonyProfileRepository.findByUserId(user.getUserId());
            profiles.add(prof);
        }
        return profiles;
    }

    @Transactional
    public List<UserInterests> getInterestsByUserId(Long userId) {
        return userInterestRepository.findByUserId(userId);
    }
}
