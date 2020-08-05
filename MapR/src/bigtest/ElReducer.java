package bigtest;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;

import org.apache.hadoop.mapreduce.Reducer;

public class ElReducer extends Reducer<Text, Text, KeyType, IntWritable> {
	@Override
	public void reduce(Text destino, Iterable<Text> salidas, Context context) throws IOException, InterruptedException {
		HashMap<String, Integer> data = new HashMap<String, Integer>();

		// yyyy-mm-parte -> cantidad de visitas
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		double daysCount;

		for (Text d : salidas) {
			try {
				cal.setTime(format.parse(d.toString()));

				daysCount = (new GregorianCalendar(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH),
						cal.get(Calendar.DAY_OF_MONTH))).getActualMaximum(Calendar.DAY_OF_MONTH);

				double daysPerPart = (daysCount + 1) / 4;

				int monthPart = (int) Math.floor(cal.get(Calendar.DAY_OF_MONTH) / daysPerPart);

				String key = cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1) + "-" + monthPart;

				Integer count = data.get(key);
				count = count != null ? count + 1 : 1;

				data.put(key, count);

			} catch (ParseException e) {
				e.printStackTrace();
			}

		}

		for (String key : data.keySet()) {
			String[] dateParts = key.split("-");

			IntWritable out = new IntWritable(data.get(key));
			KeyType kt = new KeyType(Integer.parseInt(dateParts[0]), Integer.parseInt(dateParts[1]),
					Integer.parseInt(dateParts[2]), destino.toString());

			context.write(kt, out);
		}
	}
}
