package com.example.instaLite.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "portfolio")
public class Portfolio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String title;

	@NotBlank
	@Size(max = 20)
	private String description;
		
	@OneToMany(mappedBy="portfolio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<File> files = new HashSet<>();


	public Portfolio(@NotBlank @Size(max = 20) String title, @NotBlank @Size(max = 20) String description) {
		super();
		this.title = title;
		this.description = description;
	}


	public Portfolio() {
		super();
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<File> getFiles() {
		return files;
	}

	public void setFiles(Set<File> files) {
		this.files = files;
	}

}
