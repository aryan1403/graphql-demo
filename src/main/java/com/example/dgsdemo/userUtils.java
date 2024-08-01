package com.example.dgsdemo;

import java.util.List;
import java.util.Optional;

import com.example.dgsdemo.Models.User;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;

@DgsComponent
public class userUtils {
    private final List<User> users = List.of(
        new User("Aaryan", "aryan@gmail.com", 34, "male", null),
        new User("Arush", "aryan@gmail.com", 34, "male", null),
        new User("Rohan", "aryan@gmail.com", 34, "male", null),
        new User("Kartik", "aryan@gmail.com", 34, "male", null)
    );

    @DgsQuery
    public User getUser(String name) {
        Optional<User> ouser = users.stream()
            .filter(user -> user.getName().equals(name))
            .findFirst();
        
        return ouser.isPresent() ? ouser.get() : null;
    }

    @DgsQuery
    public List<User> getAllUsers() {
        return users;
    }
}