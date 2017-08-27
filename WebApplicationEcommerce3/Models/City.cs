using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class City
    {
        public int CityId { get; set; }
        public int StateId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}