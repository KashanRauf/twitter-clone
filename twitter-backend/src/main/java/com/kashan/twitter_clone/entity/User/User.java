package com.kashan.twitter_clone.entity.User;

import java.sql.Date;

import com.kashan.twitter_clone.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = @UniqueConstraint(columnNames = "handle"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "handle", nullable = false, length = 16)
    private String handle;

    @Column(name = "display_name", nullable = true, length = 50)
    private String displayName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation", nullable = false)
    private Date creationDateTime;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "birth_date", nullable = true)
    private Date birthDate;

    // For mapping user from DTO
    public User(UserDTO u) {
        this.id = u.getId();
        this.handle = u.getHandle();
        this.displayName = u.getDisplayName();
        this.role = u.getRole();
        this.creationDateTime = new Date(u.getCreationDateTime().getTime());
        this.birthDate = new Date(u.getBirthDate().getTime());
    }
}
