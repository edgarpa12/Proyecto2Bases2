package bigtest;

import java.io.IOException;
import java.text.ParseException;

import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hive.hcatalog.data.HCatRecord;
import org.apache.hive.hcatalog.data.schema.HCatSchema;
import org.apache.hive.hcatalog.mapreduce.HCatBaseInputFormat;

public class ElMaper extends Mapper<LongWritable, HCatRecord, Text, Text> {

	

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void map(WritableComparable key, HCatRecord value, org.apache.hadoop.mapreduce.Mapper.Context context)
			throws IOException, InterruptedException, ParseException {

		// Get table schema
		HCatSchema schema = HCatBaseInputFormat.getTableSchema(context.getConfiguration());

		// transaccionid, fechacompra, userid, monto, origen, destino

		String fechacomprap = new String(value.getString("fechacompra", schema));
		String destinop = value.getString("destino", schema);
		
		context.write(destinop, fechacomprap);
	}
}
