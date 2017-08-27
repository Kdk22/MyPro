using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class StateDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<State> GetAllState()
        {
            List<State> list = new List<State>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from State";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new State
                    {
                        StateId = Convert.ToInt32(rdr["StateId"]),
                        CountryId = Convert.ToInt32(rdr["CountryId"]),
                        StateName = rdr["StateName"].ToString(),
                        Description = rdr["Description"].ToString()
                    });
                }
                return list;
            }
        }
        public int Add(State State)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into State (CountryId,StateName,Description) values(@CountryId,@StateName,@Desc)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StateId", State.StateId);
                cmd.Parameters.AddWithValue("@CountryId", State.CountryId);
                cmd.Parameters.AddWithValue("@StateName", State.StateName);
                cmd.Parameters.AddWithValue("@Desc", State.Description);

                //cmd.Parameters.AddWithValue("@Ima", State.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(State State)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE State SET CountryId=@CounId, StateName=@StatNam,Description=@Desc where StateId=@StatId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatId", State.StateId);
                cmd.Parameters.AddWithValue("@CounId", State.CountryId);
                cmd.Parameters.AddWithValue("@StatNam", State.StateName);
                cmd.Parameters.AddWithValue("@Desc", State.Description);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int StateId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from State where StateId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", StateId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<State> SearchState(State State)
        {
            List<State> list = new List<State>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from State where StateName Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", State.StateName);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new State
                    {
                        StateId = Convert.ToInt32(rdr["StateId"]),
                        StateName = rdr["StateName"].ToString(),
                        Description = rdr["Description"].ToString(),
                        
                    });
                }
                return list;
            }
        }

    }
}