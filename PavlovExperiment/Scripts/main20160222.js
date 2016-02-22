
var currExp = {
    "version": "",
    "date": "",
    "id": "",
    "mode": "",
    // PRETRAINING PARAMETERS
    "ptFirstDuration": "",
    "ptSecondDuration": "",
    "ptWithinDuration": "",
    "ptBetweenDuration": "",
    "ptPassCriteria": "",
    "ptTrials": "",
    "ptYesTrials": "",
    "ptNoTrials": "",
    "ptContextEnabled": "",
    "ptContextText": "",
    "ptContextLoc": "",
    "ptContextYesText": "",
    "ptContextNoText": "",
    "ptInstructionText": "",
    "ptInstructionEvalText": "",
    "ptYesPairs": [],
    "ptNoPairs": [],
    // TRAINING PARAMETERS
    "tFirstDuration": "",
    "tSecondDuration": "",
    "tWithinDuration": "",
    "tBetweenDuration": "",
    "tTrials": "",
    "tSimultaneous": "",
    "tContextEnabled": "",
    "tContextText": "",
    "tContextLoc": "",
    "tContextYesText": "",
    "tContextNoText": "",
    "tInstructionText": "",
    "rtInstructionText": "",
    "stimuliSets": [],
    // EVALUATION PARAMETERS
    "eFirstDuration": "",
    "eSecondDuration": "",
    "eWithinDuration": "",
    "eBetweenDuration": "",
    "showFeedback": "",
    "retrainLimit": "",
    "symmEnabled": "",
    "symmPassCriteria": "",
    "symmYesTrials": "",
    "symmNoTrials": "",
    "symmLocations": [],
    "transEnabled": "",
    "transPassCriteria": "",
    "transYesTrials": "",
    "transNoTrials": "",
    "transLocations": [],
    "equivEnabled": "",
    "equivPassCriteria": "",
    "equivYesTrials": "",
    "equivNoTrials": "",
    "equivLocations": [],
    "eTrialOrder": "",
    "yesLocation": "",
    "noLocation": "",
    "eContextEnabled": "",
    "eContextText": "",
    "eContextLoc": "",
    "eContextYesText": "",
    "eContextNoText": "",
    "eInstructionText": "",
    "ptTrialList": "",
    "pteTrialList": "",
    "tTrialList": "",
    "eTrialList": "",
    "rtTrialList": ""
};

var trialObj = {
    "phase": "",
    "A": "",
    "B": "",
    "type": "",
    "ALocation": "",
    "BLocation": "",
    "latency": "",
    "userAnswer": "",
    "isCorrect": "",
    "testID": "",
    "testDesc": "",
    "notes": ""
};



// DOM EVENT HANDLING //////////////////////////////////////////////

parameterBtn.click(showParameterMenu);

parmSaveBtn.click(saveParameters);

parmCancelBtn.click(hideParameterMenu);

menuGeneralItem.click(function () {
    showParms(GeneralID);
});

menuPretrainingItem.click(function () {
    showParms(PretrainingID);
});

menuTrainingItem.click(function () {
    showParms(TrainingID);
});

menuEvaluationItem.click(function () {
    showParms(EvaluationID);
});

popupClose.click(function () {
    popup.toggleClass("show");
})

startExpBtn.click(runExperiment);

instructionClose.click(function () {
    instruction.toggleClass("show");

    if (currPhase == EvaluationPhase) {
        if (currExp.eTrialOrder == Mixed) {
            runEvaluationTrialMixed();
        } else {
            runEvaluationTrial();
        }       
    } else {
        runTrial();
    }
});

nextBtn.click(nextBtnClick);

yesBtn.click(function () {
    stopWatch.stop();
    checkFeedback(1);
});

noBtn.click(function () {
    stopWatch.stop();
    checkFeedback(0)
});

dataLogBtn.click(loadData);

goBackBtn.click(function () {
    dataMenu.hide();
    mainMenu.show();
})

// FUNCTION DEFINITIONS //////////////////////////////////////////////

function hideParameterMenu() {
    parameterMenu.hide();
    mainMenu.show();   
}

function showParameterMenu() {
    spinner.show();

    $.when(loadParameters()).done(function () {
        spinner.hide();
        mainMenu.hide();
        parameterMenu.show();
        showParms(GeneralID);
    });
};

function showParms(currID) {
    for (var i = 0; i < parmArray.length; i++) {
        if (i == currID) {
            parmArray[i].show();
        } else {
            parmArray[i].hide();
        }
    }
}

function loadParameters() {
    //var currObj = localStorage.getObject("experiment");
    var currObj = null;

    return $.get("../Data/LoadSettings", function (data) {
        if (data != null) currObj = data;

        console.log(currObj);

        if (currObj == null) {
            // load the default settings
            currExp.mode = FullMode;
            currExp.ptFirstDuration = 1.0;
            currExp.ptSecondDuration = 1.0;
            currExp.ptWithinDuration = 0.5;
            currExp.ptBetweenDuration = 3.0;
            currExp.ptPassCriteria = 0.90;
            currExp.ptTrials = 2;
            currExp.ptYesTrials = 2;
            currExp.ptNoTrials = 2;
            currExp.ptContextEnabled = false;
            currExp.ptInstructionText = $("#instructions-pt").val();
            currExp.ptInstructionEvalText = $("#instructions-pte").val();
            currExp.ptYesPairs = [];
            currExp.ptNoPairs = [];

            currExp.tFirstDuration = 1.0;
            currExp.tSecondDuration = 1.0;
            currExp.tWithinDuration = 0.5;
            currExp.tBetweenDuration = 3.0;
            currExp.tTrials = 20;
            currExp.tSimultaneous = false;
            currExp.tContextEnabled = false;
            currExp.tInstructionText = $("#instructions-t").val();
            currExp.rtInstructionText = $("instructions-rt").val();
            currExp.stimuliSets = [];

            currExp.eFirstDuration = 1.0;
            currExp.eSecondDuration = 1.0;
            currExp.eWithinDuration = 0.5;
            currExp.eBetweenDuration = 3.0;
            currExp.showFeedback = false;
            currExp.retrainLimit = 3;
            currExp.symmEnabled = true;
            currExp.symmPassCriteria = 0.90;
            currExp.symmYesTrials = 3;
            currExp.symmNoTrials = 3;
            currExp.symmLocations = [];

            currExp.transEnabled = true;
            currExp.transPassCriteria = 0.90;
            currExp.transYesTrials = 3;
            currExp.transNoTrials = 3;
            currExp.transLocations = [];

            currExp.equivEnabled = true;
            currExp.equivPassCriteria = 0.90;
            currExp.equivYesTrials = 3;
            currExp.equivNoTrials = 3;
            currExp.equivLocations = [];

            currExp.eTrialOrder = 1;
            currExp.yesLocation = 4;
            currExp.noLocation = 5;
            currExp.eContextEnabled = false;
            currExp.eInstructionText = $("#instructions-e").val();
        } else {
            currExp = currObj;
        }

        mapParameters();

        spinner.hide();
    });
}

