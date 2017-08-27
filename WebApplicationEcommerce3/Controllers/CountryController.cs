using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class CountryController : Controller
    {
        // GET: Country
        CountryDB CountryDB = new CountryDB();
       
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(CountryDB.GetAllCountry(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Country Country)
        {
            return Json(CountryDB.Add(Country), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int CountryId)
        {
            var Country = CountryDB.GetAllCountry().Find(x => x.CountryId.Equals(CountryId));
            return Json(Country, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Country Country)
        {
            return Json(CountryDB.Update(Country), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int CountryId)
        {
            return Json(CountryDB.Delete(CountryId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Country Country)
        {
            return Json(CountryDB.SearchCountry(Country), JsonRequestBehavior.AllowGet);
        }
    }
}