using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class Supplier
    {
        public int SupplierId { get; set; }
        public string CompanyName { get; set; }
        public int ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }
        public string EmailId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string DiscountType { get; set; }
        public string GoodsType { get; set; }
        public int DiscountAmount { get; set; }
        public int CurrentOrder { get; set; }
        public string PaymentMethod { get; set; }
        public string AccountNumber { get; set; }
    }
}