function mapParameters() {
    var firstStim = "";
    var firstLoc = "";
    var secStim = "";
    var secLoc = "";
    var thirdStim = "";
    var thirdLoc = "";

    // GENERAL
    $("input:radio[name=mode][value=" + currExp.mode + "]").prop("checked", true);
    participantIDLB.val(currExp.id);

    // PRETRAINING 
    ptFirstDurationLB.val(currExp.ptFirstDuration);
    ptSecondDurationLB.val(currExp.ptSecondDuration);
    ptWithinLB.val(currExp.ptWithinDuration);
    ptBetweenLB.val(currExp.ptBetweenDuration);
    ptPassCriteriaLB.val(currExp.ptPassCriteria);
    ptTrialsLB.val(currExp.ptTrials);
    ptYesTrialsLB.val(currExp.ptYesTrials);
    ptNoTrialsLB.val(currExp.ptNoTrials);

    if (currExp.ptContextEnabled) {
        ptContextLB.prop("checked", true);
    } else {
        ptContextLB.prop("checked", false);
    }

    ptContextTextLB.val(currExp.ptContextText);

    $('#cue-location-pt option[value="' + currExp.ptContextLoc + '"]').prop("selected", true);

    ptContextYesLB.val(currExp.ptContextYesText);
    ptContextNoLB.val(currExp.ptContextNoText);
    ptInstructionsLB.val(currExp.ptInstructionText);
    ptInstructionsEvalLB.val(currExp.ptInstructionEvalText);

    if (currExp.ptYesPairs != null && currExp.ptYesPairs.length > 0) {
        // Pretraining YES Pairs
        for (var i = 1; i <= PretrainingRows; i++) {
            firstStim = currExp.ptYesPairs[i - 1].A;
            secStim = currExp.ptYesPairs[i - 1].B;

            firstLoc = currExp.ptYesPairs[i - 1].ALocation;
            secLoc = currExp.ptYesPairs[i - 1].BLocation;

            $("#ptYes-" + i + "-1").val(firstStim);
            $("#ptYes-" + i + "-2").val(secStim);

            $('#ptYes-loc-' + i + '-1 option[value="' + firstLoc + '"]').prop("selected", true);
            $('#ptYes-loc-' + i + '-2 option[value="' + secLoc + '"]').prop("selected", true);
        }
    } else {
        currExp.ptYesPairs = [];
    }

    if (currExp.ptNoPairs != null && currExp.ptNoPairs.length > 0) {
        // Pretraining NO Pairs
        for (var i = 1; i <= PretrainingRows; i++) {
            firstStim = currExp.ptNoPairs[i - 1].A;
            secStim = currExp.ptNoPairs[i - 1].B;

            firstLoc = currExp.ptNoPairs[i - 1].ALocation;
            secLoc = currExp.ptNoPairs[i - 1].BLocation;

            $("#ptNo-" + i + "-1").val(firstStim);                                          
            $("#ptNo-" + i + "-2").val(secStim);

            $('#ptNo-loc-' + i + '-1 option[value="' + firstLoc + '"]').prop("selected", true);
            $('#ptNo-loc-' + i + '-2 option[value="' + secLoc + '"]').prop("selected", true);
        }
    } else {
        currExp.ptNoPairs = [];
    }

    // TRAINING
    tFirstDurationLB.val(currExp.tFirstDuration);
    tSecondDurationLB.val(currExp.tSecondDuration);
    tWithinLB.val(currExp.tWithinDuration);
    tBetweenLB.val(currExp.tBetweenDuration);
    tTrialsLB.val(currExp.tTrials);

    if (currExp.tSimultaneous) {
        tSimultaneousLB.prop("checked", true);
    } else {
        tSimultaneousLB.prop("checked", false);
    }

    if (currExp.tContextEnabled) {
        tContextLB.prop("checked", true);
    } else {
        tContextLB.prop("checked", false);
    }

    tContextTextLB.val(currExp.tContextText);

    $('#cue-location-t option[value="' + currExp.tContextLoc + '"]').prop("selected", true);

    tContextYesLB.val(currExp.tContextYesText);
    tContextNoLB.val(currExp.tContextNoText);

    tInstructionsLB.val(currExp.tInstructionText);
    rtInstructionsLB.val(currExp.rtInstructionText);

    if (currExp.stimuliSets != null && currExp.stimuliSets.length > 0) {
        for (var i = 1; i <= TrainingRows; i++) {
            firstStim = currExp.stimuliSets[i - 1].A;
            secStim = currExp.stimuliSets[i - 1].B;
            thirdStim = currExp.stimuliSets[i - 1].C;

            firstLoc = currExp.stimuliSets[i - 1].ALocation;
            secLoc = currExp.stimuliSets[i - 1].BLocation;
            thirdLoc = currExp.stimuliSets[i - 1].CLocation;

            $("#training-" + i + "-1").val(firstStim);
            $("#training-" + i + "-2").val(secStim);
            $("#training-" + i + "-3").val(thirdStim);

            $('#training-' + i + '-loc-1 option[value="' + firstLoc + '"]').prop("selected", true);
            $('#training-' + i + '-loc-2 option[value="' + secLoc + '"]').prop("selected", true);
            $('#training-' + i + '-loc-3 option[value="' + thirdLoc + '"]').prop("selected", true);
        }
    } else {
        currExp.stimuliSets = [];
    }

    // EVALUATION
    eFirstDurationLB.val(currExp.eFirstDuration);
    eSecondDurationLB.val(currExp.eSecondDuration);
    eWithinLB.val(currExp.eWithinDuration);
    eBetweenLB.val(currExp.eBetweenDuration);
    
    $('#trial-order option[value="' + currExp.eTrialOrder + '"]').prop("selected", true);
    $('#yes-loc option[value="' + currExp.yesLocation + '"]').prop("selected", true);
    $('#no-loc option[value="' + currExp.noLocation + '"]').prop("selected", true);

    if (currExp.eContextEnabled) {
        eContextLB.prop("checked", true);
    } else {
        eContextLB.prop("checked", false);
    }

    eContextTextLB.val(currExp.eContextText);
    $('#cue-location-e option[value="' + currExp.eContextLoc + '"]').prop("selected", true);
    eContextYesLB.val(currExp.eContextYesText);
    eContextNoLB.val(currExp.eContextNoText);
    eInstructionsLB.val(currExp.eInstructionText);
    retrainLB.val(currExp.retrainLimit);

    if (currExp.showFeedback) {
        eFeedbackLB.prop("checked", true);
    } else {
        eFeedbackLB.prop("checked", false);
    }

    // Remember, only the pair locations are saved for the Evaluation phase
    // The stimuli pair values are obtained from the Training phase stimuli set

    if (currExp.symmEnabled) {
        symmetryLB.prop("checked", true);
    } else {
        symmetryLB.prop("checked", false);
    }

    symmPassLB.val(currExp.symmPassCriteria);
    symmYesTrialsLB.val(currExp.symmYesTrials);
    symmNoTrialsLB.val(currExp.symmNoTrials);

    // Symmetry pair locations
    if (currExp.symmLocations != null && currExp.symmLocations.length > 0) {
        for (var i = 1; i <= SymmetryRows; i++) {
            firstLoc = currExp.symmLocations[i - 1].ALocation;
            secLoc = currExp.symmLocations[i - 1].BLocation;

            $('#symmetry-' + i + '-1 option[value="' + firstLoc + '"]').prop("selected", true);
            $('#symmetry-' + i + '-2 option[value="' + secLoc + '"]').prop("selected", true);
        }
    } else {
        currExp.symmLocations = [];
    }

    if (currExp.transEnabled) {
        transitivityLB.prop("checked", true);
    } else {
        transitivityLB.prop("checked", false);
    }

    transPassLB.val(currExp.transPassCriteria);
    transYesTrialsLB.val(currExp.transYesTrials);
    transNoTrialsLB.val(currExp.transNoTrials);

    // Transitivity pair locations
    if (currExp.transLocations != null && currExp.transLocations.length > 0) {
        for (var i = 1; i <= TransitivityRows; i++) {
            firstLoc = currExp.transLocations[i - 1].ALocation;
            secLoc = currExp.transLocations[i - 1].BLocation;

            $('#transitivity-' + i + '-1 option[value="' + firstLoc + '"]').prop("selected", true);
            $('#transitivity-' + i + '-2 option[value="' + secLoc + '"]').prop("selected", true);
        }
    } else {
        currExp.transLocations = [];
    }

    if (currExp.equivEnabled) {
        equivalenceLB.prop("checked", true);
    } else {
        equivalenceLB.prop("checked", false);
    }

    equivPassLB.val(currExp.equivPassCriteria);
    equivYesTrialsLB.val(currExp.equivYesTrials);
    equivNoTrialsLB.val(currExp.equivNoTrials);

    // Equivalence pair locations
    if (currExp.equivLocations != null && currExp.equivLocations.length > 0) {
        for (var i = 1; i <= EquivalenceRows; i++) {
            firstLoc = currExp.equivLocations[i - 1].ALocation;
            secLoc = currExp.equivLocations[i - 1].BLocation;

            $('#equivalence-' + i + '-1 option[value="' + firstLoc + '"]').prop("selected", true);
            $('#equivalence-' + i + '-2 option[value="' + secLoc + '"]').prop("selected", true);
        }
    } else {
        currExp.equivLocations = [];
    }

    //console.log(currExp);
}

