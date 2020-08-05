package bigtest;

import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.FloatWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.Mapper;

public class ElMaper extends Mapper<LongWritable, Text, Text, Text> {


    public void map(LongWritable offset, Text lineText, Context context)
            throws IOException, InterruptedException {

        // fecha, monto, origen, destino

        String[] fields = lineText.toString().split(",");

        Text destino = new Text();
        Text salidas = new Text();
        destino.set(fields[3]);
        salidas.set(fields[0]);

        context.write(destino, salidas);
    }
}
