using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class AddressController : Controller
    {
        
        AddressDB AddressDB = new AddressDB();
        // GET:Addresss
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(AddressDB.GetAllAddress(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Address Address)
        {
            return Json(AddressDB.Add(Address), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int AddressId)
        {
            var Address = AddressDB.GetAllAddress().Find(x => x.AddressId.Equals(AddressId));
            return Json(Address, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Address Address)
        {
            return Json(AddressDB.Update(Address), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int AddressId)
        {
            return Json(AddressDB.Delete(AddressId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Address Address)
        {
            return Json(AddressDB.SearchAddress(Address), JsonRequestBehavior.AllowGet);
        }
    }
}