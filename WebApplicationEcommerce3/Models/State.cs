using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class State
    {
        public int StateId { get; set; }
        public int CountryId { get; set; }
        public string StateName { get; set; }
        public string Description { get; set; }
    }
}