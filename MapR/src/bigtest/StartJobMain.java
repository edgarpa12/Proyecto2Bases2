package bigtest;

import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.FloatWritable;


public class StartJobMain extends Configured implements Tool {

    public static void main(String[] args) throws Exception {
        int res = ToolRunner.run(new StartJobMain(), args);
        System.exit(res);
    }

    public int run(String[] args) throws Exception {
        Job job = new Job(getConf(), "Sumar reservas de un lugar");
        job.setJarByClass(this.getClass());

        System.out.println(args[0]);
        // Use TextInputFormat, the default unless job.setInputFormatClass is used
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path("/user/cloudera/proyectobases/"));

        job.setMapperClass(ElMaper.class);
        job.setReducerClass(ElReducer.class);

        job.setOutputKeyClass(Text.class); // destino
        job.setOutputValueClass(Text.class);// fecha
        return job.waitForCompletion(true) ? 0 : 1;
    }

}
