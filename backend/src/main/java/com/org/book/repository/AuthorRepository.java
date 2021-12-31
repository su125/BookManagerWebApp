package com.org.book.repository;

import com.org.book.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    void deleteAuthorById(Long id);

    Optional<Author> findAuthorById(Long id);
}
