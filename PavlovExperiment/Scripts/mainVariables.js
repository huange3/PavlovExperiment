// GLOBALS //////////////////////////////////////////////

// DOM element labels incoming...
var mainMenu = $("#main-menu");
var parameterMenu = $("#parameters-menu");
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

var firstLabel = $("#first-stimulus");
var secondLabel = $("#second-stimulus");
var nextBtn = $("#next-btn");
var yesBtn = $("#yes-btn");
var noBtn = $("#no-btn");
var responseLabel = $("#response");
var board = $("#board");

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

var participantIDLB = $("#participant-id");
var ptPassCriteriaLB = $("#pass-criteria-pt");
var ptTrialsLB = $("#trials-pt");
var ptYesTrialsLB = $("#yes-trials-pt");
var ptNoTrialsLB = $("#no-trials-pt");
var ptContextLB = $("#cues-pt");
var ptContextTextLB = $("#cue-text-pt");
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
var tInstructionsLB = $("#instructions-t");
var rtInstructionsLB = $("#instructions-rt");
var tLocation1LB = $("#training-1");
var tLocation2LB = $("#training-2");
var tLocation3LB = $("#training-3");
var tLocation4LB = $("#training-4");
var tLocation5LB = $("#training-5");
var tLocation6LB = $("#training-6");

var eFirstDurationLB = $("#first-duration-e");
var eSecondDurationLB = $("#second-duration-e");
var eWithinLB = $("#within-e");
var eBetweenLB = $("#between-e");
var eYesTrialsLB = $("#yes-trials-e");
var eNoTrialsLB = $("#no-trials-e");
var eFeedbackLB = $("#feedback");
var eTrialOrderLB = $("#trial-order");
var yesLocationLB = $("#yes-loc");
var noLocationLB = $("#no-loc");
var eContextLB = $("#cues-e");
var eContextTextLB = $("#cue-text-e");
var eContextYesLB = $("#cue-yes-e");
var eContextNoLB = $("#cue-no-e");
var eInstructionsLB = $("#instructions-e");

var symmetryLB = $("#symmetry");
var symmPassLB = $("#symmetry-pass");
var symmRetrainLB = $("#symmetry-retrain");
var symmLocation1LB = $("#symmetry-1");
var symmLocation2LB = $("#symmetry-2");
var symmLocation3LB = $("#symmetry-3");
var symmLocation4LB = $("#symmetry-4");
var symmLocation5LB = $("#symmetry-5");
var symmLocation6LB = $("#symmetry-6");

var transitivityLB = $("#transitivity");
var transPassLB = $("#transitivity-pass");
var transRetrainLB = $("#transitivity-retrain");
var transLocation1LB = $("#transitivity-1");
var transLocation2LB = $("#transitivity-2");
var transLocation3LB = $("#transitivity-3");

var equivalenceLB = $("#equivalence");
var equivPassLB = $("#equivalence-pass");
var equivRetrainLB = $("#equivalence-retrain");
var equivLocation1LB = $("#equivalence-1");
var equivLocation2LB = $("#equivalence-2");
var equivLocation3LB = $("#equivalence-3");

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

// LOCATION IDs
const Center = 1;
const TopLeft = 2;
const TopRight = 3;
const BottomLeft = 4;
const BottomRight = 5;

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
var stimulusList = [];
var currInstructionText = "";
var stopWatch = new clsStopwatch();
var pretrainingTrials = [];
var pretrainingEvalTrials = [];
var trainingTrials = [];
var evaluationTrials = [];
var retrainingTrials = [];