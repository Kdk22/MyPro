using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int AddressId { get; set; }
        public int DeliveryCharge { get; set; }
        public int Discount { get; set; }
        public int TaxAmount { get; set; }
        public int NetAmount { get; set; }
        public DateTime OrderDate { get; set; }
    }
}