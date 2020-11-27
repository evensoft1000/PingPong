package com.evensoft.pingpong.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.evensoft.pingpong.dto.UserDto;


@Mapper
public interface UserMapper extends MyBatis {

	public UserDto selecUser(UserDto user);
}
