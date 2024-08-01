package com.example.dgsdemo;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dgsdemo.Models.User;
import com.netflix.graphql.dgs.DgsQueryExecutor;
import com.netflix.graphql.dgs.autoconfig.DgsAutoConfiguration;

@SpringBootTest(classes = {DgsAutoConfiguration.class, userUtils.class})
public class userTest {
    @Autowired
    DgsQueryExecutor qExecutor;

    @Test
    void getAllUsers() {
        List<String> users = qExecutor
            .executeAndExtractJsonPath("{ getAllUsers { name }}",
            "data.getAllUsers[*].name");

        users.forEach(System.out::println);
        assertTrue(users.contains("Aaryan"));
    }

    /* @Test
    void getUser() {
        String name = qExecutor
            .executeAndExtractJsonPath("{ getUser {name} }",
             "data.getUser.name");
            
        System.out.println(name);
        assertNotNull(name);
    } */
}
