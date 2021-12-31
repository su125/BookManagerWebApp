package com.org.book.controller;

import com.org.book.model.Book;
import com.org.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    // get all books
    @GetMapping("/books")
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    // create book rest api
    @PostMapping("/books")
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    // get book by id rest api
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new com.org.book.exception.NotFoundException("Book not exist with id :" + id));
        return ResponseEntity.ok(book);
    }

    // update book rest api

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails){
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new com.org.book.exception.NotFoundException("Book not exist with id :" + id));
        book.setTitle(bookDetails.getTitle());
        book.setTotalPages(bookDetails.getTotalPages());
        book.setPublishedDate(bookDetails.getPublishedDate());


        Book updatedBook = bookRepository.save(book);
        return ResponseEntity.ok(updatedBook);
    }

    // delete book rest api
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new com.org.book.exception.NotFoundException("Book not exist with id :" + id));

        bookRepository.delete(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }



}
