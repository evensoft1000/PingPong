package com.evensoft.pingpong.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import com.evensoft.pingpong.mapper.MyBatis;

@Configuration
@MapperScan(value = "com.evensoft.pingpong.mapper",markerInterface = MyBatis.class)
public class MyBatisConfig {

}
