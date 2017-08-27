using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class ShoppingCartDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<ShoppingCart> GetAllShoppingCart()
        {
            List<ShoppingCart> list = new List<ShoppingCart>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from ShoppingCart";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new ShoppingCart
                    {
                        CartId = Convert.ToInt32(rdr["CartId"]),
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        CategoryId = Convert.ToInt32(rdr["CategoryId"]),
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        Date = (DateTime)rdr["Date"],
                        Quantity = Convert.ToInt32(rdr["Quantity"]),
                        Price = Convert.ToInt32(rdr["Price"]),
                    });
                }
                return list;
            }
        }
        public int Add(ShoppingCart ShoppingCart)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into ShoppingCart (ProductId,CustomerId,CategoryId,SubCategoryIdDate,Quantity,Price,) values(@ProdId,@CusId,@CatId,@SubCatId,@Date,@Quan,@Price,)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CartId", ShoppingCart.CartId);
                cmd.Parameters.AddWithValue("@ProdId", ShoppingCart.ProductId);
                cmd.Parameters.AddWithValue("@CusId", ShoppingCart.CustomerId);
                cmd.Parameters.AddWithValue("@CatId", ShoppingCart.CategoryId);
                cmd.Parameters.AddWithValue("@SubCatId", ShoppingCart.SubCategoryId);
                cmd.Parameters.AddWithValue("@Date", ShoppingCart.Date);
                cmd.Parameters.AddWithValue("@Quan", ShoppingCart.Quantity);
                cmd.Parameters.AddWithValue("@Price", ShoppingCart.Price);
                
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(ShoppingCart ShoppingCart)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE ShoppingCart SET ProductId=@ProdId,CustomerId=@CusId,CategoryId=@CatId,SubCategoryId=@SubCatIdDate=@Date,Quantity=@Quan,Price=@Price, where CartId=@CartId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CartId", ShoppingCart.CartId);
                cmd.Parameters.AddWithValue("@ProdId", ShoppingCart.ProductId);
                cmd.Parameters.AddWithValue("@CusId", ShoppingCart.CustomerId);
                cmd.Parameters.AddWithValue("@CatId", ShoppingCart.CategoryId);
                cmd.Parameters.AddWithValue("@SubCatId", ShoppingCart.SubCategoryId);
                cmd.Parameters.AddWithValue("@Date", ShoppingCart.Date);
                cmd.Parameters.AddWithValue("@Quan", ShoppingCart.Quantity);
                cmd.Parameters.AddWithValue("@Price", ShoppingCart.Price);
                
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int CartId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from ShoppingCart where CartId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", CartId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<ShoppingCart> SearchShoppingCart(ShoppingCart ShoppingCart)
        {
            List<ShoppingCart> list = new List<ShoppingCart>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from ShoppingCart where Date Like @SDate + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@SDate", ShoppingCart.Date);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new ShoppingCart
                    {
                        CartId = Convert.ToInt32(rdr["CartId"]),
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        CategoryId = Convert.ToInt32(rdr["CategoryId"]),
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        Date = (DateTime)rdr["Date"],
                        Quantity = Convert.ToInt32(rdr["Quantity"]),
                        Price = Convert.ToInt32(rdr["Price"]),
                        

                    });
                }
                return list;
            }
        }

    }
}