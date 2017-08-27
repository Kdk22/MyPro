using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

using WebApplicationEcommerce3.Controllers.Models;

namespace WebApplicationEcommerce3.Models
{
    public class OrderPaymentDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<OrderPayment> GetAllOrderPayment()
        {
            List<OrderPayment> list = new List<OrderPayment>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from OrderPayment";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new OrderPayment
                    {
                        OPId = Convert.ToInt32(rdr["OPId"]),
                        OrderId = Convert.ToInt32(rdr["OrderId"]),
                        PaymentId = Convert.ToInt32(rdr["PaymentId"]),
                        PaymentType = rdr["PaymentType"].ToString(),
                        Date = (DateTime)rdr["Date"],
                        Status = rdr["Status"].ToString()

                    });
                }
                return list;
            }
        }
        public int Add(OrderPayment OrderPayment)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into OrderPayment (OrderId,PaymentId,PaymentType,Date,Status) values(@OrId,@PayId,@PayType,@Date,@Sts)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@OrId", OrderPayment.OrderId);
                cmd.Parameters.AddWithValue("@PayId", OrderPayment.PaymentId);
                cmd.Parameters.AddWithValue("@PayType", OrderPayment.PaymentType);
                cmd.Parameters.AddWithValue("@Date", OrderPayment.Date);
                cmd.Parameters.AddWithValue("@Sts", OrderPayment.Status);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(OrderPayment OrderPayment)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE OrderPayment SET OrderId=@OrId,PaymentId=@PayId,PaymentType=@PayType,Date=@Date,Status=@Sts where OPId=@OPId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@OPId", OrderPayment.OPId);
                cmd.Parameters.AddWithValue("@OrId", OrderPayment.OrderId);
                cmd.Parameters.AddWithValue("@PayId", OrderPayment.PaymentId);
                cmd.Parameters.AddWithValue("@PayType", OrderPayment.PaymentType);
                cmd.Parameters.AddWithValue("@Date", OrderPayment.Date);
                cmd.Parameters.AddWithValue("@Sts", OrderPayment.Status);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int OPId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from OrderPayment where OPId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", OPId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<OrderPayment> SearchOrderPayment(OrderPayment OrderPayment)
        {
            List<OrderPayment> list = new List<OrderPayment>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from OrderPayment where Date Like @ODate + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@ODate", OrderPayment.Date);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new OrderPayment
                    {
                        OPId = Convert.ToInt32(rdr["OPId"]),
                        OrderId = Convert.ToInt32(rdr["OrderId"]),
                        PaymentId = Convert.ToInt32(rdr["PaymentId"]),
                        PaymentType = rdr["PaymentType"].ToString(),
                        Date = (DateTime)rdr["Date"],
                        Status = rdr["Status"].ToString()
                    });
                }
                return list;
            }
        }
    }
}

    
