package com.example.instaLite.payload.response;

public class FileResponse  {
	
	String fileName;
	String path;
	String message;
	
	public FileResponse() {
		super();
	}


	public FileResponse(String fileName, String filePath, String message) {
		super();
		this.fileName = fileName;
		this.path = filePath;
		this.message = message;
	}


	public String getFilePath() {
		return path;
	}


	public void setFilePath(String filePath) {
		this.path = filePath;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
