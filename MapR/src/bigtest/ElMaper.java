package bigtest;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.hadoop.io.FloatWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.Mapper;

public class ElMaper extends Mapper<LongWritable, Text, Text, FloatWritable> {
    

    public void map(LongWritable offset, Text lineText, Context context)
        throws IOException, InterruptedException {
    
    	
    	String fields[]=lineText.toString().split(",");

    	String date = fields[0].toString();
		String destination = fields[3];
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		
		int year = 0;
		int month = 0;
		
		double daysPerPart = 0.0;
		
		double daysCount = 0.0;
		
		int monthPart = 0;
		
		try {
			Date parse = sdf.parse(date);
		
			cal.setTime(parse);
			
			
			
			year = cal.get(Calendar.YEAR);
			
			month = (cal.get(Calendar.MONTH) + 1);
			
			
			daysCount = (new GregorianCalendar(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH),
					cal.get(Calendar.DAY_OF_MONTH))).getActualMaximum(Calendar.DAY_OF_MONTH);
			
			daysPerPart = (daysCount + 1) / 4;
			
			monthPart = (int) Math.floor(cal.get(Calendar.DAY_OF_MONTH) / daysPerPart);
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String yearS = Integer.toString(year);
		String monthS = Integer.toString(month);
		String monthPartS = Integer.toString(monthPart);
		
		
		String together = yearS+' '+month+' '+monthPartS+' '+destination;
		FloatWritable sale = new FloatWritable(Float.parseFloat(fields[1]));
		
		context.write(new Text(together), sale);
    }
}
