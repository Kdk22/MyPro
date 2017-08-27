using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Controllers.Models;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class OfferController : Controller
    {
        OfferDB OfferDB = new OfferDB();
        // GET: Offers
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(OfferDB.GetAllOffer(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Offer Offer)
        {
            return Json(OfferDB.Add(Offer), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int OfferId)
        {
            var Offer = OfferDB.GetAllOffer().Find(x => x.OfferId.Equals(OfferId));
            return Json(Offer, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Offer Offer)
        {
            return Json(OfferDB.Update(Offer), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int OfferId)
        {
            return Json(OfferDB.Delete(OfferId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Offer Offer)
        {
            return Json(OfferDB.SearchOffer(Offer), JsonRequestBehavior.AllowGet);
        }
    }
}