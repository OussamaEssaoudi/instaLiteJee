package com.example.instaLite.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Builder;

@Builder
@Entity
@Table(name = "files")
@JsonIgnoreProperties(value = { "image" })
public class File {

	@Id
	private Long id;

	@Size(max = 20)
	private String title;

	@Size(max = 20)
	private String description;

	@Size(max = 20)
	private String type;

	@Size(max = 20)
	private String path;

	@JsonIgnore
	
	@Lob
	@Column(name = "image", unique = false, nullable = false, length = 100000)
	private byte[] image;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "portfolio_id", nullable = false)
	private Portfolio portfolio;

	private Integer numLike;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private EAccess access;

	public File(Long id, @NotBlank @Size(max = 20) String title, @NotBlank @Size(max = 20) String description,
			@NotBlank @Size(max = 20) String type, @NotBlank @Size(max = 20) String path, @NotBlank byte[] image,
			Portfolio portfolio, EAccess access) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.type = type;
		this.path = path;
		this.image = image;
		this.portfolio = portfolio;
		this.access = access;
		this.numLike = 0;
	}

	public File(Long id, @NotBlank @Size(max = 20) String title, @NotBlank @Size(max = 20) String description,
			@NotBlank @Size(max = 20) String type, @NotBlank @Size(max = 20) String path, @NotBlank byte[] image,
			Portfolio portfolio, Integer numLike, EAccess access) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.type = type;
		this.path = path;
		this.image = image;
		this.portfolio = portfolio;
		this.numLike = numLike;
	}

	public File() {
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Portfolio getPortfolio() {
		return portfolio;
	}

	public void setPortfolio(Portfolio portfolio) {
		this.portfolio = portfolio;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Integer getNumLike() {
		return numLike;
	}

	public void setNumLike(Integer numLike) {
		this.numLike = numLike;
	}

	public EAccess getAccess() {
		return access;
	}

	public void setAccess(EAccess access) {
		this.access = access;
	}

}
