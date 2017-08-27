using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class CityController : Controller
    {
        CityDB CityDB = new CityDB();
        // GET: City
        public ActionResult Index()
        {
            return View();
        }
        
       
        public JsonResult List()
        {
            return Json(CityDB.GetAllCity(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(City City)
        {
            return Json(CityDB.Add(City), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int CityId)
        {
            var City = CityDB.GetAllCity().Find(x => x.CityId.Equals(CityId));
            return Json(City, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(City City)
        {
            return Json(CityDB.Update(City), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int CityId)
        {
            return Json(CityDB.Delete(CityId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(City City)
        {
            return Json(CityDB.Search(City), JsonRequestBehavior.AllowGet);
        }

    }
}