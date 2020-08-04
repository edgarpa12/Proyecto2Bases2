package bigtest;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;

import org.apache.hadoop.io.Writable;

public class KeyType implements Writable {
	int year;
	int month;
	int monthPart;
	String destino;

	@Override
	public void readFields(DataInput in) throws IOException {
		year = in.readInt();
		month = in.readInt();
		monthPart = in.readInt();
		destino = in.readLine();
	}

	@Override
	public void write(DataOutput out) throws IOException {
		out.writeInt(year);
		out.writeInt(month);
		out.writeInt(monthPart);
		out.writeBytes(destino);
	}

}
