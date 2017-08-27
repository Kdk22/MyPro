using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class CustomersController : Controller
    {
        CustomersDB CustomersDB = new CustomersDB();
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(CustomersDB.GetAllCustomers(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Customers Customers)
        {
            return Json(CustomersDB.Add(Customers), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int CustomerId)
        {
            var Customers = CustomersDB.GetAllCustomers().Find(x => x.CustomerId.Equals(CustomerId));
            return Json(Customers, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Customers Customers)
        {
            return Json(CustomersDB.Update(Customers), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int CustomerId)
        {
            return Json(CustomersDB.Delete(CustomerId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Customers Customers)
        {
            return Json(CustomersDB.SearchCustomers(Customers), JsonRequestBehavior.AllowGet);
        }

    }
}