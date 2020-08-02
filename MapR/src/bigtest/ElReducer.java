package bigtest;

import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.FloatWritable;

import org.apache.hadoop.mapreduce.Reducer;

public class ElReducer	extends Reducer<IntWritable, IntWritable, IntWritable, FloatWritable> {
    @Override
    public void reduce(IntWritable date, Iterable<IntWritable> montos, Context context)
        throws IOException, InterruptedException {
    	
    	int sumaMontos = 0;
    	for(IntWritable monto : montos) {
    		sumaMontos += monto.get();
    	}
      context.write(date, new FloatWritable(sumaMontos));
    }
}
