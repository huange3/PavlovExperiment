using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.IO;

namespace PavlovExperiment.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        public void Load()
        {
            var currJSON = "";
            var filePath = Server.MapPath("../Data");
            DirectoryInfo info = null;
            FileInfo[] files = null;
            List<DataFile> dataFiles = new List<DataFile>();
            DataFile dataFile = null;

            try
            {
                info = new DirectoryInfo(filePath);
                // just get the text files and order by creation date
                files = info.GetFiles("*.csv").OrderByDescending(f => f.CreationTime).ToArray();

                if (files.Length <= 0)
                {
                    currJSON = writeError("No data files found.");
                    Response.ContentType = "application/json";
                    Response.Write(currJSON);
                    return;
                }

                foreach (FileInfo currFile in files)
                {
                    dataFile = new DataFile();
                    dataFile.FileName = currFile.Name;
                    dataFile.FilePath = currFile.FullName;
                    dataFile.FileExtension = currFile.Extension;
                    dataFile.FileCreationDtm = currFile.CreationTime.ToString("g", CultureInfo.CreateSpecificCulture("en-us"));

                    dataFiles.Add(dataFile);
                }

                currJSON = JsonConvert.SerializeObject(dataFiles);
                Response.ContentType = "application/json";
                Response.Write(currJSON);
            }
            catch (Exception e)
            {
                currJSON = writeError("Error occurred while loading data: " + e.Message);
                Response.ContentType = "application/json";
                Response.Write(currJSON);
            }
            finally
            {
                info = null;
                files = null;
                dataFile = null;
                dataFiles = null;
            }
        }

        // save the JSON to our Data folder
        public void Save()
        {
            var currJSON = "";
            var returnVal = "";
            var currID = "";
            string fileBody = "";
            string fileName = "";
            DateTime currDate;

            JObject dataObj = null;
            JArray trials = null;
            StreamWriter writer = null;

            try
            {
                currJSON = readRequestStream();

                if (currJSON != "")
                {
                    dataObj = JObject.Parse(currJSON);

                    currID = (string)dataObj["id"];

                    currDate = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "Pacific Standard Time");

                    // save a copy of the JSON to Data
                    fileName = Server.MapPath("../Data") + "/" + currDate.ToString("yyyyMMdd") + "-" + currID + ".json";
                    using (writer = new StreamWriter(fileName))
                    {
                        writer.WriteLine(currJSON);
                    }

                    // start writing/formatting our file body
                    // GENERAL SECTION
                    fileBody += "GENERAL\n";
                    fileBody += "Version," + dataObj["version"] + "\n";
                    fileBody += "Date," + currDate.ToString("MM-dd-yyyy") + "\n";
                    fileBody += "Participant ID," + currID + "\n";
                    fileBody += "Mode," + dataObj["mode"] + "\n";
                    fileBody += "\n";

                    // PRETRAINING SECTION
                    fileBody += "PRETRAINING\n";
                    fileBody += "Pass Criteria," + dataObj["ptPassCriteria"] + "\n";
                    fileBody += "Trials," + dataObj["ptTrials"] + "\n";
                    fileBody += "Yes Trials," + dataObj["ptYesTrials"] + "\n";
                    fileBody += "No Trials," + dataObj["ptNoTrials"] + "\n";
                    fileBody += "Context Enabled," + dataObj["ptContextEnabled"] + "\n";
                    fileBody += "Context Text," + dataObj["ptContextText"] + "\n";
                    fileBody += "Context Yes Text," + dataObj["ptContextYesText"] + "\n";
                    fileBody += "Context No Text," + dataObj["ptContextNoText"] + "\n";
                    fileBody += "\n";
                    
                    // PRETRAINING TRIALS SECTION
                    trials = (JArray)dataObj["ptTrialList"];

                    fileBody += "PRETRAINING TRIALS\n";
                    fileBody += "Phase,A,B,Type,Location,Latency,User Answer,Is Correct?,Test Type\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["location"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["test"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // PRETRAINING EVALUATION TRIALS SECTION
                    trials = (JArray)dataObj["pteTrialList"];

                    fileBody += "PRETRAINING EVALUATION TRIALS\n";
                    fileBody += "Phase,A,B,Type,Location,Latency,User Answer,Is Correct?,Test Type\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["location"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["test"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // TRAINING SECTION
                    fileBody += "TRAINING\n";
                    fileBody += "First Duration," + dataObj["tFirstDuration"] + "\n";
                    fileBody += "Second Duration," + dataObj["tSecondDuration"] + "\n";
                    fileBody += "Within Duration," + dataObj["tWithinDuration"] + "\n";
                    fileBody += "Between Duration," + dataObj["tBetweenDuration"] + "\n";
                    fileBody += "Trials," + dataObj["tTrials"] + "\n";
                    fileBody += "Simultaneous Presentation," + dataObj["tSimultaneous"] + "\n";
                    fileBody += "Location 1," + dataObj["tLocation1"] + "\n";
                    fileBody += "Location 2," + dataObj["tLocation2"] + "\n";
                    fileBody += "Location 3," + dataObj["tLocation3"] + "\n";
                    fileBody += "Location 4," + dataObj["tLocation4"] + "\n";
                    fileBody += "Location 5," + dataObj["tLocation5"] + "\n";
                    fileBody += "Location 6," + dataObj["tLocation6"] + "\n";
                    fileBody += "\n";

                    // PRETRAINING EVALUATION TRIALS SECTION
                    trials = (JArray)dataObj["tTrialList"];

                    fileBody += "TRAINING TRIALS\n";
                    fileBody += "Phase,A,B,Type,Location,Latency,User Answer,Is Correct?,Test Type\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["location"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["test"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // EVALUATION SECTION
                    fileBody += "EVALUATION\n";
                    fileBody += "First Duration," + dataObj["eFirstDuration"] + "\n";
                    fileBody += "Second Duration," + dataObj["eSecondDuration"] + "\n";
                    fileBody += "Within Duration," + dataObj["eWithinDuration"] + "\n";
                    fileBody += "Between Duration," + dataObj["eBetweenDuration"] + "\n";
                    fileBody += "Yes Trials," + dataObj["eYesTrials"] + "\n";
                    fileBody += "No Trials," + dataObj["eNoTrials"] + "\n";
                    fileBody += "Feedback Enabled," + dataObj["showFeedback"] + "\n";
                    fileBody += "Retraining Limit," + dataObj["retrainLimit"] + "\n";
                    fileBody += "Test Order," + dataObj["eTrialOrder"] + "\n";
                    fileBody += "Yes Button Location," + dataObj["yesLocation"] + "\n";
                    fileBody += "No Button Location," + dataObj["noLocation"] + "\n";
                    fileBody += "Context Enabled," + dataObj["eContextEnabled"] + "\n";
                    fileBody += "Context Text," + dataObj["eContextText"] + "\n";
                    fileBody += "Context Yes Text," + dataObj["eContextYesText"] + "\n";
                    fileBody += "Context No Text," + dataObj["eContextNoText"] + "\n\n";

                    fileBody += "Symmetry Test Enabled," + dataObj["symmEnabled"] + "\n";
                    fileBody += "Symmetry Pass Criteria," + dataObj["symmPassCriteria"] + "\n";
                    fileBody += "Symmetry Location 1," + dataObj["symmLocation1"] + "\n";
                    fileBody += "Symmetry Location 2," + dataObj["symmLocation2"] + "\n";
                    fileBody += "Symmetry Location 3," + dataObj["symmLocation3"] + "\n";
                    fileBody += "Symmetry Location 4," + dataObj["symmLocation4"] + "\n";
                    fileBody += "Symmetry Location 5," + dataObj["symmLocation5"] + "\n";
                    fileBody += "Symmetry Location 6," + dataObj["symmLocation6"] + "\n\n";

                    fileBody += "Transitivity Test Enabled," + dataObj["transEnabled"] + "\n";
                    fileBody += "Transitivity Pass Criteria," + dataObj["transPassCriteria"] + "\n";
                    fileBody += "Transitivity Location 1," + dataObj["transLocation1"] + "\n";
                    fileBody += "Transitivity Location 2," + dataObj["transLocation2"] + "\n";
                    fileBody += "Transitivity Location 3," + dataObj["transLocation3"] + "\n\n";

                    fileBody += "Equivalence Test Enabled," + dataObj["equivEnabled"] + "\n";
                    fileBody += "Equivalence Pass Criteria," + dataObj["equivPassCriteria"] + "\n";
                    fileBody += "Equivalence Location 1," + dataObj["equivLocation1"] + "\n";
                    fileBody += "Equivalence Location 2," + dataObj["equivLocation2"] + "\n";
                    fileBody += "Equivalence Location 3," + dataObj["equivLocation3"] + "\n";

                    fileBody += "\n";

                    // EVALUATION TRIALS SECTION
                    trials = (JArray)dataObj["eTrialList"];

                    fileBody += "EVALUATION TRIALS\n";
                    fileBody += "Phase,A,B,Type,Location,Latency,User Answer,Is Correct?,Test Type\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["location"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["test"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // write to App_Data
                    fileName = Server.MapPath("../Data") + "/" + currDate.ToString("yyyyMMdd") + "-" + currID + ".csv";
                    using (writer = new StreamWriter(fileName))
                    {
                        writer.WriteLine(fileBody);
                    }

                    returnVal = "Data saved successfully!";
                }
                else
                {
                    returnVal = "Invalid JSON data received. Please try again.";
                }

                Response.Write(returnVal);
            }
            catch (Exception e)
            {
                returnVal = "Error occurred while saving data: " + e.Message;
                Response.Write(returnVal);
            }
            finally
            {
                writer = null;
                dataObj = null;
                trials = null;
            }
        }

        public string readRequestStream()
        {
            var currData = "";

            if (Request.ContentLength > 0)
            {
                using (StreamReader reader = new StreamReader(Request.InputStream))
                {
                    currData = reader.ReadToEnd();
                }
            }
            return currData;
        }

        public string writeError(string str)
        {
            return "{\"error\":\"" + str + "\"}";
        }

        public string writeSuccess(string str)
        {
            return "{\"success\":\"" + str + "\"}";
        }
    }

    public class DataFile
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileExtension { get; set; }
        public string FileCreationDtm { get; set; }
    }
}