function saveParameters() {
    var firstStim = "";
    var secStim = "";
    var firstLoc = "";
    var secLoc = "";
    var thirdStim = "";
    var thirdLoc = "";
    var currJSON = "";

    currExp.version = versionLB.val();
    currExp.id = participantIDLB.val();
    currExp.mode = $("input:radio[name=mode]:checked").val();

    // PRETRAINING
    currExp.ptFirstDuration = ptFirstDurationLB.val();
    currExp.ptSecondDuration = ptSecondDurationLB.val();
    currExp.ptWithinDuration = ptWithinLB.val();
    currExp.ptBetweenDuration = ptBetweenLB.val();
    currExp.ptPassCriteria = ptPassCriteriaLB.val();
    currExp.ptTrials = ptTrialsLB.val();
    currExp.ptYesTrials = ptYesTrialsLB.val();
    currExp.ptNoTrials = ptNoTrialsLB.val();
    currExp.ptContextEnabled = ptContextLB.is(":checked");
    currExp.ptContextText = ptContextTextLB.val();
    currExp.ptContextLoc = ptContextLocLB.val();
    currExp.ptContextYesText = ptContextYesLB.val();
    currExp.ptContextNoText = ptContextNoLB.val();
    currExp.ptInstructionText = ptInstructionsLB.val();
    currExp.ptInstructionEvalText = ptInstructionsEvalLB.val();

    // Pretraining YES pairs
    currExp.ptYesPairs.length = 0;

    for (var i = 1; i <= PretrainingRows; i++){
        firstStim = $("#ptYes-" + i + "-1").val();
        secStim = $("#ptYes-" + i + "-2").val();

        firstLoc = $("#ptYes-loc-" + i + "-1").val();
        secLoc = $("#ptYes-loc-" + i + "-2").val();

        currExp.ptYesPairs.push({
            "A": firstStim,
            "ALocation": firstLoc,
            "B": secStim,
            "BLocation": secLoc,
            "type": 1,
            "testID": ""
        });
    }

    // Pretraining NO pairs
    currExp.ptNoPairs.length = 0;

    for (var i = 1; i <= PretrainingRows; i++) {
        firstStim = $("#ptNo-" + i + "-1").val();
        secStim = $("#ptNo-" + i + "-2").val();

        firstLoc = $("#ptNo-loc-" + i + "-1").val();
        secLoc = $("#ptNo-loc-" + i + "-2").val();

        currExp.ptNoPairs.push({
            "A": firstStim,
            "ALocation": firstLoc,
            "B": secStim,
            "BLocation": secLoc,
            "type": 0,
            "testID": ""          
        });
    }

    // TRAINING
    currExp.tFirstDuration = tFirstDurationLB.val();
    currExp.tSecondDuration = tSecondDurationLB.val();
    currExp.tWithinDuration = tWithinLB.val();
    currExp.tBetweenDuration = tBetweenLB.val();
    currExp.tTrials = tTrialsLB.val();
    currExp.tSimultaneous = tSimultaneousLB.is(":checked");
    currExp.tContextEnabled = tContextLB.is(":checked");
    currExp.tContextText = tContextTextLB.val();
    currExp.tContextLoc = tContextLocLB.val();
    currExp.tContextYesText = tContextYesLB.val();
    currExp.tContextNoText = tContextNoLB.val();
    currExp.tInstructionText = tInstructionsLB.val();
    currExp.rtInstructionText = rtInstructionsLB.val();

    currExp.stimuliSets.length = 0;

    for (var i = 1; i <= TrainingRows; i++) {
        firstStim = $("#training-" + i + "-1").val();
        secStim = $("#training-" + i + "-2").val();
        thirdStim = $("#training-" + i + "-3").val();

        firstLoc = $("#training-" + i + "-loc-1").val();
        secLoc = $("#training-" + i + "-loc-2").val();
        thirdLoc = $("#training-" + i + "-loc-3").val();

        currExp.stimuliSets.push({
            "A": firstStim,
            "ALocation": firstLoc,
            "B": secStim,
            "BLocation": secLoc,
            "C": thirdStim,
            "CLocation": thirdLoc
        });
    }

    // EVALUATION
    currExp.eFirstDuration = eFirstDurationLB.val();
    currExp.eSecondDuration = eSecondDurationLB.val();
    currExp.eWithinDuration = eWithinLB.val();
    currExp.eBetweenDuration = eBetweenLB.val();
    currExp.showFeedback = eFeedbackLB.is(":checked");

    currExp.symmEnabled = symmetryLB.is(":checked");
    currExp.symmPassCriteria = symmPassLB.val();
    currExp.symmYesTrials = symmYesTrialsLB.val();
    currExp.symmNoTrials = symmNoTrialsLB.val();
    
    currExp.symmLocations.length = 0;

    // Symmetry pair locations
    for (var i = 1; i <= SymmetryRows; i++) {
        firstLoc = $("#symmetry-" + i + "-1").val();
        secLoc = $("#symmetry-" + i + "-2").val();

        currExp.symmLocations.push({
            "ALocation": firstLoc,
            "BLocation": secLoc
        });
    }

    currExp.transEnabled = transitivityLB.is(":checked");
    currExp.transPassCriteria = transPassLB.val();
    currExp.transYesTrials = transYesTrialsLB.val();
    currExp.transNoTrials = transNoTrialsLB.val();

    currExp.transLocations.length = 0;

    // Symmetry pair locations
    for (var i = 1; i <= TransitivityRows; i++) {
        firstLoc = $("#transitivity-" + i + "-1").val();
        secLoc = $("#transitivity-" + i + "-2").val();

        currExp.transLocations.push({
            "ALocation": firstLoc,
            "BLocation": secLoc
        });
    }

    currExp.equivEnabled = equivalenceLB.is(":checked");
    currExp.equivPassCriteria = equivPassLB.val();
    currExp.equivYesTrials = equivYesTrialsLB.val();
    currExp.equivNoTrials = equivNoTrialsLB.val();

    currExp.equivLocations.length = 0;

    // Symmetry pair locations
    for (var i = 1; i <= EquivalenceRows; i++) {
        firstLoc = $("#equivalence-" + i + "-1").val();
        secLoc = $("#equivalence-" + i + "-2").val();

        currExp.equivLocations.push({
            "ALocation": firstLoc,
            "BLocation": secLoc
        });
    }

    currExp.eTrialOrder = eTrialOrderLB.val();
    currExp.yesLocation = yesLocationLB.val();
    currExp.noLocation = noLocationLB.val();
    currExp.eContextEnabled = eContextLB.is(":checked");
    currExp.eContextText = eContextTextLB.val();
    currExp.eContextLoc = eContextLocLB.val();
    currExp.eContextYesText = eContextYesLB.val();
    currExp.eContextNoText = eContextNoLB.val();
    currExp.eInstructionText = eInstructionsLB.val();
    currExp.retrainLimit = retrainLB.val();

    //console.log(currExp);

    //localStorage.setObject("experiment", currExp);

    // Save the settings to a JSON file on the server
    currJSON = JSON.stringify(currExp);

    spinner.show();

    return $.post("../Data/SaveSettings", currJSON, function (data) {
        // delay for user experience
        
        setTimeout(function () {
            spinner.hide();

            if (data["error"] != null) {
                showPopup(data["error"]);
            } else {
                showPopup(data["success"]);
            }
        }, 2000);
    });
}

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

