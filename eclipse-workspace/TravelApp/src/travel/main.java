package travel;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.println("hi");
		String url = "jdbc:mysql://localhost:3306/travelAgency";
		String userName ="root";
		String password = "Rivya@246";
		try {
//			conncetion
			Connection myConn = DriverManager.getConnection(url,userName,password);
			Statement statement = myConn.createStatement();
			ResultSet result = statement.executeQuery("select * from login");
			while(result.next()) {
				System.out.println(result.getString(2)+" "+result.getString(3)+" "+result.getInt(1));
			}
		}
		catch(Exception e) {
		  e.printStackTrace();
		}

	}

}
