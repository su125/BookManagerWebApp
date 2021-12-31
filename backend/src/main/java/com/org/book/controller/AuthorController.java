package com.org.book.controller;

import com.org.book.model.Author;
import com.org.book.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;

    // get all authors
    @GetMapping("/authors")
    public List<Author> getAllAuthors(){
        return authorRepository.findAll();
    }

    // create author rest api
    @PostMapping("/authors")
    public Author createAuthor(@RequestBody Author author) {
        return authorRepository.save(author);
    }

    // get author by id rest api
    @GetMapping("/authors/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new com.org.book.exception.NotFoundException("Author not exist with id :" + id));
        return ResponseEntity.ok(author);
    }

    // update author rest api

    @PutMapping("/authors/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @RequestBody Author authorDetails){
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new com.org.book.exception.NotFoundException("Author not exist with id :" + id));

        author.setFirstName(authorDetails.getFirstName());
        author.setLastName(authorDetails.getLastName());
        author.setBirthDate(authorDetails.getBirthDate());

        Author updatedAuthor = authorRepository.save(author);
        return ResponseEntity.ok(updatedAuthor);
    }

    // delete author rest api
    @DeleteMapping("/authors/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAuthor(@PathVariable Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new com.org.book.exception.NotFoundException("Author not exist with id :" + id));

        authorRepository.delete(author);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }



}