function showPopup(currText) {
    popupText.html(currText).text();
    popup.toggleClass("show");
}

function showInstructions(currText) {
    instructionText.html(currText.replace(/\n/g, '<br />')).text();
    instruction.toggleClass("show");
}

function runExperiment() {
    mainMenu.hide();
    board.show();

    spinner.show();

    $.when(loadParameters()).done(function () {
        if (currExp.mode == PretrainingMode) {
            runPretraining();
        } else if (currExp.mode == TrainingMode) {
            runTraining();
        } else if (currExp.mode == EvaluationMode) {
            runEvaluation();
        } else {
            runPretraining();
        }

        spinner.hide();
    });
}

function runTrial() {
    if (currPhase == PretrainingPhase) {
        if (stimulusList.length == 0) {
            runPretrainingEval();
        } else {
            currStimulus = stimulusList.pop();

            currTrial = setupTrial(currStimulus);

            board.css("background", "#FFF");

            firstLabel.text(currTrial.A);
            setBtnLocation(firstLabel, parseInt(currTrial.ALocation));

            secondLabel.text(currTrial.B);
            setBtnLocation(secondLabel, parseInt(currTrial.BLocation));

            // set up context cue if enabled
            if (currExp.ptContextEnabled) {
                contextCueLabel.text(currExp.ptContextText);
                setBtnLocation(contextCueLabel, parseInt(currExp.ptContextLoc));
                contextCueLabel.show();
            } else {
                contextCueLabel.text("");
                contextCueLabel.hide();
            }

            firstLabel.show();

            // down the rabbit hole we gooooooo~
            setTimeout(firstTimerTick, firstDuration);
        }
    } else if (currPhase == PretrainingEvalPhase){
        if (stimulusList.length == 0) {
            // can't progress until we hit the necessary pass criteria
            if (checkAccuracy()){
                if (currExp.mode == PretrainingMode) {
                    endExperiment();
                    return;
                }

                runTraining();
            } else {
                console.log("Failed to pass accuracy criteria, going back to pt eval.");
                setupPretrainingEval();
                runTrial();
            }
        } else {
            currStimulus = stimulusList.pop();

            currTrial = setupTrial(currStimulus);

            board.css("background", "#FFF");

            firstLabel.text(currTrial.A);
            setBtnLocation(firstLabel, parseInt(currTrial.ALocation));

            secondLabel.text(currTrial.B);
            setBtnLocation(secondLabel, parseInt(currTrial.BLocation));

            // set up context cue if enabled
            if (currExp.ptContextEnabled) {
                contextCueLabel.text(currExp.ptContextText);
                setBtnLocation(contextCueLabel, parseInt(currExp.ptContextLoc));
                contextCueLabel.show();
            } else {
                contextCueLabel.text("");
                contextCueLabel.hide();
            }

            firstLabel.show();

            // down the rabbit hole we gooooooo~
            setTimeout(firstTimerTick, firstDuration);
        }
    } else if (currPhase == TrainingPhase) {
        if (stimulusList.length == 0) {
            if (currExp.mode == TrainingMode) {
                endExperiment();
                return;
            }

            runEvaluation();
        } else {
            currStimulus = stimulusList.pop();

            currTrial = setupTrial(currStimulus);

            //console.log(currTrial);

            board.css("background", "#FFF");
            firstLabel.text(currTrial.A);
            setBtnLocation(firstLabel, parseInt(currTrial.ALocation));

            // check if we have simulataneous presentations enabled
            if (currExp.tSimultaneous) {
                secondLabel.html(currTrial.A + "&nbsp;&nbsp;&nbsp;" + currTrial.B).text();
            } else {
                secondLabel.text(currTrial.B);
            }
            
            setBtnLocation(secondLabel, parseInt(currTrial.BLocation));

            // set up context cue if enabled
            if (currExp.tContextEnabled) {
                contextCueLabel.text(currExp.tContextText);
                setBtnLocation(contextCueLabel, parseInt(currExp.tContextLoc));
                contextCueLabel.show();
            } else {
                contextCueLabel.text("");
                contextCueLabel.hide();
            }

            firstLabel.show();

            // down the rabbit hole we gooooooo~
            setTimeout(firstTimerTick, firstDuration);
        }
    } else if (currPhase == RetrainingPhase) {
        if (stimulusList.length == 0) {
            runEvaluation();
        } else {
            currStimulus = stimulusList.pop();

            currTrial = setupTrial(currStimulus);

            //console.log(currTrial);

            board.css("background", "#FFF");
            firstLabel.text(currTrial.A);
            setBtnLocation(firstLabel, parseInt(currTrial.ALocation));

            // check if we have simultaneous presentations enabled
            if (currExp.tSimultaneous) {
                secondLabel.html(currTrial.A + "&nbsp;&nbsp;&nbsp;" + currTrial.B).text();
            } else {
                secondLabel.text(currTrial.B);
            }

            setBtnLocation(secondLabel, parseInt(currTrial.BLocation));

            firstLabel.show();

            // down the rabbit hole we gooooooo~
            setTimeout(firstTimerTick, firstDuration);
        }
    }
}

