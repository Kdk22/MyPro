using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Controllers.Models;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class ProductRatingController : Controller
    {
        // GET: ProductRating
        ProductRatingDB ProductRatingDB = new ProductRatingDB();
        // GET: ProductRatings
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(ProductRatingDB.GetAllProductRating(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(ProductRating ProductRating)
        {
            return Json(ProductRatingDB.Add(ProductRating), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ProductRatingId)
        {
            var ProductRating = ProductRatingDB.GetAllProductRating().Find(x => x.ProductRatingId.Equals(ProductRatingId));
            return Json(ProductRating, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ProductRating ProductRating)
        {
            return Json(ProductRatingDB.Update(ProductRating), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ProductRatingId)
        {
            return Json(ProductRatingDB.Delete(ProductRatingId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(ProductRating ProductRating)
        {
            return Json(ProductRatingDB.SearchProductRating(ProductRating), JsonRequestBehavior.AllowGet);
        }
    }
}