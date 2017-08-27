using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class SupplierDB
    {
        String cs = ConfigurationManager.ConnectionStrings["mydb"].ConnectionString;

        public List<Supplier> GetAllSupplier()
        {
            List<Supplier> list = new List<Supplier>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Supplier";
                cmd.CommandText = query;
                cmd.Connection = con;
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Supplier
                    {
                        SupplierId = Convert.ToInt32(rdr["SupplierId"]),
                        CompanyName = rdr["CompanyName"].ToString(),
                        ContactNo1 = Convert.ToInt32(rdr["ContactNo1"]),
                        ContactNo2 = rdr["ContactNo2"].ToString(),
                        EmailId = rdr["EmailId"].ToString(),
                        Address1 = rdr["Address1"].ToString(),
                        Address2 = rdr["Address2"].ToString(),
                        City = rdr["City"].ToString(),
                        State = rdr["State"].ToString(),
                        Country = rdr["Country"].ToString(),
                        DiscountType = rdr["DiscountType"].ToString(),
                        GoodsType = rdr["GoodsType"].ToString(),
                        DiscountAmount = Convert.ToInt32(rdr["DiscountAmount"]),
                        CurrentOrder = Convert.ToInt32(rdr["CurrentOrder"]),
                        PaymentMethod = rdr["PaymentMethod"].ToString(),
                        AccountNumber = rdr["AccountNumber"].ToString()
                    });
                }
                return list;
            }
        }
        public int Add(Supplier Supplier)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Insert into Supplier (CompanyName,ContactNo1,ContactNo2,EmailId,Address1,Address2,City,State,Country,DiscountType,GoodsType,DiscountAmount,CurrentOrder,PaymentMethod,AccountNumber) values(@Com,@Con1,@Con2,@Ema,@Add1,@Add2,@Cit,@Sta,@Cou,@Dis,@Goo,@Dia,@Cur,@Pay,@Acc)";
                cmd.CommandText = query;
                cmd.Connection = con;
                // com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Com", Supplier.CompanyName);
                cmd.Parameters.AddWithValue("@Con1", Supplier.ContactNo1);
                cmd.Parameters.AddWithValue("@Con2", Supplier.ContactNo2);
                cmd.Parameters.AddWithValue("@Ema", Supplier.EmailId);
                cmd.Parameters.AddWithValue("@Add1", Supplier.Address1);
                cmd.Parameters.AddWithValue("@Add2", Supplier.Address2);
                cmd.Parameters.AddWithValue("@Cit", Supplier.City);
                cmd.Parameters.AddWithValue("@Sta", Supplier.State);
                cmd.Parameters.AddWithValue("@Cou", Supplier.Country);
                cmd.Parameters.AddWithValue("@Dis", Supplier.DiscountType);
                cmd.Parameters.AddWithValue("@Goo", Supplier.GoodsType);
                cmd.Parameters.AddWithValue("@Dia", Supplier.DiscountAmount);
                cmd.Parameters.AddWithValue("@Cur", Supplier.CurrentOrder);
                cmd.Parameters.AddWithValue("@Pay", Supplier.PaymentMethod);
                cmd.Parameters.AddWithValue("@Acc", Supplier.AccountNumber);
                //cmd.Parameters.AddWithValue("@Ima", Product.Image);


                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Supplier Supplier)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "UPDATE Supplier SET CompanyName=@Com,ContactNo1=@Con1,ContactNo2=@Con2,EmailId=@Ema,Address1=@Add1,Address2=@Add2,City=@Cit,State=@Sta,Country=@Cou,DiscountType=@Dis,GoodsType=@Goo,DiscountAmount=@Dia,CurrentOrder=@Cur,PaymentMethod=@Pay,AccountNumber=@Acc where SupplierId=@SupId";
                cmd.CommandText = query;
                cmd.Connection = con;
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SupId", Supplier.SupplierId);
                cmd.Parameters.AddWithValue("@Com", Supplier.CompanyName);
                cmd.Parameters.AddWithValue("@Con1", Supplier.ContactNo1);
                cmd.Parameters.AddWithValue("@Con2", Supplier.ContactNo2);
                cmd.Parameters.AddWithValue("@Ema", Supplier.EmailId);
                cmd.Parameters.AddWithValue("@Add1", Supplier.Address1);
                cmd.Parameters.AddWithValue("@Add2", Supplier.Address2);
                cmd.Parameters.AddWithValue("@Cit", Supplier.City);
                cmd.Parameters.AddWithValue("@Sta", Supplier.State);
                cmd.Parameters.AddWithValue("@Cou", Supplier.Country);
                cmd.Parameters.AddWithValue("@Dis", Supplier.DiscountType);
                cmd.Parameters.AddWithValue("@Goo", Supplier.GoodsType);
                cmd.Parameters.AddWithValue("@Dia", Supplier.DiscountAmount);
                cmd.Parameters.AddWithValue("@Cur", Supplier.CurrentOrder);
                cmd.Parameters.AddWithValue("@Pay", Supplier.PaymentMethod);
                cmd.Parameters.AddWithValue("@Acc", Supplier.AccountNumber);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int SupplierId)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Delete from Supplier where SupplierId=@Id";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Id", SupplierId);
                i = cmd.ExecuteNonQuery();

            }
            return i;
        }
        public List<Supplier> SearchSupplier(Supplier Supplier)
        {
            List<Supplier> list = new List<Supplier>();
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand();
                string query = "Select * from Supplier where CompanyName Like @PName + '%' ";
                cmd.CommandText = query;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@PName", Supplier.CompanyName);
                //cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    list.Add(new Supplier
                    {
                        SupplierId = Convert.ToInt32(rdr["SupplierId"]),
                        CompanyName = rdr["CompanyName"].ToString(),
                        ContactNo1 = Convert.ToInt32(rdr["ContactNo1"]),
                        ContactNo2 = rdr["ContactNo2"].ToString(),
                        EmailId = rdr["EmailId"].ToString(),
                        Address1 = rdr["Address1"].ToString(),
                        Address2 = rdr["Address2"].ToString(),
                        City = rdr["City"].ToString(),
                        State = rdr["State"].ToString(),
                        Country = rdr["Country"].ToString(),
                        DiscountType = rdr["DiscountType"].ToString(),
                        GoodsType = rdr["GoodsType"].ToString(),
                        DiscountAmount = Convert.ToInt32(rdr["DiscountAmount"]),
                        CurrentOrder = Convert.ToInt32(rdr["CurrentOrder"]),
                        PaymentMethod = rdr["PaymentMethod"].ToString(),
                        AccountNumber = rdr["AccountNumber"].ToString()
                    });
                }
                return list;
            }
        }
    }
}