using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class CustomersDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Customers> GetAllCustomers()
        {
            List<Customers> list = new List<Customers>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Customers";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Customers
                    {
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        AddressId = Convert.ToInt32(rdr["AddressId"]),
                        FirstName = rdr["FirstName"].ToString(),
                        MiddleName = rdr["MiddleName"].ToString(),
                        LastName = rdr["LastName"].ToString(),
                        MobileNo = Convert.ToInt32(rdr["MobileNo"]),
                        Phone = Convert.ToInt32(rdr["Phone"]),
                        Gender = rdr["Gender"].ToString(),
                        EmailId = rdr["EmailId"].ToString(),
                        Description = rdr["Description"].ToString()
                    });
                }
                return list;
            }
        }

        public int Add(Customers Customers)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into Customers (AddressId,FirstName,MiddleName,LastName,MobileNo,Phone,Gender,EmailId,Description) values(@Add,@Fir,@Mid,@Las,@Mob,@Pho,@Gen,@Ema,@Des)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Add", Customers.AddressId);
                cmd.Parameters.AddWithValue("@Fir", Customers.FirstName);
                cmd.Parameters.AddWithValue("@Mid", Customers.MiddleName);
                cmd.Parameters.AddWithValue("@Las", Customers.LastName);
                cmd.Parameters.AddWithValue("@Mob", Customers.MobileNo);
                cmd.Parameters.AddWithValue("@Pho", Customers.Phone);
                cmd.Parameters.AddWithValue("@Gen", Customers.Gender);
                cmd.Parameters.AddWithValue("@Ema", Customers.EmailId);
                cmd.Parameters.AddWithValue("@Des", Customers.Description);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Customers Customers)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Customers SET AddressId=@Add,FirstName=@Fir,MiddleName=@Mid,LastName=@Las,MobileNo=@Mob,Phone=@Pho,Gender=@Gen,EmailId=@Ema,Description=@Des where CustomerId=@CusId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CusId", Customers.CustomerId);
                cmd.Parameters.AddWithValue("@Add", Customers.AddressId);
                cmd.Parameters.AddWithValue("@Fir", Customers.FirstName);
                cmd.Parameters.AddWithValue("@Mid", Customers.MiddleName);
                cmd.Parameters.AddWithValue("@Las", Customers.LastName);
                cmd.Parameters.AddWithValue("@Mob", Customers.MobileNo);
                cmd.Parameters.AddWithValue("@Pho", Customers.Phone);
                cmd.Parameters.AddWithValue("@Gen", Customers.Gender);
                cmd.Parameters.AddWithValue("@Ema", Customers.EmailId);
                cmd.Parameters.AddWithValue("@Des", Customers.Description);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int CustomerId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Customers where CustomerId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", CustomerId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Customers> SearchCustomers(Customers Customers)
        {
            List<Customers> list = new List<Customers>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Customers where FirstName Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", Customers.FirstName);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Customers
                    {
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        AddressId = Convert.ToInt32(rdr["AddressId"]),
                        FirstName = rdr["FirstName"].ToString(),
                        MiddleName = rdr["MiddleName"].ToString(),
                        LastName = rdr["LastName"].ToString(),
                        MobileNo = Convert.ToInt32(rdr["MobileNo"]),
                        Phone = Convert.ToInt32(rdr["Phone"]),
                        Gender = rdr["Gender"].ToString(),
                        EmailId = rdr["EmailId"].ToString(),
                        Description = rdr["Description"].ToString()
                    });
                }
                return list;
            }
        }
    }
}