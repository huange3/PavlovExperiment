// GLOBALS ////////////////////*//////////////////////////

// DOM element labels incoming...
var mainMenu = $("#main-menu");
var parameterMenu = $("#parameters-menu");
var dataMenu = $("#data-menu");
var goBackBtn = $("#go-back");
var parameterBtn = $("#parameters");
var dataLogBtn = $("#data-log");
var startExpBtn = $("#start-experiment");
var popup = $("#popup");
var popupText = $("#popup-text");
var popupClose = $("#close-popup");
var instruction = $("#instruction");
var instructionText = $("#instruction-text");
var instructionClose = $("#start-btn");
var spinner = $(".loading");
var tableEnd = $("#data-table > tbody:last");

var firstLabel = $("#first-stimulus");
var secondLabel = $("#second-stimulus");
var nextBtn = $("#next-btn");
var yesBtn = $("#yes-btn");
var noBtn = $("#no-btn");
var responseLabel = $("#response");
var board = $("#board");
var contextCueLabel = $("#context-cue");

var menuGeneralItem = $("#general-item");
var menuPretrainingItem = $("#pretraining-item");
var menuTrainingItem = $("#training-item");
var menuEvaluationItem = $("#evaluation-item");

var parmSaveBtn = $("#parm-save");
var parmCancelBtn = $("#parm-cancel");
var generalParm = $("#general-parm");
var pretrainingParm = $("#pretraining-parm");
var trainingParm = $("#training-parm");
var evaluationParm = $("#evaluation-parm");
var parmArray = [generalParm, pretrainingParm, trainingParm, evaluationParm];

var versionLB = $("#version");
var participantIDLB = $("#participant-id");

var ptFirstDurationLB = $("#first-duration-pt");
var ptSecondDurationLB = $("#second-duration-pt");
var ptWithinLB = $("#within-pt");
var ptBetweenLB = $("#between-pt");
var ptPassCriteriaLB = $("#pass-criteria-pt");
var ptTrialsLB = $("#trials-pt");
var ptYesTrialsLB = $("#yes-trials-pt");
var ptNoTrialsLB = $("#no-trials-pt");
var ptContextLB = $("#cues-pt");
var ptContextTextLB = $("#cue-text-pt");
var ptContextLocLB = $("#cue-location-pt");
var ptContextYesLB = $("#cue-yes-pt");
var ptContextNoLB = $("#cue-no-pt");
var ptInstructionsLB = $("#instructions-pt");
var ptInstructionsEvalLB = $("#instructions-pte");

var tFirstDurationLB = $("#first-duration-t");
var tSecondDurationLB = $("#second-duration-t");
var tWithinLB = $("#within-t");
var tBetweenLB = $("#between-t");
var tTrialsLB = $("#trials-t");
var tSimultaneousLB = $("#simultaneous-t");
var tContextLB = $("#cues-t");
var tContextTextLB = $("#cue-text-t");
var tContextLocLB = $("#cue-location-t");
var tContextYesLB = $("#cue-yes-t");
var tContextNoLB = $("#cue-no-t");
var tInstructionsLB = $("#instructions-t");
var rtInstructionsLB = $("#instructions-rt");

var eFirstDurationLB = $("#first-duration-e");
var eSecondDurationLB = $("#second-duration-e");
var eWithinLB = $("#within-e");
var eBetweenLB = $("#between-e");

var eFeedbackLB = $("#feedback");
var eTrialOrderLB = $("#trial-order");
var yesLocationLB = $("#yes-loc");
var noLocationLB = $("#no-loc");
var eContextLB = $("#cues-e");
var eContextTextLB = $("#cue-text-e");
var eContextLocLB = $("#cue-location-e");
var eContextYesLB = $("#cue-yes-e");
var eContextNoLB = $("#cue-no-e");
var eInstructionsLB = $("#instructions-e");
var retrainLB = $("#retrain-limit");

var symmetryLB = $("#symmetry");
var symmPassLB = $("#symmetry-pass");
var symmYesTrialsLB = $("#yes-trials-symmetry");
var symmNoTrialsLB = $("#no-trials-symmetry");

var transitivityLB = $("#transitivity");
var transPassLB = $("#transitivity-pass");
var transYesTrialsLB = $("#yes-trials-transitivity");
var transNoTrialsLB = $("#no-trials-transitivity");

var equivalenceLB = $("#equivalence");
var equivPassLB = $("#equivalence-pass");
var equivYesTrialsLB = $("#yes-trials-equivalence");
var equivNoTrialsLB = $("#no-trials-equivalence");

// MENU IDs
const GeneralID = 0;
const PretrainingID = 1;
const TrainingID = 2;
const EvaluationID = 3;

// MODE IDs
const PretrainingMode = 1;
const TrainingMode = 2;
const EvaluationMode = 3;
const FullMode = 4;

// PHASE IDs
const PretrainingPhase = 1;
const PretrainingEvalPhase = 2;
const TrainingPhase = 3;
const EvaluationPhase = 4;
const RetrainingPhase = 5;

// TEST IDs
const SymmetryID = 1;
const TransitivityID = 2;
const EquivalenceID = 3;

// TEST ORDER IDs
const Sequential = 1;
const Mixed = 2;

// LOCATION IDs
const Center = 1;
const TopLeft = 2;
const TopRight = 3;
const BottomLeft = 4;
const BottomRight = 5;
const RandomLocation = 6;
const TopCenter = 7;
const BottomCenter = 8;

// STIMULI ROW COUNTS
const PretrainingRows = 7;
const TrainingRows = 3;
const SymmetryRows = 6;
const TransitivityRows = 3;
const EquivalenceRows = 3;

// TIMER INTERVALS
var firstDuration = 0;
var secondDuration = 0;
var withinDuration = 0;
var betweenDuration = 0;
var latency = 0;

// EXPERIMENT VARIABLES
var currPhase = 0;
var currTrial;
var currStimulus;
var currTest;
var currPassCriteria;
var stimulusList = [];
var testList = [];
var currInstructionText = "";
var stopWatch = new clsStopwatch();
var pretrainingTrials = [];
var pretrainingEvalTrials = [];
var trainingTrials = [];
var evaluationTrials = [];
var retrainingTrials = [];
var symmStimulusList = [];
var transStimulusList = [];
var equivStimulusList = [];
var correctCount = 0;
var phaseTrialCount = 0;
var symmTrialCount = 0;
var symmCorrectCount = 0;
var transTrialCount = 0;
var transCorrectCount = 0;
var equivTrialCount = 0;
var equivCorrectCount = 0;
var retrainCount = 0;
var currDataLog;

// STIMULUS POOL
//var stimPool = [
//    ["CUZ", "PIP", "FIP"],
//    ["ZAC", "DUZ", "VAM"],
//    ["ZID", "JOM", "XAD"]
//];