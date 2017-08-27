using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class WishListController : Controller
    {
        WishListDB WishListDB = new WishListDB();
        // GET: WishLists
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(WishListDB.GetAllWishList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(WishList WishList)
        {
            return Json(WishListDB.Add(WishList), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int WishListId)
        {
            var WishList = WishListDB.GetAllWishList().Find(x => x.WishListId.Equals(WishListId));
            return Json(WishList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(WishList WishList)
        {
            return Json(WishListDB.Update(WishList), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int WishListId)
        {
            return Json(WishListDB.Delete(WishListId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(WishList WishList)
        {
            return Json(WishListDB.SearchWishList(WishList), JsonRequestBehavior.AllowGet);
        }
    }
}