function createNoteTrial() {
    var noteTrial = Object.create(trialObj);

    noteTrial.phase = currPhase;
    noteTrial.notes = "Failed to meet required accuracy. Retraining.";

    evaluationTrials.push(noteTrial);   
}

function runEvaluationTrial() {   
    // Remember to check the accuracy before progressing to different tests
    // or ending the experiment.

    // Scenario 1: We're done!
    if (testList.length == 0 && stimulusList.length == 0) {
        if (!checkAccuracy()) {
            createNoteTrial();

            retrainCount++;

            if (retrainCount > currExp.retrainLimit) {
                endExperiment("You have exceeded the maximum number of retraining attempts! Ending experiment.");
            } else {                
                runRetraining();
            }          
        } else {
            endExperiment();
        }     
        return;
    }

    // Scenario 2: We still have more tests to do!
    if (stimulusList.length == 0) {
        if (!checkAccuracy()) {
            createNoteTrial();

            retrainCount++;

            if (retrainCount > currExp.retrainLimit) {
                endExperiment("You have exceeded the maximum number of retraining attempts! Ending experiment.");
            } else {              
                runRetraining();
            }
            return;
        }

        currTest = testList.shift();

        if (currTest == SymmetryID) {
            currPassCriteria = currExp.symmPassCriteria;
            stimulusList = symmStimulusList;
        } else if (currTest == TransitivityID) {
            currPassCriteria = currExp.transPassCriteria;
            stimulusList = transStimulusList;
        } else if (currTest == EquivalenceID) {
            currPassCriteria = currExp.equivPassCriteria;
            stimulusList = equivStimulusList;
        }

        correctCount = 0;
        phaseTrialCount = stimulusList.length;

        currStimulus = stimulusList.pop();

        currTrial = setupTrial(currStimulus);

        //console.log(currTrial);

        board.css("background", "#FFF");
        firstLabel.text(currTrial.A);
        setBtnLocation(firstLabel, parseInt(currTrial.ALocation));

        secondLabel.text(currTrial.B);
        setBtnLocation(secondLabel, parseInt(currTrial.BLocation));

        // set up context cue if enabled
        if (currExp.eContextEnabled) {
            contextCueLabel.text(currExp.eContextText);
            setBtnLocation(contextCueLabel, parseInt(currExp.eContextLoc));
            contextCueLabel.show();
        } else {
            contextCueLabel.text("");
            contextCueLabel.hide();
        }

        firstLabel.show();

        // down the rabbit hole we gooooooo~
        setTimeout(firstTimerTick, firstDuration);
    }
        // Scenario 3: Still have more trials in this test!
    else {
        currStimulus = stimulusList.pop();

        currTrial = setupTrial(currStimulus);

        //console.log(currTrial);

        board.css("background", "#FFF");
        firstLabel.text(currTrial.A);
        setBtnLocation(firstLabel, parseInt(currTrial.ALocation));

        secondLabel.text(currTrial.B);
        setBtnLocation(secondLabel, parseInt(currTrial.BLocation));

        // set up context cue if enabled
        if (currExp.eContextEnabled) {
            contextCueLabel.text(currExp.eContextText);
            setBtnLocation(contextCueLabel, parseInt(currExp.eContextLoc));
            contextCueLabel.show();
        } else {
            contextCueLabel.text("");
            contextCueLabel.hide();
        }

        firstLabel.show();

        // down the rabbit hole we gooooooo~
        setTimeout(firstTimerTick, firstDuration);
    }
}

function runEvaluationTrialMixed() {
    // Wait until the end of trial to check accuracy

    // Scenario 1: We're done!
    if (stimulusList.length == 0) {
        if (!checkAccuracy()) {
            createNoteTrial();

            retrainCount++;

            if (retrainCount > currExp.retrainLimit) {
                endExperiment("You have exceeded the maximum number of retraining attempts! Ending experiment.");
            } else {
                runRetraining();
            }
        } else {
            endExperiment();
        }
        return;
    } else {
        currStimulus = stimulusList.pop();

        currTrial = setupTrial(currStimulus);

        //console.log(currTrial);

        board.css("background", "#FFF");
        firstLabel.text(currTrial.A);
        setBtnLocation(firstLabel, parseInt(currTrial.ALocation));

        secondLabel.text(currTrial.B);
        setBtnLocation(secondLabel, parseInt(currTrial.BLocation));

        // set up context cue if enabled
        if (currExp.eContextEnabled) {
            contextCueLabel.text(currExp.eContextText);
            setBtnLocation(contextCueLabel, parseInt(currExp.eContextLoc));
            contextCueLabel.show();
        } else {
            contextCueLabel.text("");
            contextCueLabel.hide();
        }

        firstLabel.show();

        // down the rabbit hole we gooooooo~
        setTimeout(firstTimerTick, firstDuration);
    }
}

function setupTrial(stim) {
    var temp = Object.create(trialObj);

    temp.phase = currPhase;
    temp.A = stim.A;
    temp.B = stim.B;
    temp.type = stim.type;
    temp.ALocation = stim.ALocation;
    temp.BLocation = stim.BLocation;

    if (currPhase == EvaluationPhase) {
        temp.testID = stim.testID;

        switch (stim.testID) {
            case SymmetryID:
                temp.testDesc = "Symmetry";
                break;
            case TransitivityID:
                temp.testDesc = "Transitivity";
                break;
            case EquivalenceID:
                temp.testDesc = "Equivalence";
                break;
        }
    }

    return temp;
}

function firstTimerTick() {
    firstLabel.hide();
    contextCueLabel.hide();

    setTimeout(withinTimerTick, withinDuration);
}

function withinTimerTick() {
    secondLabel.show();
    contextCueLabel.show();

    setTimeout(secondTimerTick, secondDuration);
}

function secondTimerTick() {
    secondLabel.hide();
    contextCueLabel.hide();

    board.css("background", "#000");

    if (currPhase == PretrainingPhase || currPhase == TrainingPhase || currPhase == RetrainingPhase) {
        setTimeout(betweenTimerTick, betweenDuration);
    } else if (currPhase == EvaluationPhase) {
        // in the evaluation phase, we have the option of random placement of the
        // YES/NO buttons so decide where they go.
        if (currExp.yesLocation == RandomLocation || currExp.noLocation == RandomLocation) {
            setBtnRandomLocation();
        } else {
            setBtnLocation(yesBtn, BottomLeft);
            setBtnLocation(noBtn, BottomRight);
        }

        yesBtn.show();
        noBtn.show();
        stopWatch.start();
    } else {
        setBtnLocation(yesBtn, BottomLeft);
        setBtnLocation(noBtn, BottomRight);

        yesBtn.show();
        noBtn.show();
        stopWatch.start();
    }
}

