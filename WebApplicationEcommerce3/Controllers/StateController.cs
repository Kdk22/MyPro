using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class StateController : Controller
    {
        StateDB StateDB = new StateDB();
        // GET:States
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(StateDB.GetAllState(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(State State)
        {
            return Json(StateDB.Add(State), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int StateId)
        {
            var State = StateDB.GetAllState().Find(x => x.StateId.Equals(StateId));
            return Json(State, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(State State)
        {
            return Json(StateDB.Update(State), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int StateId)
        {
            return Json(StateDB.Delete(StateId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(State State)
        {
            return Json(StateDB.SearchState(State), JsonRequestBehavior.AllowGet);
        }
    }
}