package com.example.instaLite.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instaLite.models.File;
import com.example.instaLite.models.Like;
import com.example.instaLite.models.User;



public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndFile(User user,File file);
}
