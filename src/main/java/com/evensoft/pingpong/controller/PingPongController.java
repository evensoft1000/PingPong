package com.evensoft.pingpong.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.evensoft.pingpong.dto.UserDto;
import com.evensoft.pingpong.service.PingPongService;

@Controller
public class PingPongController {

	@Autowired
	PingPongService pingPongService;

	@RequestMapping(value="/")
	public ModelAndView index() {
		ModelAndView view = new ModelAndView();
		UserDto user = new UserDto();
	    user.setSeq(1);
	    UserDto result = pingPongService.index(user);
		System.out.println("###### result ::: " + result.getName());
		
		view.addObject("name", result.getName());
		view.setViewName("index");
        
		return view;
	}

}
