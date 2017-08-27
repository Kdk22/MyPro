using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class OrderStatusDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<OrderStatus> GetAllOrderStatus()
        {
            List<OrderStatus> list = new List<OrderStatus>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from OrderStatus";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new OrderStatus
                    {
                        StatusId = Convert.ToInt32(rdr["StatusId"]),
                        OrderId = Convert.ToInt32(rdr["OrderId"]),
                        OSName = rdr["OSName"].ToString(),
                        Description = rdr["Description"].ToString(),
                        Active = rdr["Active"].ToString()


                    });
                }
                return list;
            }
        }
        public int Add(OrderStatus OrderStatus)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into OrderStatus (OrderId,OSName,Description,Active) values(@Ord,@Nam,@Desp,@Act)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Ord", OrderStatus.OrderId);
                cmd.Parameters.AddWithValue("@Name", OrderStatus.OSName);
                cmd.Parameters.AddWithValue("@Desp", OrderStatus.Description);
                cmd.Parameters.AddWithValue("@Act", OrderStatus.Active);



                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(OrderStatus OrderStatus)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE OrderStatus SET OrderId=@Ord, Name=@OSName,Description=@Descp,Active=@Act where StatusId=@StatusId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Ord", OrderStatus.OrderId);
                cmd.Parameters.AddWithValue("@OSName", OrderStatus.OSName);
                cmd.Parameters.AddWithValue("@Desp", OrderStatus.Description);
                cmd.Parameters.AddWithValue("@Act", OrderStatus.Active);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int StatusId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from OrderStatus where StatusId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", StatusId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<OrderStatus> SearchOrderStatus(OrderStatus OrderStatus)
        {
            List<OrderStatus> list = new List<OrderStatus>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from OrderStatus where OrderStatus Like @OStatus + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@OStatus", OrderStatus.OSName);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new OrderStatus
                    {
                        StatusId = Convert.ToInt32(rdr["StatusId"]),
                        OrderId = Convert.ToInt32(rdr["OrderId"]),
                        OSName = rdr["OSName"].ToString(),
                        Description = rdr["Description"].ToString(),
                        Active = rdr["Active"].ToString()


                    });
                }
                return list;
            }
        }
    }
}


    
