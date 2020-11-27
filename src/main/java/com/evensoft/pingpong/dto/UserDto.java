package com.evensoft.pingpong.dto;

import lombok.Data;

@Data
public class UserDto {

	private int    seq;
	private String name;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
