using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Controllers.Models
{
    public class Offer
    {
        public int OfferId { get; set; }
        public int ProductId { get; set; }
        public string Description { get; set; }
        public string Active { get; set; }
        public int OfferPrice { get; set; }
        public int OfferStartDate { get; set; }
        public int OfferEndDate { get; set; }
        public int Remaining { get; set; }
    }
}