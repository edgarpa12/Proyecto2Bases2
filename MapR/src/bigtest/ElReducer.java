package bigtest;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.FloatWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;


public class ElReducer	extends Reducer<Text, FloatWritable, Text, IntWritable> {
    @Override
    public void reduce(Text values, Iterable<FloatWritable> sales, Context context)
        throws IOException, InterruptedException {
    	
    	int count = 0;
    	
    	for(FloatWritable sale:sales) {
    		count++;
    	}
    	
 
    	context.write(values, new IntWritable(count));
    	
    }
}
