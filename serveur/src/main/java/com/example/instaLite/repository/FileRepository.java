package com.example.instaLite.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.instaLite.models.File;


@Repository
public interface FileRepository extends JpaRepository<File, Long>{
	
	Optional<File> findByPath(String path);
	
	Boolean existsByPath(String path);

	@Query("SELECT new com.example.instaLite.payload.response.FilesResponse(a.id,a.title,a.description, a.type, a.path, a.numLike, a.access) FROM File a")
	List findAll();
	
	@Query("SELECT new com.example.instaLite.payload.response.FilesResponse(a.id,a.title,a.description, a.type, a.path, a.numLike, a.access) FROM File a WHERE a.id=:id")
	Optional<File> findFileById(Long id);
	
}
