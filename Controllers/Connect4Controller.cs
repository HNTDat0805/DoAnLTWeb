using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Controllers
{
    public class Connect4Controller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
