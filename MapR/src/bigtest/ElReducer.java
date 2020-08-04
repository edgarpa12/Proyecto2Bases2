package bigtest;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.io.IOException;
//import java.time.YearMonth;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.apache.hadoop.mapreduce.Reducer;

public class ElReducer extends Reducer<Text, Text, KeyType, IntWritable> {
	@Override
	public void reduce(Text destino, Iterable<Text> salidas, Context context) throws IOException, InterruptedException {

		HashMap<String, Integer> data = new HashMap<String, Integer>();

		// yyyy-mm-parte -> cantidad de visitas

		Calendar cal = Calendar.getInstance();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//		YearMonth ym;
		double daysCount;

		for (Text d : salidas) {
			try {
				cal.setTime(format.parse(d.toString()));

//				ym = YearMonth.of(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1);
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
			KeyType kt = new KeyType();

			kt.destino = destino.toString();
			kt.year = Integer.parseInt(dateParts[0]);
			kt.month = Integer.parseInt(dateParts[1]);
			kt.monthPart = Integer.parseInt(dateParts[2]);

			context.write(kt, out);
		}
	}
}

// Destino				Month Part		Mes			Año <--- Llaves
// Cantidad visitas <--- Valor