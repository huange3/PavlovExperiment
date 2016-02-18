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
            JArray locations = null;
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
                    fileName = Server.MapPath("../Data") + "/" + currDate.ToString("yyyyMMdd-hhmmss") + "-" + currID + ".json";
                    using (writer = new StreamWriter(fileName))
                    {
                        writer.WriteLine(currJSON);
                    }

                    System.IO.File.SetCreationTime(fileName, currDate);

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
                    fileBody += "Stimulus Trials," + dataObj["ptTrials"] + "\n";
                    fileBody += "Yes Set Trials," + dataObj["ptYesTrials"] + "\n";
                    fileBody += "No Set Trials," + dataObj["ptNoTrials"] + "\n";
                    fileBody += "Context Enabled," + dataObj["ptContextEnabled"] + "\n";
                    fileBody += "Context Location," + dataObj["ptContextLoc"] + "\n";
                    fileBody += "Context Text," + dataObj["ptContextText"] + "\n";
                    fileBody += "Context Yes Text," + dataObj["ptContextYesText"] + "\n";
                    fileBody += "Context No Text," + dataObj["ptContextNoText"] + "\n";
                    fileBody += "\n";

                    // PRETRAINING STIMULI AND LOCATIONS SECTION
                    locations = (JArray)dataObj["ptYesPairs"];

                    fileBody += "PRETRAINING YES STIMULI\n";
                    fileBody += "A,B,Type,A Location,B Location\n";

                    for (var i = 0; i < locations.Count; i++)
                    {
                        fileBody += locations[i]["A"] + ",";
                        fileBody += locations[i]["B"] + ",";
                        fileBody += locations[i]["type"] + ",";
                        fileBody += locations[i]["ALocation"] + ",";
                        fileBody += locations[i]["BLocation"] + ",";
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // PRETRAINING STIMULI AND LOCATIONS SECTION
                    locations = (JArray)dataObj["ptNoPairs"];

                    fileBody += "PRETRAINING NO STIMULI\n";
                    fileBody += "A,B,Type,A Location,B Location\n";

                    for (var i = 0; i < locations.Count; i++)
                    {
                        fileBody += locations[i]["A"] + ",";
                        fileBody += locations[i]["B"] + ",";
                        fileBody += locations[i]["type"] + ",";
                        fileBody += locations[i]["ALocation"] + ",";
                        fileBody += locations[i]["BLocation"] + ",";
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // PRETRAINING TRIALS SECTION
                    trials = (JArray)dataObj["ptTrialList"];

                    fileBody += "PRETRAINING TRIALS\n";
                    fileBody += "Phase,A,B,Type,A Location,B Location,Latency,User Answer,Is Correct?,Test Type,Test Name,Notes\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["ALocation"] + ",";
                        fileBody += trials[i]["BLocation"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["testID"] + ",";
                        fileBody += trials[i]["testDesc"] + ",";
                        fileBody += trials[i]["notes"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // PRETRAINING EVALUATION TRIALS SECTION
                    trials = (JArray)dataObj["pteTrialList"];

                    fileBody += "PRETRAINING EVALUATION TRIALS\n";
                    fileBody += "Phase,A,B,Type,A Location,B Location,Latency,User Answer,Is Correct?,Test Type,Test Name,Notes\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["ALocation"] + ",";
                        fileBody += trials[i]["BLocation"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["testID"] + ",";
                        fileBody += trials[i]["testDesc"] + ",";
                        fileBody += trials[i]["notes"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // TRAINING SECTION
                    fileBody += "TRAINING\n";
                    fileBody += "First Duration," + dataObj["tFirstDuration"] + "\n";
                    fileBody += "Second Duration," + dataObj["tSecondDuration"] + "\n";
                    fileBody += "Within Duration," + dataObj["tWithinDuration"] + "\n";
                    fileBody += "Between Duration," + dataObj["tBetweenDuration"] + "\n";
                    fileBody += "Stimulus Trials," + dataObj["tTrials"] + "\n";
                    fileBody += "Simultaneous Presentation," + dataObj["tSimultaneous"] + "\n";
                    fileBody += "Context Enabled," + dataObj["tContextEnabled"] + "\n";
                    fileBody += "Context Location," + dataObj["tContextLoc"] + "\n";
                    fileBody += "Context Text," + dataObj["tContextText"] + "\n";
                    fileBody += "Context Yes Text," + dataObj["tContextYesText"] + "\n";
                    fileBody += "Context No Text," + dataObj["tContextNoText"] + "\n";
                    fileBody += "\n";

                    // TRAINING STIMULI SECTION
                    locations = (JArray)dataObj["stimuliSets"];

                    fileBody += "TRAINING STIMULI\n";
                    fileBody += "A,B,C,Type,A Location,B Location,C Location\n";

                    for (var i = 0; i < locations.Count; i++)
                    {
                        fileBody += locations[i]["A"] + ",";
                        fileBody += locations[i]["B"] + ",";
                        fileBody += locations[i]["C"] + ",";
                        fileBody += locations[i]["type"] + ",";
                        fileBody += locations[i]["ALocation"] + ",";
                        fileBody += locations[i]["BLocation"] + ",";
                        fileBody += locations[i]["CLocation"] + ",";
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // TRAINING TRIALS SECTION
                    trials = (JArray)dataObj["tTrialList"];

                    fileBody += "TRAINING TRIALS\n";
                    fileBody += "Phase,A,B,Type,A Location,B Location,Latency,User Answer,Is Correct?,Test Type,Test Name,Notes\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["ALocation"] + ",";
                        fileBody += trials[i]["BLocation"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["testID"] + ",";
                        fileBody += trials[i]["testDesc"] + ",";
                        fileBody += trials[i]["notes"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // EVALUATION SECTION
                    fileBody += "EVALUATION\n";
                    fileBody += "First Duration," + dataObj["eFirstDuration"] + "\n";
                    fileBody += "Second Duration," + dataObj["eSecondDuration"] + "\n";
                    fileBody += "Within Duration," + dataObj["eWithinDuration"] + "\n";
                    fileBody += "Between Duration," + dataObj["eBetweenDuration"] + "\n";
                    fileBody += "Feedback Enabled," + dataObj["showFeedback"] + "\n";
                    fileBody += "Retraining Limit," + dataObj["retrainLimit"] + "\n";
                    fileBody += "Test Order," + dataObj["eTrialOrder"] + "\n";
                    fileBody += "Yes Button Location," + dataObj["yesLocation"] + "\n";
                    fileBody += "No Button Location," + dataObj["noLocation"] + "\n";
                    fileBody += "Context Enabled," + dataObj["eContextEnabled"] + "\n";
                    fileBody += "Context Text," + dataObj["eContextText"] + "\n";
                    fileBody += "Context Location," + dataObj["eContextLoc"] + "\n";
                    fileBody += "Context Yes Text," + dataObj["eContextYesText"] + "\n";
                    fileBody += "Context No Text," + dataObj["eContextNoText"] + "\n\n";

                    fileBody += "Symmetry Test Enabled," + dataObj["symmEnabled"] + "\n";
                    fileBody += "Symmetry Pass Criteria," + dataObj["symmPassCriteria"] + "\n";
                    fileBody += "Symmetry Yes Set Trials," + dataObj["symmYesTrials"] + "\n";
                    fileBody += "Symmetry No Set Trials," + dataObj["symmNoTrials"] + "\n";

                    locations = (JArray)dataObj["symmLocations"];

                    for (int i = 0, j = 0; i < 3; i++, j += 2)
                    {
                        fileBody += "B" + (i + 1) + " Location," + locations[j]["ALocation"] + "\n";
                        fileBody += "A" + (i + 1) + " Location," + locations[j]["BLocation"] + "\n";
                        fileBody += "C" + (i + 1) + " Location," + locations[j + 1]["ALocation"] + "\n";
                        fileBody += "B" + (i + 1) + " Location," + locations[j + 1]["BLocation"] + "\n";
                    }

                    fileBody += "\n";

                    fileBody += "Transitivity Test Enabled," + dataObj["transEnabled"] + "\n";
                    fileBody += "Transitivity Pass Criteria," + dataObj["transPassCriteria"] + "\n";
                    fileBody += "Transitivity Yes Set Trials," + dataObj["transYesTrials"] + "\n";
                    fileBody += "Transitivity No Set Trials," + dataObj["transNoTrials"] + "\n";

                    locations = (JArray)dataObj["transLocations"];

                    for (int i = 0; i < locations.Count; i++)
                    {
                        fileBody += "A" + (i + 1) + " Location," + locations[i]["ALocation"] + "\n";
                        fileBody += "C" + (i + 1) + " Location," + locations[i]["BLocation"] + "\n";
                    }

                    fileBody += "\n";

                    fileBody += "Equivalence Test Enabled," + dataObj["equivEnabled"] + "\n";
                    fileBody += "Equivalence Pass Criteria," + dataObj["equivPassCriteria"] + "\n";
                    fileBody += "Equivalence Yes Set Trials," + dataObj["equivYesTrials"] + "\n";
                    fileBody += "Equivalence No Set Trials," + dataObj["equivNoTrials"] + "\n";

                    locations = (JArray)dataObj["equivLocations"];

                    for (int i = 0; i < locations.Count; i++)
                    {
                        fileBody += "C" + (i + 1) + " Location," + locations[i]["ALocation"] + "\n";
                        fileBody += "A" + (i + 1) + " Location," + locations[i]["BLocation"] + "\n";
                    }

                    fileBody += "\n";

                    fileBody += "\n";

                    // EVALUATION TRIALS SECTION
                    trials = (JArray)dataObj["eTrialList"];

                    fileBody += "EVALUATION TRIALS\n";
                    fileBody += "Phase,A,B,Type,A Location,B Location,Latency,User Answer,Is Correct?,Test Type,Test Name,Notes\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["ALocation"] + ",";
                        fileBody += trials[i]["BLocation"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["testID"] + ",";
                        fileBody += trials[i]["testDesc"] + ",";
                        fileBody += trials[i]["notes"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // RETRAINING TRIALS SECTION
                    trials = (JArray)dataObj["rtTrialList"];

                    fileBody += "RETRAINING TRIALS\n";
                    fileBody += "Phase,A,B,Type,A Location,B Location,Latency,User Answer,Is Correct?,Test Type,Test Name,Notes\n";

                    for (var i = 0; i < trials.Count; i++)
                    {
                        fileBody += trials[i]["phase"] + ",";
                        fileBody += trials[i]["A"] + ",";
                        fileBody += trials[i]["B"] + ",";
                        fileBody += trials[i]["type"] + ",";
                        fileBody += trials[i]["ALocation"] + ",";
                        fileBody += trials[i]["BLocation"] + ",";
                        fileBody += trials[i]["latency"] + ",";
                        fileBody += trials[i]["userAnswer"] + ",";
                        fileBody += trials[i]["isCorrect"] + ",";
                        fileBody += trials[i]["testID"] + ",";
                        fileBody += trials[i]["testDesc"] + ",";
                        fileBody += trials[i]["notes"];
                        fileBody += "\n";
                    }

                    fileBody += "\n";

                    // write to App_Data
                    fileName = Server.MapPath("../Data") + "/" + currDate.ToString("yyyyMMdd-hhmmss") + "-" + currID + ".csv";
                    using (writer = new StreamWriter(fileName))
                    {
                        writer.WriteLine(fileBody);
                    }

                    System.IO.File.SetCreationTime(fileName, currDate);

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