function betweenTimerTick() {
    if (currPhase == PretrainingPhase || currPhase == TrainingPhase || currPhase == RetrainingPhase) {
        nextBtn.show();
        stopWatch.start();
    }
}

function nextBtnClick() {
    if (currPhase == PretrainingPhase
        || currPhase == TrainingPhase
        || currPhase == RetrainingPhase) stopWatch.stop(); // stopwatch already stopped in other phases

    nextBtn.hide();

    logTrial();

    if (currPhase == EvaluationPhase) {
        if (currExp.eTrialOrder == Mixed) {
            runEvaluationTrialMixed();
        } else {
            runEvaluationTrial();
        }
    } else {
        runTrial();
    }    
}

function logTrial() {
    var currLatency = (stopWatch.time() / 1000).toFixed(3);
    currTrial.latency = currLatency;

    stopWatch.reset();

    console.log(currTrial);

    switch (currPhase) {
        case PretrainingPhase:
            pretrainingTrials.push(currTrial);
            break;
        case PretrainingEvalPhase:
            pretrainingEvalTrials.push(currTrial);
            break;
        case TrainingPhase:
            trainingTrials.push(currTrial);
            break;
        case EvaluationPhase:
            evaluationTrials.push(currTrial);
            break;
        case RetrainingPhase:
            retrainingTrials.push(currTrial);
            break;
    }
}

function hideBoard() {
    firstLabel.hide();
    secondLabel.hide();
    nextBtn.hide();
    yesBtn.hide();
    noBtn.hide();
    responseLabel.hide();
}

function runPretraining() {
    if (setupPretraining()) {
        showInstructions(currInstructionText);
    }
}

function runPretrainingEval() {
    if (setupPretrainingEval()) {
        showInstructions(currInstructionText);
    }
}

function runTraining() {
    if (setupTraining()) {
        showInstructions(currInstructionText);
    }
}

function runRetraining() {
    if (setupRetraining()) {
        showInstructions(currInstructionText);
    }
}

function runEvaluation() {
    spinner.show();

    if (setupEvaluation()) {
        spinner.hide();
        showInstructions(currInstructionText);
    }
}

function setupPretraining() {
    currPhase = PretrainingMode;

    stimulusList.length = 0; // clear the array

    for (var i = 0; i < currExp.ptTrials; i++) {
        stimulusList = stimulusList.concat(currExp.ptYesPairs);
    }

    shuffleArray(stimulusList);

    firstDuration = currExp.ptFirstDuration * 1000;
    secondDuration = currExp.ptSecondDuration * 1000;
    withinDuration = currExp.ptWithinDuration * 1000;
    betweenDuration = currExp.ptBetweenDuration * 1000;

    currInstructionText = currExp.ptInstructionText;
    board.css("background", "#FFF");
    hideBoard();

    return true;
}

function setupPretrainingEval() {
    currPhase = PretrainingEvalPhase;

    stimulusList.length = 0; // clear the array

    for (var i = 0; i < currExp.ptYesTrials; i++) {
        stimulusList = stimulusList.concat(currExp.ptYesPairs);
    }

    for (var i = 0; i < currExp.ptNoTrials; i++) {
        stimulusList = stimulusList.concat(currExp.ptNoPairs);
    }

    shuffleArray(stimulusList);

    currPassCriteria = parseFloat(currExp.ptPassCriteria);
    phaseTrialCount = stimulusList.length;
    correctCount = 0;

    firstDuration = 1000;
    secondDuration = 1000;
    withinDuration = 500;
    betweenDuration = 3000;

    currInstructionText = currExp.ptInstructionEvalText;
    board.css("background", "#FFF");
    hideBoard();

    return true;
}

function setupTraining() {
    currPhase = TrainingPhase;

    stimulusList.length = 0; // clear the array

    for (var i = 0; i < TrainingRows; i++) {
        stimulusList.push({
            "A": currExp.stimuliSets[i].A,
            "ALocation": currExp.stimuliSets[i].ALocation,
            "B": currExp.stimuliSets[i].B,
            "BLocation": currExp.stimuliSets[i].BLocation,
            "type": 1,
            "testID": ""
        });

        stimulusList.push({
            "A": currExp.stimuliSets[i].B,
            "ALocation": currExp.stimuliSets[i].BLocation,
            "B": currExp.stimuliSets[i].C,
            "BLocation": currExp.stimuliSets[i].CLocation,
            "type": 1,
            "testID": ""
        });
    }

    for (var i = 0; i < currExp.tTrials - 1; i++) {
        stimulusList = stimulusList.concat(stimulusList);
    }

    shuffleArray(stimulusList);

    firstDuration = currExp.tFirstDuration * 1000;
    secondDuration = currExp.tSecondDuration * 1000;
    withinDuration = currExp.tWithinDuration * 1000;
    betweenDuration = currExp.tBetweenDuration * 1000;

    currInstructionText = currExp.tInstructionText;
    board.css("background", "#FFF");
    hideBoard();

    return true;
}

function setupRetraining() {
    currPhase = RetrainingPhase;

    stimulusList.length = 0; // clear the array

    for (var i = 0; i < TrainingRows; i++) {
        stimulusList.push({
            "A": currExp.stimuliSets[i].A,
            "ALocation": currExp.stimuliSets[i].ALocation,
            "B": currExp.stimuliSets[i].B,
            "BLocation": currExp.stimuliSets[i].BLocation,
            "type": 1,
            "testID": ""
        });

        stimulusList.push({
            "A": currExp.stimuliSets[i].B,
            "ALocation": currExp.stimuliSets[i].BLocation,
            "B": currExp.stimuliSets[i].C,
            "BLocation": currExp.stimuliSets[i].CLocation,
            "type": 1,
            "testID": ""
        });
    }

    for (var i = 0; i < currExp.tTrials - 1; i++) {
        stimulusList = stimulusList.concat(stimulusList);
    }

    shuffleArray(stimulusList);

    firstDuration = currExp.tFirstDuration * 1000;
    secondDuration = currExp.tSecondDuration * 1000;
    withinDuration = currExp.tWithinDuration * 1000;
    betweenDuration = currExp.tBetweenDuration * 1000;

    currInstructionText = currExp.rtInstructionText;
    board.css("background", "#FFF");
    hideBoard();

    return true;
}

