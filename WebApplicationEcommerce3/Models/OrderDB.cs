using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class OrderDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Order> GetAllOrder()
        {
            List<Order> list = new List<Order>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "SELECT * from [Order]";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Order
                    {
                        OrderId = Convert.ToInt32(rdr["OrderId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        AddressId = Convert.ToInt32(rdr["AddressId"]),
                        DeliveryCharge = Convert.ToInt32(rdr["DeliveryCharge"]),
                        Discount = Convert.ToInt32(rdr["Discount"]),
                        TaxAmount = Convert.ToInt32(rdr["TaxAmount"]),
                        NetAmount = Convert.ToInt32(rdr["NetAmount"]),
                        OrderDate = (DateTime)(rdr["OrderDate"])
                });
                }
                return list;
            }
        }
        public int Add(Order Order)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into [Order] (CustomerId,AddressId,DeliveryCharge,Discount,TaxAmount,NetAmount,OrderDate) values(@CusId,@AddrId,@Del,@Dis,@Tax,@Net,@Ord)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@OrdId", Order.OrderId);
                cmd.Parameters.AddWithValue("@CusId", Order.CustomerId);
                cmd.Parameters.AddWithValue("@AddrId", Order.AddressId);
                cmd.Parameters.AddWithValue("@Del", Order.DeliveryCharge);
                cmd.Parameters.AddWithValue("@Dis", Order.Discount);
                cmd.Parameters.AddWithValue("@Tax", Order.TaxAmount);
                cmd.Parameters.AddWithValue("@Net", Order.NetAmount);
                cmd.Parameters.AddWithValue("@Ord", Order.OrderDate);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Order Order)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Order SET CategoryId=@CusId,AddressId=@AddrId,DeliveryCharge=@Del,Discount=@Dis,TaxAmount=@Tax,NetAmount=@Net,OrderDate=@Ord where OrderId=@OrdId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@OrdId", Order.OrderId);
                cmd.Parameters.AddWithValue("@CusId", Order.CustomerId);
                cmd.Parameters.AddWithValue("@AddrId", Order.AddressId);
                cmd.Parameters.AddWithValue("@Del", Order.DeliveryCharge);
                cmd.Parameters.AddWithValue("@Dis", Order.Discount);
                cmd.Parameters.AddWithValue("@Tax", Order.TaxAmount);
                cmd.Parameters.AddWithValue("@Net", Order.NetAmount);
                cmd.Parameters.AddWithValue("@Ord", Order.OrderDate);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int OrderId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Order where OrderId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", OrderId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Order> SearchOrder(Order Order)
        {
            List<Order> list = new List<Order>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Order where OrderName Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", Order.OrderDate);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Order
                    {
                        OrderId = Convert.ToInt32(rdr["OrderId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        AddressId = Convert.ToInt32(rdr["SubCategoryId"]),
                        DeliveryCharge = Convert.ToInt32(rdr["DeliveryCharge"]),
                        Discount = Convert.ToInt32(rdr["Discount"]),
                        TaxAmount = Convert.ToInt32(rdr["TaxAmount"]),
                        NetAmount = Convert.ToInt32(rdr["NetAmount"]),
                        OrderDate = (DateTime)rdr["OrderDate"]
                    });
                }
                return list;
            }
        }
    }
}