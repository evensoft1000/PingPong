package com.evensoft.pingpong.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.evensoft.pingpong.dto.UserDto;
import com.evensoft.pingpong.mapper.UserMapper;

@Service
public class PingPongServiceImpl implements PingPongService{

	@Autowired
	UserMapper mapper;
	
	@Override
	public UserDto index(UserDto user) {
		System.out.println("################ user.get ::: " + user.getSeq());
		System.out.println("################ user.name ::: " + user.getName());
		
		UserDto resultDto = mapper.selecUser(user);
		System.out.println("resultDto seq :: " + resultDto.getSeq());
		System.out.println("resultDto name :: " + resultDto.getName());
		return resultDto;
	}

}
