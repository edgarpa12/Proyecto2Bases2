package bigtest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;

public class DBConection {
	
	public static ArrayList<String> ar = new ArrayList<String>();
	
	public static void main(String[] args) {
		
		int rows = 0;

        String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=master;user=sa;password=Webservice123";

        try (Connection con = DriverManager.getConnection(connectionUrl); Statement stmt = con.createStatement();) {
            String SQL = "SELECT * FROM Empresa";
            ResultSet rs = stmt.executeQuery(SQL);

            
            
            
            while (rs.next()) {
            	
                rows += 1;
                
                ar.add(rs.getString("nombre")); 
                
            }
            System.out.println(ar);
            
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

}

 