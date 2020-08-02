package bigtest;

import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.FloatWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hive.hcatalog.data.HCatRecord;
import org.apache.hive.hcatalog.data.schema.HCatSchema;
import org.apache.hive.hcatalog.mapreduce.HCatBaseInputFormat;


public class ElMaper{
	
	public static class map1 extends Mapper<LongWritable, HCatRecord, IntWritable, IntWritable> {
		
		
	    // Primer MapReduce con FechaCompra y Monto
		
	    @SuppressWarnings({ "rawtypes", "unchecked" })
		public void map(WritableComparable key, HCatRecord value,
	    	     org.apache.hadoop.mapreduce.Mapper.Context context)
	        throws IOException, InterruptedException {
	    	
	    	
	    	// Get table schema
	        HCatSchema schema = HCatBaseInputFormat.getTableSchema(context.getConfiguration());
	    	
	    	// transaccionid, fechacompra, userid, monto, origen, destino
	        
	    	String fechacomprap = new String(value.getString("fechacompra", schema));
	        String montop = value.getString("monto", schema);
	        
	        
	        String fechacompra[] = fechacomprap.split("/");
	    	
	        
	        IntWritable date = new IntWritable(Integer.parseInt(fechacompra[0]));
	        IntWritable monto = new IntWritable(Integer.parseInt(montop));
	
	    
	        context.write(monto,date);
	        
	    } 
	}
	public class map2 extends Mapper<LongWritable, HCatRecord, IntWritable, Text> {
		//Segundo MapReduce con Transactionid y Destino
	
		@SuppressWarnings({ "rawtypes", "unchecked" })
		public void map(WritableComparable key, HCatRecord value,
			     org.apache.hadoop.mapreduce.Mapper.Context context)
		    throws IOException, InterruptedException {
			
			
			// Get table schema
		    HCatSchema schema = HCatBaseInputFormat.getTableSchema(context.getConfiguration());
			
			// transaccionid, fechacompra, userid, monto, origen, destino
		    
		    String transactionidp =value.getString("transactionid", schema);
		    String destinop = value.getString("destino", schema);
		    
		    
		    IntWritable transactionid = new IntWritable(Integer.parseInt(transactionidp));
		    Text destino = new Text(destinop);
		
		
		    context.write(transactionid,destino);
		    
		}
	}
}