function setupEvaluation() {
    var totalTrialCount = 0;
    var randIndexes = [];

    currPhase = EvaluationPhase;

    testList.length = 0;

    // decide which tests we're going to do
    // Going to mix it up a bit...
    // Note in the symmLocations, transLocations, and equivLocations arrays
    // the A and B's are not indicitive of the set row/column number, treat them as first(A) and second(B) (I know confusing)

    // SYMMETRY TRIALS
    // B1 -> A1 | C1 -> B1
    // B2 -> A2 | C2 -> B2
    // B3 -> A3 | C3 -> B3

    if (currExp.symmEnabled) {
        testList.push(SymmetryID);

        if (currExp.eTrialOrder == Mixed) {
            symmTrialCount = (SymmetryRows * currExp.symmYesTrials) + (SymmetryRows * currExp.symmNoTrials);
            symmCorrectCount = 0;
        }

        // YES trials
        for (var i = 0; i < currExp.symmYesTrials; i++) {
            for (var j = 0, k = 0; j < TrainingRows; j++, k += 2) {
                symmStimulusList.push({
                    "A": currExp.stimuliSets[j].B,
                    "B": currExp.stimuliSets[j].A,
                    "ALocation": currExp.symmLocations[k].ALocation,
                    "BLocation": currExp.symmLocations[k].BLocation,
                    "type": 1,
                    "testID": SymmetryID
                });

                symmStimulusList.push({
                    "A": currExp.stimuliSets[j].C,
                    "B": currExp.stimuliSets[j].B,
                    "ALocation": currExp.symmLocations[k + 1].ALocation,
                    "BLocation": currExp.symmLocations[k + 1].BLocation,
                    "type": 1,
                    "testID": SymmetryID
                });
            }
        }

        // NO trials
        // randomly generate these NO pairs by selecting from two separate sets
        for (var i = 0; i < currExp.symmNoTrials; i++) {
            for (var j = 0, k = 0; j < TrainingRows; j++, k += 2) {
                randIndexes = getRandomIndexes();

                symmStimulusList.push({
                    "A": currExp.stimuliSets[randIndexes[0]].B,
                    "B": currExp.stimuliSets[randIndexes[1]].A,
                    "ALocation": currExp.symmLocations[k].ALocation,
                    "BLocation": currExp.symmLocations[k].BLocation,
                    "type": 0,
                    "testID": SymmetryID
                });

                symmStimulusList.push({
                    "A": currExp.stimuliSets[randIndexes[0]].C,
                    "B": currExp.stimuliSets[randIndexes[1]].B,
                    "ALocation": currExp.symmLocations[k + 1].ALocation,
                    "BLocation": currExp.symmLocations[k + 1].BLocation,
                    "type": 0,
                    "testID": SymmetryID
                });
            }
        }

        shuffleArray(symmStimulusList);       
    }

    // TRANSITIVITY TRIALS
    // A1 -> C1
    // A2 -> C2
    // A3 -> C3

    if (currExp.transEnabled) {
        testList.push(TransitivityID);

        if (currExp.eTrialOrder == Mixed) {
            transTrialCount = (TransitivityRows * currExp.transYesTrials) + (TransitivityRows * currExp.transNoTrials);
            transCorrectCount = 0;
        }

        // YES trials
        for (var i = 0; i < currExp.transYesTrials; i++) {
            for (var j = 0; j < TrainingRows; j++) {
                transStimulusList.push({
                    "A": currExp.stimuliSets[j].A,
                    "B": currExp.stimuliSets[j].C,
                    "ALocation": currExp.transLocations[j].ALocation,
                    "BLocation": currExp.transLocations[j].BLocation,
                    "type": 1,
                    "testID": TransitivityID
                });
            }
        }

        // NO trials
        // randomly generate our NO pairs
        for (var i = 0; i < currExp.transNoTrials; i++) {
            for (var j = 0; j < TrainingRows; j++) {
                randIndexes = getRandomIndexes();

                transStimulusList.push({
                    "A": currExp.stimuliSets[randIndexes[0]].A,
                    "B": currExp.stimuliSets[randIndexes[1]].C,
                    "ALocation": currExp.transLocations[j].ALocation,
                    "BLocation": currExp.transLocations[j].BLocation,
                    "type": 0,
                    "testID": TransitivityID
                });
            }
        }

        //console.log(transStimulusList);
        shuffleArray(transStimulusList);
    }

    // EQUIVALENCE TRIALS
    // C1 -> A1
    // C2 -> A2
    // C3 -> A3

    if (currExp.equivEnabled) {
        testList.push(EquivalenceID);

        if (currExp.eTrialOrder == Mixed) {
            equivTrialCount = (EquivalenceRows * currExp.equivYesTrials) + (EquivalenceRows * currExp.equivNoTrials);
            equivCorrectCount = 0;
        }

        // YES trials
        for (var i = 0; i < currExp.equivYesTrials; i++) {
            for (var j = 0; j < TrainingRows; j++) {
                equivStimulusList.push({
                    "A": currExp.stimuliSets[j].C,
                    "B": currExp.stimuliSets[j].A,
                    "ALocation": currExp.equivLocations[j].ALocation,
                    "BLocation": currExp.equivLocations[j].BLocation,
                    "type": 1,
                    "testID": EquivalenceID
                });
            }
        }

        // NO trials
        // randomly generate our NO pairs
        for (var i = 0; i < currExp.equivNoTrials; i++) {
            for (var j = 0; j < TrainingRows; j++) {
                randIndexes = getRandomIndexes();

                equivStimulusList.push({
                    "A": currExp.stimuliSets[randIndexes[0]].C,
                    "B": currExp.stimuliSets[randIndexes[1]].A,
                    "ALocation": currExp.equivLocations[j].ALocation,
                    "BLocation": currExp.equivLocations[j].BLocation,
                    "type": 0,
                    "testID": EquivalenceID
                });
            }
        }

        //console.log(equivStimulusList);
        shuffleArray(equivStimulusList);
    }

    // If our trial order is Mixed then throw all the stim lists together and randomize
    // Trial run will be driven by the stimuli list instead of current test ID
    // TODO: For the MIXED trial order
    // Create variables to hold phase trial counts for Symmetry, Transitivity, and Equivalence
    // Create variables to hold correct counts for Symmetry, Transitivity, and Equivalence
    if (currExp.eTrialOrder == Mixed) {
        stimulusList = stimulusList.concat(symmStimulusList);

        stimulusList = stimulusList.concat(transStimulusList);

        stimulusList = stimulusList.concat(equivStimulusList);

        shuffleArrayBiased(stimulusList);
    } else {
        // get our current queue and test
        currTest = testList.shift();

        if (currTest == SymmetryID) {
            currPassCriteria = currExp.symmPassCriteria;
            stimulusList = symmStimulusList;
        } else if (currTest == TransitivityID) {
            currPassCriteria = currExp.transPassCriteria;
            stimulusList = transStimulusList;
        } else if (currTest == EquivalenceID) {
            currPassCriteria = currExp.equivPassCriteria;
            stimulusList = equivStimulusList;
        }

        phaseTrialCount = stimulusList.length;
        correctCount = 0;
    }

    //console.log(stimulusList);

    firstDuration = currExp.eFirstDuration * 1000;
    secondDuration = currExp.eSecondDuration * 1000;
    withinDuration = currExp.eWithinDuration * 1000;
    betweenDuration = currExp.eBetweenDuration * 1000;

    currInstructionText = currExp.eInstructionText;
    board.css("background", "#FFF");
    hideBoard();

    return true;
}

