using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Controllers.Models
{
    public class CustomerAccount
    {
        public int CustomerAccId { get; set; }
        public int CustomerId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string HintQue { get; set; }
        public string Answer { get; set; }
        public string Active { get; set; }
    }
}