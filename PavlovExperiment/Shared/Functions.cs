using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PavlovExperiment.Shared
{
    public static class Functions
    {
        public static string writeError(string str)
        {
            return "{\"error\":\"" + str + "\"}";
        }

        public static string writeSuccess(string str)
        {
            return "{\"success\":\"" + str + "\"}";
        }
    }
}