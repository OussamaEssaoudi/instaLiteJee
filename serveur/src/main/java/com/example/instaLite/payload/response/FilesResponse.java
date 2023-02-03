package com.example.instaLite.payload.response;

import com.example.instaLite.models.EAccess;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class FilesResponse {
		
	public FilesResponse(Long id, String title, String description, String type, String path, Integer numLike,
            EAccess access) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.path = path;
        this.numLike = numLike;
        this.access = access;
    }
	
	public Long id;
	public String title;
	public String description;	
	public String type;
	public String path;
	public Integer numLike;
	public EAccess access;
}
