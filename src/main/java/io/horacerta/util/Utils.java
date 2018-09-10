package io.horacerta.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

	public static Date stringToDate(String date) throws ParseException {

		return new SimpleDateFormat("yyyy-MM-dd").parse(date); 

	}
}
