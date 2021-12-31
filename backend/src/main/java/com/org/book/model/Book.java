package com.org.book.model;


import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity


public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="book_id")
    private long id;

    @Column(name="title")
    @NotNull
    private String title;


    @Column(name="total_pages")
    @NotNull
    private int totalPages;

    @Column(name="published_date")
    @NotNull
    private Date publishedDate;

    @OneToMany
    @JoinColumn( name = "author_id")
    private List<Author> authors = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "category_book",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories = new ArrayList<>();

    public Book() {
    }

    public Book(String title, int totalPages, Date publishedDate, List<Author> authors, Photo photo, List<Category> categories) {
        this.title = title;
        this.totalPages = totalPages;
        this.publishedDate = publishedDate;
        this.authors = authors;
        this.photo = photo;
        this.categories = categories;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public Date getPublishedDate() {
        return publishedDate;
    }





    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public void setPublishedDate(Date publishedDate) {
        this.publishedDate = publishedDate;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
