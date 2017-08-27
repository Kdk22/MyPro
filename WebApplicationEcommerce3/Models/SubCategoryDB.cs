using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class SubCategoryDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<SubCategory> GetAllSubCategory()
        {
            List<SubCategory> list = new List<SubCategory>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from SubCategory";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new SubCategory
                    {
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        SubCatName = rdr["SubCatName"].ToString(),
                        Description = rdr["Description"].ToString(),
                        Image = rdr["Image"].ToString()

                    });
                }
                return list;
            }
        }
        public int Add(SubCategory SubCategory)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into SubCategory (SubCatName, Description) values(@Cat,@Des)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Sub", SubCategory.SubCategoryId);
                cmd.Parameters.AddWithValue("@Cat", SubCategory.SubCatName);
                cmd.Parameters.AddWithValue("@Des", SubCategory.Description);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(SubCategory SubCategory)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE SubCategory SET SubCatName=@Cat,Description=@Des where SubCategoryId=@CatId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CatId", SubCategory.SubCategoryId);
                cmd.Parameters.AddWithValue("@Cat", SubCategory.SubCatName);
                cmd.Parameters.AddWithValue("@Des", SubCategory.Description);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int SubCategoryId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from SubCategory where SubCategoryId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", SubCategoryId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<SubCategory> SearchSubCategory(SubCategory SubCategory)
        {
            List<SubCategory> list = new List<SubCategory>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from SubCategory where SubCatName Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", SubCategory.SubCatName);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new SubCategory
                    {
                        SubCategoryId = Convert.ToInt32(rdr["SubCategoryId"]),
                        SubCatName = rdr["SubCatName"].ToString(),
                        Description = rdr["Description"].ToString(),
                        // Image = rdr["EmailId"].ToString(),

                    });
                }
                return list;
            }
        }
    }
}