using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class CountryDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Country> GetAllCountry()
        {
            List<Country> list = new List<Country>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Country";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Country
                    {
                        CountryId = Convert.ToInt32(rdr["CountryId"]),
                        Name = rdr["Name"].ToString(),
                        Description = rdr["Description"].ToString()
                    });
                }
                return list;
            }
        }
        public int Add(Country Country)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into Country (Name,Description) values(@Nam,@Desc)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nam", Country.Name);
                cmd.Parameters.AddWithValue("@Desc", Country.Description);
                //cmd.Parameters.AddWithValue("@Ima", Country.Image);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Country Country)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Country SET Name=@Nam,Description=@Desc where CountryId=@CounId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CounId", Country.CountryId);
                cmd.Parameters.AddWithValue("@Nam", Country.Name);
                cmd.Parameters.AddWithValue("@Desc", Country.Description);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int CountryId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Country where CountryId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", CountryId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Country> SearchCountry(Country Country)
        {
            List<Country> list = new List<Country>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Country where Name Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", Country.Name);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Country
                    {
                        CountryId = Convert.ToInt32(rdr["CountryId"]),
                        Name = rdr["Name"].ToString(),
                        Description = rdr["Description"].ToString()
                    });
                }
                return list;
            }
        }

    }
}