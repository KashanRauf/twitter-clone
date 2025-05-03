package com.kashan.twitter_clone.dto;

import java.sql.Date;

import com.kashan.twitter_clone.entity.User.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String handle;
    private String displayName;
    private UserRole role;
    private Date creationDateTime;
    private Date birthDate;

    // For mapping DTO from user
    public UserDTO(User u) {
        this.id = u.getId();
        this.handle = u.getHandle();
        this.displayName = u.getDisplayName();
        this.role = u.getRole();
        this.creationDateTime = new Date(u.getCreationDateTime().getTime());
        this.birthDate = new Date(u.getBirthDate().getTime());
    }
}
