package com.evensoft.pingpong.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.junit.jupiter.api.Test;

public class PingPongController {

	private static final String Driver = "com.mysql.cj.jdbc.Driver";
	private static final String Url = "jdbc:mysql://localhost:3306/test?serverTimezone=UTC&characterEncoding=UTF-8";
	private static final String user = "root";
	private static final String password = "cjh5448";
	
	@Test
	public void testConn() throws Exception{
		Class.forName(Driver);
		
		try {
			Connection con = DriverManager.getConnection(Url, user, password);
			String name = getName(con, 1);
			System.out.println(name);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public String getName(Connection con, Integer seq) throws Exception{
		String res = null;
		String sqlQuery = "select name from user where seq=?";
		
		try {
			PreparedStatement pstmt = con.prepareStatement(sqlQuery);
			pstmt.setString(1, seq.toString());
			ResultSet rs = pstmt.executeQuery();
			if(rs.next()) res = rs.getString("name");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return res;
	}
}
