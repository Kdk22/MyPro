using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplicationEcommerce3.Controllers.Models;

namespace WebApplicationEcommerce3.Models
{
    public class OfferDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Offer> GetAllOffer()
        {
            List<Offer> list = new List<Offer>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Offer";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Offer
                    {
                        OfferId = Convert.ToInt32(rdr["OfferId"]),

                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        OfferPrice = Convert.ToInt32(rdr["OfferPrice"]),
                        Description = rdr["Description"].ToString(),
                        Active = rdr["Active"].ToString(),
                        OfferStartDate = Convert.ToInt32(rdr["OfferStartDate"]),
                        OfferEndDate = Convert.ToInt32(rdr["OfferEndDate"]),
                        Remaining = Convert.ToInt32(rdr["Remaining"])


                    });
                }
                return list;
            }
        }
        public int Add(Offer Offer)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into Offer (ProductId,OfferPrice,Description,Active,OfferStartDate,OfferEndDate,Remaining) values(@ProId,@OffP,@Desp,@Act,@OffStrt,@OffEnd,@Rem)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ProdId", Offer.ProductId);
                cmd.Parameters.AddWithValue("@OffP", Offer.OfferPrice);
                cmd.Parameters.AddWithValue("@Desp", Offer.Description);
                cmd.Parameters.AddWithValue("@Act", Offer.Active);
                cmd.Parameters.AddWithValue("@OffStrt", Offer.OfferStartDate);
                cmd.Parameters.AddWithValue("@OffEnd", Offer.OfferEndDate);
                cmd.Parameters.AddWithValue("@Rem", Offer.Remaining);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Offer Offer)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Offer SET ProductId=@ProdId,OfferPrice=@OffP,Description=@Desp,Active=@Act,OfferStartDate=@OffStrt,OfferEndDate=@OfferEnd,Remaining=@Rem where OfferId=@OfferId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@OfferId", Offer.OfferId);
                cmd.Parameters.AddWithValue("@ProdId", Offer.ProductId);
                cmd.Parameters.AddWithValue("@OffP", Offer.OfferPrice);
                cmd.Parameters.AddWithValue("@Desp", Offer.Description);
                cmd.Parameters.AddWithValue("@Act", Offer.Active);
                cmd.Parameters.AddWithValue("@OffStrt", Offer.OfferStartDate);
                cmd.Parameters.AddWithValue("@OffEnd", Offer.OfferEndDate);
                cmd.Parameters.AddWithValue("@Rem", Offer.Remaining);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int OfferId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Offer where OfferId=@OfferId";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@OfferId", OfferId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Offer> SearchOffer(Offer Offer)
        {
            List<Offer> list = new List<Offer>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Offer where OfferPrice Like @OfferPrice+ '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@OfferPrice", Offer.OfferPrice);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Offer
                    {
                        OfferId = Convert.ToInt32(rdr["OfferId"]),
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        OfferPrice = Convert.ToInt32(rdr["OfferPrice"]),
                        Description = rdr["Description"].ToString(),
                        Active = rdr["Active"].ToString(),
                        OfferStartDate = Convert.ToInt32(rdr["OfferStartDate"]),
                        OfferEndDate = Convert.ToInt32(rdr["OfferEndDate"]),
                        Remaining = Convert.ToInt32(rdr["Remaining"])

                    });
                }
                return list;

            }
        }
    }
}