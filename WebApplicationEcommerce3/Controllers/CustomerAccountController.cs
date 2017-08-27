using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Controllers.Models;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class CustomerAccountController : Controller
    {
        CustomerAccountDB CustomerAccountDB = new CustomerAccountDB();
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(CustomerAccountDB.GetAllCustomerAccount(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(CustomerAccount CustomerAccount)
        {
            return Json(CustomerAccountDB.Add(CustomerAccount), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int CustomerAccId)
        {
            var CustomerAccount = CustomerAccountDB.GetAllCustomerAccount().Find(x => x.CustomerAccId.Equals(CustomerAccId));
            return Json(CustomerAccount, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(CustomerAccount CustomerAccount)
        {
            return Json(CustomerAccountDB.Update(CustomerAccount), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int CustomerAccId)
        {
            return Json(CustomerAccountDB.Delete(CustomerAccId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(CustomerAccount CustomerAccount)
        {
            return Json(CustomerAccountDB.SearchCustomerAccount(CustomerAccount), JsonRequestBehavior.AllowGet);
        }

    }
}