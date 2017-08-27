using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class CategoryDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Category> GetAllCategory()
        {
            List<Category> list = new List<Category>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Category";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Category
                    {
                        CategoryId = Convert.ToInt32(rdr["CategoryId"]),
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        CategoryName = rdr["CategoryName"].ToString(),
                        Description = rdr["Description"].ToString(),
                        Image = rdr["Image"].ToString()

                    });
                }
                return list;
            }
        }
        public int Add(Category Category)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into Category (SubCategoryId,CategoryName,Description) values(@Sub,@Cat,@Des)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Sub", Category.SubCategoryId);
                cmd.Parameters.AddWithValue("@Cat", Category.CategoryName);
                cmd.Parameters.AddWithValue("@Des", Category.Description);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Category Category)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Category SET SubCategoryId=@Sub,CategoryName=@Cat,Description=@Des where CategoryId=@CatId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CatId", Category.CategoryId);
                cmd.Parameters.AddWithValue("@Sub", Category.SubCategoryId);
                cmd.Parameters.AddWithValue("@Cat", Category.CategoryName);
                cmd.Parameters.AddWithValue("@Des", Category.Description);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int CategoryId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Category where CategoryId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", CategoryId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Category> SearchCategory(Category Category)
        {
            List<Category> list = new List<Category>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Category where CategoryName Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", Category.CategoryName);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Category
                    {
                        CategoryId = Convert.ToInt32(rdr["CategoryId"]),
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        CategoryName = rdr["CategoryName"].ToString(),
                        Description = rdr["Description"].ToString(),
                       // Image = rdr["EmailId"].ToString(),
                       
                    });
                }
                return list;
            }
        }
    }
}