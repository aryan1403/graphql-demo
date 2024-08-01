package com.example.dgsdemo.Models;

import lombok.AllArgsConstructor;
import lombok.Data;

class reviews {
    int rating;
    String msg;
}

@AllArgsConstructor
@Data
public class User {
    String name;
    String email;
    int age;
    String gender;
    reviews review;
}
