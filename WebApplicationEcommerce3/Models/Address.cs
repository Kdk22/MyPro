using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public int CityId { get; set; }
        public int StateId { get; set; }
        public int CountryId { get; set; }
        public int HouseNo { get; set; }
        public double Long { get; set; }
        public double Lati { get; set; }
        public int ZipCode { get; set; }
    }
}