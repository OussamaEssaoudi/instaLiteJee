package com.example.instaLite.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "likes")
public class Like {

	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	  @OneToOne
	 private User user;
	 
	 @OneToOne
	 private File file;

	public Like() {
		super();
	}

	public Like(Long id, User user, File file) {
		super();
		this.id = id;
		this.user = user;
		this.file = file;
	}

	public Like(User user, File file) {
		super();
		this.user = user;
		this.file = file;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}	 
}
