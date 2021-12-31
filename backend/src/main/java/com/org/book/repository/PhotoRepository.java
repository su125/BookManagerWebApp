package com.org.book.repository;

import com.org.book.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    void deletePhotoById(Long id);

    Optional<Photo> findPhotoById(Long id);
}
