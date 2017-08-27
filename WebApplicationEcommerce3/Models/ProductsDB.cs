using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class ProductsDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Products> GetAllProducts()
        {
            List<Products> list = new List<Products>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Products";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Products
                    {
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        ProductName = rdr["ProductName"].ToString(),
                        PurchasePrice = Convert.ToInt32(rdr["PurchasePrice"]),
                        SalesPrice = Convert.ToInt32(rdr["SalesPrice"]),
                        CategoryId = Convert.ToInt32(rdr["CategoryId"]),
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        SupplierId= Convert.ToInt32(rdr["SupplierId"]),
                        Quantity = Convert.ToInt32(rdr["Quantity"]),
                        ReorderLevel = Convert.ToInt32(rdr["ReorderLevel"]),
                        DiscountAvailable = Convert.ToInt32(rdr["DiscountAvailable"]),
                        Stock = Convert.ToInt32(rdr["Stock"]),
                        Color = rdr["Color"].ToString(),
                        Size = rdr["Size"].ToString(),
                        Other1 = rdr["Other1"].ToString(),
                        Other2 = rdr["Other2"].ToString(),
                        Image = rdr["Image"].ToString()
                    });
                }
                return list;
            }
        }
        public int Add(Products Product)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into Products (CategoryId,SubCategoryId,SupplierId,ProductName,PurchasePrice,SalesPrice,Quantity,ReorderLevel,DiscountAvailable,Stock,Color,Size,Other1,Other2) values(@CatId,@SubCatId,@SuppId,@ProdN,@Pur,@Sal,@Qua,@Reo,@Dis,@Sto,@Col,@Siz,@Oth1,@Oth2)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CatId", Product.CategoryId);
                cmd.Parameters.AddWithValue("@SubCatId", Product.SubCategoryId);
                cmd.Parameters.AddWithValue("@SuppId", Product.SupplierId);
                cmd.Parameters.AddWithValue("@ProdN", Product.ProductName);
                cmd.Parameters.AddWithValue("@Pur", Product.PurchasePrice);
                cmd.Parameters.AddWithValue("@Sal", Product.SalesPrice);
                cmd.Parameters.AddWithValue("@Qua", Product.Quantity);
                cmd.Parameters.AddWithValue("@Reo", Product.ReorderLevel);
                cmd.Parameters.AddWithValue("@Dis", Product.DiscountAvailable);
                cmd.Parameters.AddWithValue("@Sto", Product.Stock);
                cmd.Parameters.AddWithValue("@Col", Product.Color);
                cmd.Parameters.AddWithValue("@Siz", Product.Size);
                cmd.Parameters.AddWithValue("@Oth1", Product.Other1);
                cmd.Parameters.AddWithValue("@Oth2", Product.Other2);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Products Product)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Products SET CategoryId=@CatId,SubCategoryId=@SubCatId,SupplierId=@SuppId,ProductName=@ProdN,PurchasePrice=@Pur,SalesPrice=@Sal,Quantity=@Qua,ReorderLevel=@Reo,DiscountAvailable=@Dis,Stock=@Sto,Color=@Col,Size=@Siz,Other1=@Oth1,Other2=@Oth2 where ProductId=@ProdId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ProdId", Product.ProductId);
                cmd.Parameters.AddWithValue("@CatId", Product.CategoryId);
                cmd.Parameters.AddWithValue("@SubCatId", Product.SubCategoryId);
                cmd.Parameters.AddWithValue("@SuppId", Product.SupplierId);
                cmd.Parameters.AddWithValue("@ProdN", Product.ProductName);
                cmd.Parameters.AddWithValue("@Pur", Product.PurchasePrice);
                cmd.Parameters.AddWithValue("@Sal", Product.SalesPrice);
                cmd.Parameters.AddWithValue("@Qua", Product.Quantity);
                cmd.Parameters.AddWithValue("@Reo", Product.ReorderLevel);
                cmd.Parameters.AddWithValue("@Dis", Product.DiscountAvailable);
                cmd.Parameters.AddWithValue("@Sto", Product.Stock);
                cmd.Parameters.AddWithValue("@Col", Product.Color);
                cmd.Parameters.AddWithValue("@Siz", Product.Size);
                cmd.Parameters.AddWithValue("@Oth1", Product.Other1);
                cmd.Parameters.AddWithValue("@Oth2", Product.Other2);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int ProductId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Products where ProductId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", ProductId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Products> SearchProducts(Products Product)
        {
            List<Products> list = new List<Products>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Products where ProductName Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", Product.ProductName);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Products
                    {
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        ProductName = rdr["ProductName"].ToString(),
                        PurchasePrice = Convert.ToInt32(rdr["PurchasePrice"]),
                        SalesPrice = Convert.ToInt32(rdr["SalesPrice"]),
                        CategoryId = Convert.ToInt32(rdr["CategoryId"]),
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        SupplierId= Convert.ToInt32(rdr["SupplierId"]),
                        Quantity = Convert.ToInt32(rdr["Quantity"]),
                        ReorderLevel = Convert.ToInt32(rdr["ReorderLevel"]),
                        DiscountAvailable = Convert.ToInt32(rdr["DiscountAvailable"]),
                        Stock = Convert.ToInt32(rdr["Stock"]),
                        Color = rdr["Color"].ToString(),
                        Size = rdr["Size"].ToString(),
                        Other1 = rdr["Other1"].ToString(),
                        Other2 = rdr["Other2"].ToString(),
                        Image = rdr["Image"].ToString()
                    });
                }
                return list;
            }
        }
    }
    
}