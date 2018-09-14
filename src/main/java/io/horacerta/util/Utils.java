package io.horacerta.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Utils {
	
	
	public static final long OITO_HORAS_EM_MILLISEGUNDOS = 28800000;
	public static final long NOVE_HORAS_EM_MILLISEGUNDOS = 32400000;

	public static Date stringToDate(String date) throws ParseException {

		return new SimpleDateFormat("yyyy-MM-dd").parse(date); 

	}
	
	public static int getWeekDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.DAY_OF_WEEK);
	}
}
