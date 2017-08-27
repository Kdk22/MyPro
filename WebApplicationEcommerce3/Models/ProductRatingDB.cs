using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplicationEcommerce3.Controllers.Models;

namespace WebApplicationEcommerce3.Models
{
    public class ProductRatingDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<ProductRating> GetAllProductRating()
        {
            List<ProductRating> list = new List<ProductRating>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from ProductRating";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new ProductRating
                    {
                        ProductRatingId = Convert.ToInt32(rdr["ProductRatingId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        Name = rdr["Name"].ToString(),
                        Image = rdr["Image"].ToString(),
                        Description = rdr["Description"].ToString(),
                        Active = rdr["Active"].ToString()


                    });
            }
            return list;
        }
    }
    public int Add(ProductRating ProductRating)
    {
        int i;
        using (SqlConnection con = new SqlConnection(cs))
        {

            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "Insert into ProductRating (CustomerId,Name,Image,Description,Active) values(@CusId,@Name,@Image,@Desp,@Act)";
            cmd.CommandText = query;
            cmd.Connection = con;
            // com.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@RatId", ProductRating.ProductRatingId);
            cmd.Parameters.AddWithValue("@CusId", ProductRating.CustomerId);
            cmd.Parameters.AddWithValue("@Name", ProductRating.Name);
            cmd.Parameters.AddWithValue("@Image", ProductRating.Image);
            cmd.Parameters.AddWithValue("@Desp", ProductRating.Description);
            cmd.Parameters.AddWithValue("@Act", ProductRating.Active);
            //cmd.Parameters.AddWithValue("@Ima", ProductRating.Image);


            i = cmd.ExecuteNonQuery();
        }
        return i;
    }
    public int Update(ProductRating ProductRating)
    {
        int i;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "UPDATE ProductRating SET CustomerId=@CusId,Name=@Name,Image=@Image,Description=@Desp,Active=@Act where ProductRatingId=@RatId";
            cmd.CommandText = query;
            cmd.Connection = con;
            //com.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@RatId", ProductRating.ProductRatingId);
            cmd.Parameters.AddWithValue("@CusId", ProductRating.CustomerId);
            cmd.Parameters.AddWithValue("@Name", ProductRating.Name);
            cmd.Parameters.AddWithValue("@Image", ProductRating.Image);
            cmd.Parameters.AddWithValue("@Desp", ProductRating.Description);
            cmd.Parameters.AddWithValue("@Act", ProductRating.Active);
            i = cmd.ExecuteNonQuery();
        }
        return i;
    }

    public int Delete(int ProductRatingId)
    {
        int i;
        using (SqlConnection con = new SqlConnection(cs))
        {

            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "Delete from ProductRating where ProductRatingId=@Id";
            cmd.CommandText = query;
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@Id", ProductRatingId);
            i = cmd.ExecuteNonQuery();

        }
        return i;
    }
    public List<ProductRating> SearchProductRating(ProductRating ProductRating)
    {
        List<ProductRating> list = new List<ProductRating>();
        using (SqlConnection con = new SqlConnection(cs))
        {

            con.Open();
            SqlCommand cmd = new SqlCommand();
            string query = "Select * from ProductRating where Name Like @PName + '%' ";
            cmd.CommandText = query;
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@PName", ProductRating.Name);
            //cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                list.Add(new ProductRating
                {
                    ProductRatingId = Convert.ToInt32(rdr["ProductRatingId"]),
                    CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                    Name = rdr["Name"].ToString(),
                    Image = rdr["Image"].ToString(),
                        Description = rdr["Description"].ToString(),
                        Active = rdr["Active"].ToString()
                    });
        }
        return list;
    }
}

    }
}