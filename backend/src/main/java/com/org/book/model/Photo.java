package com.org.book.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity

public class Photo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="photo_id")
    private Long id;

    private String link;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "photo")
    private Book book;

    public Photo() {
    }

    public Photo(String link) {
        this.link = link;
    }

    public Long getId() {
        return id;
    }

    public String getLink() {
        return link;
    }

    public Book getBook() {
        return book;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