function getRandomIndexes() {
    var firstIndex = 0;
    var secIndex = 0;
    var firstVal = 0;
    var stack = [0, 1, 2];

    firstVal = Math.floor(Math.random() * stack.length);
    firstIndex = stack[firstVal];

    stack.splice(firstVal, 1);

    secIndex = stack[Math.floor(Math.random() * stack.length)];

    return [firstIndex, secIndex];
}

function endExperiment(addText) {
    var currJSON = "";

    board.hide();
    spinner.show();

    // build the final object to send over
    currExp.ptTrialList = pretrainingTrials.slice();
    currExp.pteTrialList = pretrainingEvalTrials.slice();
    currExp.tTrialList = trainingTrials.slice();
    currExp.eTrialList = evaluationTrials.slice();
    currExp.rtTrialList = retrainingTrials.slice();

    currJSON = JSON.stringify(currExp);

    // send data to api
    $.post("../Data/Save", currJSON, function (data) {
        spinner.hide();
        mainMenu.show();

        if (addText != null && addText != "") {
            showPopup(addText + "<br/><br/>Experiment completed! Thank you for participating! Please see the test conductor for further instructions.");
        } else {
            showPopup("Experiment completed! Thank you for participating! Please see the test conductor for further instructions.");
        }

        dumpData();
    }); 
}

function dumpData() {
    pretrainingTrials.length = 0;
    pretrainingEvalTrials.length = 0;
    trainingTrials.length = 0;
    evaluationTrials.length = 0;
    retrainingTrials.length = 0;
    symmStimulusList.length = 0;
    transStimulusList.length = 0;
    equivStimulusList.length = 0;
    stimulusList.length = 0;
    currExp = null;
}

function setBtnLocation(btn, locID) {
    btn.removeClass();

    switch (locID) {
        case Center:
            btn.addClass("center");
            break;
        case TopLeft:
            btn.addClass("top-left");
            break;
        case TopRight:
            btn.addClass("top-right");
            break;
        case BottomLeft:
            btn.addClass("bottom-left");
            break;
        case BottomRight:
            btn.addClass("bottom-right");
            break;
        case TopCenter:
            btn.addClass("top-center");
            break;
        case BottomCenter:
            btn.addClass("bottom-center");
            break;
    }
}

function setBtnRandomLocation() {
    yesBtn.removeClass();
    noBtn.removeClass();

    if (Math.floor(Math.random() * 20) % 2 == 0) {
        yesBtn.addClass("bottom-left");
        noBtn.addClass("bottom-right");
    } else {
        yesBtn.addClass("bottom-right");
        noBtn.addClass("bottom-left");
    }
}

function checkFeedback(id) {
    yesBtn.hide();
    noBtn.hide();

    currTrial.userAnswer = id;

    if (id == currTrial.type) {
        currTrial.isCorrect = true;
        correctCount++;

        responseLabel.text("CORRECT");
        responseLabel.css("color", "green");
    } else {
        currTrial.isCorrect = false;
        responseLabel.text("INCORRECT");
        responseLabel.css("color", "red");
    }

    if (currPhase == EvaluationPhase && currExp.eTrialOrder == Mixed) {
        if (currTrial.isCorrect) {
            switch (currTrial.testID) {
                case SymmetryID:
                    symmCorrectCount++;
                    break;
                case TransitivityID:
                    transCorrectCount++;
                    break;
                case EquivalenceID:
                    equivCorrectCount++;
                    break;
            }
        }
    }

    if (currPhase == EvaluationPhase && !currExp.showFeedback) {
        nextBtn.show();
    } else {
        responseLabel.show();

        setTimeout(function () {
            responseLabel.hide();
            nextBtn.show();
        }, 2000);
    }   
}

function checkAccuracy(){
    var correctNeeded = 0;

    if (currPhase == EvaluationPhase && currExp.eTrialOrder == Mixed) {
        // go through all the test types and check for accuracy criteria
        // SYMMETRY
        currPassCriteria = parseFloat(currExp.symmPassCriteria);
        correctNeeded = Math.round(currPassCriteria * symmTrialCount);

        console.log("Correct needed: " + correctNeeded + ", Correct count: " + symmCorrectCount);

        if (symmCorrectCount < correctNeeded) return false;

        // TRANSITIVITY
        currPassCriteria = parseFloat(currExp.transPassCriteria);
        correctNeeded = Math.round(currPassCriteria * transTrialCount);

        console.log("Correct needed: " + correctNeeded + ", Correct count: " + transCorrectCount);

        if (transCorrectCount < correctNeeded) return false;

        // EQUIVALENCE
        currPassCriteria = parseFloat(currExp.equivPassCriteria);
        correctNeeded = Math.round(currPassCriteria * equivTrialCount);

        console.log("Correct needed: " + correctNeeded + ", Correct count: " + equivCorrectCount);

        if (equivCorrectCount < correctNeeded) return false;

        return true;
    } else {
        correctNeeded = Math.round(currPassCriteria * phaseTrialCount);

        console.log("Correct needed: " + correctNeeded + ", Correct count: " + correctCount);

        if (correctCount >= correctNeeded) return true;

        return false;
    }
    
}

function loadData() {
    spinner.show();

    $.get("../Data/Load", function (data) {
        currDataLog = data;

        //console.log(data);

        if (currDataLog["error"] != null) {
            spinner.hide();
            showPopup(currDataLog["error"]);          
            return;
        }

        mapData();
        spinner.hide();
    });
}

function mapData() {
    var currFileName = "";
    var currCreationDtm = "";
    var currFilePath = "";
    // empty our table
    $("#data-table tr").slice(1).remove();

    for (var i = 0; i < currDataLog.length; i++) {
        currFileName = currDataLog[i].FileName;
        currFilePath = currDataLog[i].FilePath;
        currCreationDtm = currDataLog[i].FileCreationDtm;

        //console.log(currFileName);

        tableEnd.append("<tr><td>" + currFileName + "</td><td>" + currCreationDtm +
            "</td><td><a href=\"../Data/" + currFileName + "\">Download</a></td></tr>");
    }

    mainMenu.hide();
    dataMenu.show();
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function shuffleArrayBiased(array) {
    // Shuffle the array but we don't want more than 3 of the same in a row
    var queue = [];
    var count = 0;
    var proofed = false;
    var temp;

    for (var i = array.length - 1; i > 0; i--) {
        temp = array[i];
        proofed = false;

        while (!proofed) {
            count = 0;

            var j = Math.floor(Math.random() * (i + 1));

            if (queue.length < 3) {
                queue.push(array[j].testID);

                array[i] = array[j];
                array[j] = temp;

                proofed = true;
                break;
            }

            for (var n = 0; n < queue.length; n++) {
                if (queue[n] == array[j].testID) count++;
            }

            if (count == 3) {
                // generate a new random number
                proofed = false;
            } else {
                // dequeue and queue
                queue.shift();
                queue.push(array[j].testID);

                array[i] = array[j];
                array[j] = temp;

                proofed = true;
            }
        }

    }
    return array;
}
