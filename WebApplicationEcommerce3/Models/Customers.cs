using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Controllers.Models
{
    public class Customers
    {
        public int CustomerId { get; set; }
        public int AddressId { get; set; }
        public string FirtName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int MobileNo { get; set; }
        public int Phone { get; set; }
        public string Gender { get; set; }
        public string EmailId { get; set; }
        public string Description { get; set; }
    }
}