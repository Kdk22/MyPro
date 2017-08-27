using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class CityDB
    {


        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<City> GetAllCity()
        {
            List<City> list = new List<City>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from City";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new City
                    {
                        CityId = Convert.ToInt32(rdr["CityId"]),
                        StateId = Convert.ToInt32(rdr["StateId"]),
                        Name = rdr["Name"].ToString(),
                        Description = rdr["Description"].ToString()
                    });
                }
                return list;
            }
        }
        public int Add(City City)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into City (StateId,Name,Description) values(@StaId,@Name,@Desc)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StaId", City.StateId);
                cmd.Parameters.AddWithValue("@Name", City.Name);
                cmd.Parameters.AddWithValue("@Desc", City.Description);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(City City)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE City SET StateId=@StaId,Name=@Name,Description=@Desc where CityId=@CityId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CityId", City.CityId);
                cmd.Parameters.AddWithValue("@StaId", City.StateId);
                cmd.Parameters.AddWithValue("@Name", City.Name);
                cmd.Parameters.AddWithValue("@Desc", City.Description);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int CityId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from City where CityId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", CityId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<City> Search(City City)
        {
            List<City> list = new List<City>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from City where Name Like @CName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@CName", City.Name);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new City
                    {
                        CityId = Convert.ToInt32(rdr["CityId"]),
                        StateId = Convert.ToInt32(rdr["StateId"]),
                        Name = rdr["Name"].ToString(),
                        Description = rdr["Description"].ToString()
                    });
                }
                return list;
            }

        }
    }
}
