using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplicationEcommerce3.Controllers.Models;

namespace WebApplicationEcommerce3.Models
{
    public class OrderDetailsDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<OrderDetails> GetAllOrderDetails()
        {
            List<OrderDetails> list = new List<OrderDetails>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from OrderDetails";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new OrderDetails
                    {
                        OrderDetailId = Convert.ToInt32(rdr["OrderDetailId"]),
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        OrderId = Convert.ToInt32(rdr["OrderId"]),
                        ProductPrice = Convert.ToInt32(rdr["ProductPrice"]),
                        Quantity = Convert.ToInt32(rdr["Quantity"]),
                        Discount = Convert.ToInt32(rdr["Discount"]),
                        Tax = Convert.ToInt32(rdr["Tax"]),
                        Total = Convert.ToInt32(rdr["Total"]),
                        Active = rdr["Active"].ToString()
                    });

            }
            return list;
        }
    }
    public int Add(OrderDetails OrderDetails)
    {
        int i;
        using (SqlConnection con = new SqlConnection(cs))
        {

            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "Insert into OrderDetails (ProductId,OrderId,ProductPrice,Quantity,Discount,Tax,Total,Active) values(@ProdId,@OrderId,@PrPrice,@Quan,@Disc,@Tax,@Tota,@Act)";
            cmd.CommandText = query;
            cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ProdId", OrderDetails.ProductId);
                cmd.Parameters.AddWithValue("@OrderId", OrderDetails.OrderId);
            cmd.Parameters.AddWithValue("@PrPrice", OrderDetails.ProductPrice);
            cmd.Parameters.AddWithValue("@Quan", OrderDetails.Quantity);
            cmd.Parameters.AddWithValue("@Disc", OrderDetails.Discount);
            cmd.Parameters.AddWithValue("@Tax", OrderDetails.Tax);
            cmd.Parameters.AddWithValue("@Tota", OrderDetails.Total);
            cmd.Parameters.AddWithValue("@Act", OrderDetails.Active);
            //cmd.Parameters.AddWithValue("@Ima", Product.Image);


            i = cmd.ExecuteNonQuery();
        }
        return i;
    }
    public int Update(OrderDetails OrderDetails)
    {
        int i;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "UPDATE OrderDetails SET ProductId=@ProdId,ProductPrice=@PrcPrice,Quantity=@Quan,Discount=@Disc,Tax=@Tax,Total=@Tota,Active=@Act where OrderDetailId=@OrderId";
            cmd.CommandText = query;
            cmd.Connection = con;
            //com.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@OrderId", OrderDetails.OrderDetailId);
            cmd.Parameters.AddWithValue("@ProdId", OrderDetails.ProductId);
            cmd.Parameters.AddWithValue("@PrcPrice", OrderDetails.ProductPrice);
            cmd.Parameters.AddWithValue("@Quan", OrderDetails.Quantity);
            cmd.Parameters.AddWithValue("@Disc", OrderDetails.Discount);
            cmd.Parameters.AddWithValue("@Tax", OrderDetails.Tax);
            cmd.Parameters.AddWithValue("@Tota", OrderDetails.Total);
            cmd.Parameters.AddWithValue("@Act", OrderDetails.Active);
            i = cmd.ExecuteNonQuery();
        }
        return i;
    }

    public int Delete(int OrderDetailId)
    {
        int i;
        using (SqlConnection con = new SqlConnection(cs))
        {

            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "Delete from OrderDetails where OrderDetailId=@Id";
            cmd.CommandText = query;
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@Id", OrderDetailId);
            i = cmd.ExecuteNonQuery();

        }
        return i;
    }
    public List<OrderDetails> SearchOrderDetails(OrderDetails OrderDet)
    {
        List<OrderDetails> list = new List<OrderDetails>();
        using (SqlConnection con = new SqlConnection(cs))
        {

            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "Select * from OrderDetails where OrderDetailId Like @OrderD";
            cmd.CommandText = query;
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@OrderD", OrderDet.OrderDetailId);
            //cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                list.Add(new OrderDetails
                {
                    OrderDetailId = Convert.ToInt32(rdr["OrderDetailId"]),
                    ProductId = Convert.ToInt32(rdr["ProductId"]),
                    ProductPrice = Convert.ToInt32(rdr["ProductPrice"]),
                    Quantity = Convert.ToInt32(rdr["Quantity"]),
                    Discount = Convert.ToInt32(rdr["Discount"]),
                    Tax = Convert.ToInt32(rdr["Tax"]),
                    Total = Convert.ToInt32(rdr["Total"]),
                    Active = rdr["Active"].ToString()
                    });
        }
        return list;
    }
}

    }
}