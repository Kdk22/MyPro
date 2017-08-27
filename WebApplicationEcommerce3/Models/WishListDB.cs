using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class WishListDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<WishList> GetAllWishList()
        {
              List<WishList> list = new List<WishList>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from WishList";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new WishList
                    {
                        WishListId = Convert.ToInt32(rdr["WishListId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        InsertDate = (DateTime)(rdr["InsertDate"]),
                        Image = rdr["Image"].ToString()
                    });
                }
                return list;
            }
        }
        public int Add(WishList WishList)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into WishList (CustomerId,ProductId,InsertDate) values(@CusId,@ProdId,@InsDate)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CusId", WishList.CustomerId);
                cmd.Parameters.AddWithValue("@ProdId", WishList.ProductId);
                cmd.Parameters.AddWithValue("@InsDate", WishList.InsertDate);
               // cmd.Parameters.AddWithValue("@Image", WishList.Image);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(WishList WishList)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE WishList SET CustomerId=@CusId,ProductId=@ProdId,InsertDate=@InsDate where WishListId=@WishListId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@WishListId", WishList.WishListId);
                cmd.Parameters.AddWithValue("@CusId", WishList.CustomerId);
                cmd.Parameters.AddWithValue("@ProdId", WishList.ProductId);
                cmd.Parameters.AddWithValue("@InsDate", WishList.InsertDate);
                //cmd.Parameters.AddWithValue("@Image", WishList.Image);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int WishListId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from WishList where WishListId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", WishListId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<WishList> SearchWishList(WishList WishList)
        {
            List<WishList> list = new List<WishList>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from WishList where InsertDate = @Date";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Date", WishList.InsertDate);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new WishList
                    {
                        WishListId = Convert.ToInt32(rdr["WishListId"]),
                        CustomerId = Convert.ToInt32(rdr["CustomerId"]),
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        InsertDate = (DateTime)rdr["InsertDate"],
                        Image = rdr["Image"].ToString()
                    });
                }
                return list;
            }
        }

    }
}