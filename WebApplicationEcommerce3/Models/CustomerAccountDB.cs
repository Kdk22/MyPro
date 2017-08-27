using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplicationEcommerce3.Controllers.Models;

namespace WebApplicationEcommerce3.Models
{
    public class CustomerAccountDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;
        public List<CustomerAccount> GetAllCustomerAccount()
        {
            List<CustomerAccount> list = new List<CustomerAccount>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from CustomerAccount";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new CustomerAccount
                    {
                        CustomerAccId = Convert.ToInt32(rdr["CustomerAccId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        Username = rdr["Username"].ToString(),
                        Password = rdr["Password"].ToString(),
                        HintQue = rdr["HintQue"].ToString(),
                        Answer = rdr["Answer"].ToString(),
                        Active = rdr["Active"].ToString()
                    });
                }
                return list;
            }
        }

        public int Add(CustomerAccount CustomerAccount)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into CustomerAccount (CustomerId,Username,Password,HintQue,Answer,Active) values(@CusId,@Use,@Pas,@Hin,@Ans,@Act)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CusId", CustomerAccount.CustomerId);
                cmd.Parameters.AddWithValue("@Use", CustomerAccount.Username);
                cmd.Parameters.AddWithValue("@Pas", CustomerAccount.Password);
                cmd.Parameters.AddWithValue("@Hin", CustomerAccount.HintQue);
                cmd.Parameters.AddWithValue("@Ans", CustomerAccount.Answer);
                cmd.Parameters.AddWithValue("@Act", CustomerAccount.Active);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(CustomerAccount CustomerAccount)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE CustomerAccount SET CustomerId=@Cus,Username=@Use,Password=@Pas,HintQue=@Hin,Answer=@Ans,Active=@Act where CustomerAccId=@CusId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CusId", CustomerAccount.CustomerAccId);
                cmd.Parameters.AddWithValue("@Cus", CustomerAccount.CustomerId);
                cmd.Parameters.AddWithValue("@Use", CustomerAccount.Username);
                cmd.Parameters.AddWithValue("@Pas", CustomerAccount.Password);
                cmd.Parameters.AddWithValue("@Hin", CustomerAccount.HintQue);
                cmd.Parameters.AddWithValue("@Ans", CustomerAccount.Answer);
                cmd.Parameters.AddWithValue("@Act", CustomerAccount.Active);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int CustomerAccId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from CustomerAccount where CustomerAccId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", CustomerAccId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<CustomerAccount> SearchCustomerAccount(CustomerAccount CustomerAccount)
        {
            List<CustomerAccount> list = new List<CustomerAccount>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from CustomerAccount where Username Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", CustomerAccount.Username);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new CustomerAccount
                    {
                        CustomerAccId = Convert.ToInt32(rdr["CustomerAccId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        Password = rdr["Password"].ToString(),
                        HintQue = rdr["HintQue"].ToString(),
                        Username = rdr["Username"].ToString(),
                        Answer = rdr["Answer"].ToString(),
                        Active = rdr["Active"].ToString()
                    });
                }
                return list;
            }
        }
    }
}