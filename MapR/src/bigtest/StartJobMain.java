package bigtest;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.apache.hive.hcatalog.mapreduce.HCatInputFormat;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.FloatWritable;

public class StartJobMain extends Configured implements Tool {

	public static void main(String[] args) throws Exception {
		System.out.println("Ola Edgar");
		int res = ToolRunner.run(new StartJobMain(), args);
		System.exit(res);
	}

	public int run(String[] args) throws Exception {
		Configuration conf = getConf();
        conf.set("mapred.compress.map.output", "true");
        conf.set("mapred.output.compression.type", "BLOCK");
        
		Job job = new Job(conf, "Sumar cantidad de visitas por parte del mes");
		job.setJarByClass(this.getClass());

		System.out.println(args[0]);
		// Use TextInputFormat, the default unless job.setInputFormatClass is used
		HCatInputFormat.setInput(job, args[0], args[1]);

		FileOutputFormat.setOutputPath(job, new Path("/user/cloudera/proyectobases/"));
		
		job.setInputFormatClass(HCatInputFormat.class);
		job.setJarByClass(ElMaper.class);
		job.setReducerClass(ElReducer.class);
		job.setOutputKeyClass(IntWritable.class);
		job.setOutputValueClass(FloatWritable.class);
		return job.waitForCompletion(true) ? 0 : 1;
	}

}
