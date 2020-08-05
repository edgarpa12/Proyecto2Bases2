package bigtest;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;
import java.util.Objects;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.WritableComparable;

public class KeyType implements WritableComparable<KeyType> {
    IntWritable year;
    IntWritable month;
    IntWritable monthPart;
    Text destino;

    public KeyType() {
        year = new IntWritable(0);
        month = new IntWritable(0);
        monthPart = new IntWritable(0);
        destino = new Text();
    }

    public KeyType(IntWritable year, IntWritable month, IntWritable monthPart, Text destino) {
        this.year = year;
        this.month = month;
        this.monthPart = monthPart;
        this.destino = destino;
    }

    public KeyType(int year, int month, int monthPart, String destino) {
        this.year = new IntWritable(year);
        this.month = new IntWritable(month);
        this.monthPart = new IntWritable(monthPart);
        this.destino = new Text(destino);
    }

    @Override
    public void readFields(DataInput in) throws IOException {
        year.readFields(in);
        month.readFields(in);
        monthPart.readFields(in);
        destino.readFields(in);
    }

    @Override
    public void write(DataOutput out) throws IOException {
        year.write(out);
        month.write(out);
        monthPart.write(out);
        destino.write(out);
    }

    @Override
    public int compareTo(KeyType o) {
        int dist = destino.compareTo(o.destino);
        dist = dist == 0 ? year.compareTo(o.year) : dist;
        dist = dist == 0 ? month.compareTo(o.month) : dist;
        return dist == 0 ? monthPart.compareTo(o.monthPart) : dist;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        KeyType that = (KeyType) o;

        return that.destino.equals(destino) && that.month == month && that.year == year && that.monthPart == monthPart;
    }

    @Override
    public int hashCode() {
        return Objects.hash(year, month, monthPart, destino);
    }

    @Override
    public String toString() {
        return destino + " " + year + "-" + month + "-" + monthPart;
    }

}
