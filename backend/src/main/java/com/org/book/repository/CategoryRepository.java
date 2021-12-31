package com.org.book.repository;

import com.org.book.model.Book;
import com.org.book.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    void deleteCategoryById(Long id);

    Optional<Category> findCategoryById(Long id);
}
