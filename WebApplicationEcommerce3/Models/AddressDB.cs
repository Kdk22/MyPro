using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class AddressDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Address> GetAllAddress()
        {
            List<Address> list = new List<Address>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Address";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                   list.Add(new Address
                    {
                        AddressId = Convert.ToInt32(rdr["AddressId"]),
                        CityId = Convert.ToInt32(rdr["CityId"]),
                        StateId = Convert.ToInt32(rdr["StateId"]),
                        CountryId = Convert.ToInt32(rdr["CountryId"]),
                        HouseNo = Convert.ToInt32(rdr["HouseNo"]),
                        Long = Convert.ToDouble(rdr["Long"]),
                        Lati = Convert.ToDouble(rdr["Lati"]),
                       ZipCode = Convert.ToInt32(rdr["ZipCode"])
                    });
                }
                return list;
            }
        }
        public int Add(Address Address)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into Address (CityId,StateId,CountryId,HouseNo,Long,Lati,ZipCode) values(@CitId,@StatId, @CounId, @HousNo, @Lon, @Lat, @ZiCod)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CitId", Address.CityId);
                cmd.Parameters.AddWithValue("@StatId", Address.StateId);
                cmd.Parameters.AddWithValue("@CounId", Address.CountryId);
                cmd.Parameters.AddWithValue("@HousNo", Address.HouseNo);
                cmd.Parameters.AddWithValue("@Lon", Address.Long);
                cmd.Parameters.AddWithValue("@Lat", Address.Lati);
                cmd.Parameters.AddWithValue("@ZiCod", Address.ZipCode);
                
                //cmd.Parameters.AddWithValue("@Ima", Address.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Address Address)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Address SET CityId=@CitId,StateId=@StatId,CountryId=@CounId,HouseNo=@HousNo,Long=@Lon,Lati=@Lat,ZipCode=@ZipC where AddressId=@AddId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                
                cmd.Parameters.AddWithValue("@AddId", Address.AddressId);
                cmd.Parameters.AddWithValue("@CitId", Address.CityId);
                cmd.Parameters.AddWithValue("@StatId", Address.StateId);
                cmd.Parameters.AddWithValue("@CounId", Address.CountryId);
                cmd.Parameters.AddWithValue("@HousNo", Address.HouseNo);
                cmd.Parameters.AddWithValue("@Lon", Address.Long);
                cmd.Parameters.AddWithValue("@Lat", Address.Lati);
                cmd.Parameters.AddWithValue("@ZipC", Address.ZipCode);

                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int AddressId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Address where AddressId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", AddressId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Address> SearchAddress(Address Address)
        {
            List<Address> list = new List<Address>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Address where AddressId Like @PName";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", Address.AddressId);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Address
                    {
                        AddressId = Convert.ToInt32(rdr["AddressId"]),
                        CityId = Convert.ToInt32(rdr["CityId"]),
                        StateId = Convert.ToInt32(rdr["StateId"]),
                        CountryId = Convert.ToInt32(rdr["CountryId"]),
                        HouseNo = Convert.ToInt32(rdr["HouseNo"]),
                        Long = Convert.ToDouble(rdr["Long"]),
                        Lati = Convert.ToDouble(rdr["Lati"]),
                        ZipCode = Convert.ToInt32(rdr["ZipCode"])
                    });
                }
                return list;
            }
        }

    }
}