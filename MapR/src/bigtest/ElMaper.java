package bigtest;

import java.io.IOException;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.Mapper;

public class ElMaper extends Mapper<LongWritable, Text, Text, Text> {

	public void map(LongWritable offset, Text lineText, Context context) throws IOException, InterruptedException {
		// fechacompra, userid, monto, origen, destino, ano, mes

		String fields[] = lineText.toString().split(",");

		context.write(new Text(fields[4]), new Text(fields[0]));
	}
}
