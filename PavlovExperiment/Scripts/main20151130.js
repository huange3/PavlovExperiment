
var currExp = {
    "version": "",
    "date": "",
    "id": "",
    "mode": "",
    // PRETRAINING PARAMETERS
    "ptPassCriteria": "",
    "ptTrials": "",
    "ptYesTrials": "",
    "ptNoTrials": "",
    "ptContextEnabled": "",
    "ptContextText": "",
    "ptContextYesText": "",
    "ptContextNoText": "",
    "ptInstructionText": "",
    "ptInstructionEvalText": "",
    // TRAINING PARAMETERS
    "tFirstDuration": "",
    "tSecondDuration": "",
    "tWithinDuration": "",
    "tBetweenDuration": "",
    "tTrials": "",
    "tSimultaneous": "",
    "tInstructionText": "",
    "rtInstructionText": "",
    "tLocation1": "",
    "tLocation2": "",
    "tLocation3": "",
    "tLocation4": "",
    "tLocation5": "",
    "tLocation6": "",
    // EVALUATION PARAMETERS
    "eFirstDuration": "",
    "eSecondDuration": "",
    "eWithinDuration": "",
    "eBetweenDuration": "",
    "eYesTrials": "",
    "eNoTrials": "",
    "showFeedback": "",
    "retrainLimit": "",
    "symmEnabled": "",
    "symmPassCriteria": "",
    "symmLocation1": "",
    "symmLocation2": "",
    "symmLocation3": "",
    "symmLocation4": "",
    "symmLocation5": "",
    "symmLocation6": "",
    "transEnabled": "",
    "transPassCriteria": "",
    "transLocation1": "",
    "transLocation2": "",
    "transLocation3": "",
    "equivEnabled": "",
    "equivPassCriteria": "",
    "equivLocation1": "",
    "equivLocation2": "",
    "equivLocation3": "",
    "eTrialOrder": "",
    "yesLocation": "",
    "noLocation": "",
    "eContextEnabled": "",
    "eContextText": "",
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
    "location": "",
    "latency": "",
    "userAnswer": "",
    "isCorrect": "",
    "test": "",
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
        runEvaluationTrial();
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
    if (loadParameters()) {
        mainMenu.hide();
        parameterMenu.show();
        showParms(GeneralID);
    };
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
    var currObj = localStorage.getObject("experiment");

    if (currObj == null) {
        // load the default settings
        currExp.mode = FullMode;
        currExp.ptPassCriteria = 0.90;
        currExp.ptTrials = 2;
        currExp.ptYesTrials = 2;
        currExp.ptNoTrials = 2;
        currExp.ptContextEnabled = false;
        currExp.ptInstructionText = $("#instructions-pt").val();
        currExp.ptInstructionEvalText = $("#instructions-pte").val();

        currExp.tFirstDuration = 1.0;
        currExp.tSecondDuration = 1.0;
        currExp.tWithinDuration = 0.5;
        currExp.tBetweenDuration = 3.0;
        currExp.tTrials = 20;
        currExp.tSimultaneous = false;
        currExp.tInstructionText = $("#instructions-t").val();
        currExp.rtInstructionText = $("instructions-rt").val();
        currExp.tLocation1 = 1;
        currExp.tLocation2 = 1;
        currExp.tLocation3 = 1;
        currExp.tLocation4 = 1;
        currExp.tLocation5 = 1;
        currExp.tLocation6 = 1;

        currExp.eFirstDuration = 1.0;
        currExp.eSecondDuration = 1.0;
        currExp.eWithinDuration = 0.5;
        currExp.eBetweenDuration = 3.0;
        currExp.eYesTrials = 1;
        currExp.eNoTrials = 1;
        currExp.showFeedback = false;
        currExp.retrainLimit = 3;
        currExp.symmEnabled = true;
        currExp.symmPassCriteria = 0.90;
        currExp.symmLocation1 = 1;
        currExp.symmLocation2 = 1;
        currExp.symmLocation3 = 1;
        currExp.symmLocation4 = 1;
        currExp.symmLocation5 = 1;
        currExp.symmLocation6 = 1;

        currExp.transEnabled = true;
        currExp.transPassCriteria = 0.90;
        currExp.transLocation1 = 1;
        currExp.transLocation2 = 1;
        currExp.transLocation3 = 1;

        currExp.equivEnabled = true;
        currExp.equivPassCriteria = 0.90;
        currExp.equivLocation1 = 1;
        currExp.equivLocation2 = 1;
        currExp.equivLocation3 = 1;

        currExp.eTrialOrder = 1;
        currExp.yesLocation = 4;
        currExp.noLocation = 5;
        currExp.eContextEnabled = false;
        currExp.eInstructionText = $("#instructions-e").val();
    } else {
        currExp = currObj;
    }

    mapParameters();

    return true;
}

function mapParameters() {
    // GENERAL
    $("input:radio[name=mode][value=" + currExp.mode + "]").prop("checked", true);

    // PRETRAINING 
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
    ptContextYesLB.val(currExp.ptContextYesText);
    ptContextNoLB.val(currExp.ptContextNoText);
    ptInstructionsLB.val(currExp.ptInstructionText);
    ptInstructionsEvalLB.val(currExp.ptInstructionEvalText);

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

    tInstructionsLB.val(currExp.tInstructionText);
    rtInstructionsLB.val(currExp.rtInstructionText);

    $('#training-1 option[value="' + currExp.tLocation1 + '"]').prop("selected", true);
    $('#training-2 option[value="' + currExp.tLocation2 + '"]').prop("selected", true);
    $('#training-3 option[value="' + currExp.tLocation3 + '"]').prop("selected", true);
    $('#training-4 option[value="' + currExp.tLocation4 + '"]').prop("selected", true);
    $('#training-5 option[value="' + currExp.tLocation5 + '"]').prop("selected", true);
    $('#training-6 option[value="' + currExp.tLocation6 + '"]').prop("selected", true);

    // EVALUATION
    eFirstDurationLB.val(currExp.eFirstDuration);
    eSecondDurationLB.val(currExp.eSecondDuration);
    eWithinLB.val(currExp.eWithinDuration);
    eBetweenLB.val(currExp.eBetweenDuration);
    eYesTrialsLB.val(currExp.eYesTrials);
    eNoTrialsLB.val(currExp.eNoTrials);
    
    $('#trial-order option[value="' + currExp.eTrialOrder + '"]').prop("selected", true);
    $('#yes-loc option[value="' + currExp.yesLocation + '"]').prop("selected", true);
    $('#no-loc option[value="' + currExp.noLocation + '"]').prop("selected", true);

    if (currExp.eContextEnabled) {
        eContextLB.prop("checked", true);
    } else {
        eContextLB.prop("checked", false);
    }

    eContextTextLB.val(currExp.eContextText);
    eContextYesLB.val(currExp.eContextYesText);
    eContextNoLB.val(currExp.eContextNoText);
    eInstructionsLB.val(currExp.eInstructionText);
    retrainLB.val(currExp.retrainLimit);

    if (currExp.showFeedback) {
        eFeedbackLB.prop("checked", true);
    } else {
        eFeedbackLB.prop("checked", false);
    }

    if (currExp.symmEnabled) {
        symmetryLB.prop("checked", true);
    } else {
        symmetryLB.prop("checked", false);
    }

    symmPassLB.val(currExp.symmPassCriteria);

    $('#symmetry-1 option[value="' + currExp.symmLocation1 + '"]').prop("selected", true);
    $('#symmetry-2 option[value="' + currExp.symmLocation2 + '"]').prop("selected", true);
    $('#symmetry-3 option[value="' + currExp.symmLocation3 + '"]').prop("selected", true);
    $('#symmetry-4 option[value="' + currExp.symmLocation4 + '"]').prop("selected", true);
    $('#symmetry-5 option[value="' + currExp.symmLocation5 + '"]').prop("selected", true);
    $('#symmetry-6 option[value="' + currExp.symmLocation6 + '"]').prop("selected", true);

    if (currExp.transEnabled) {
        transitivityLB.prop("checked", true);
    } else {
        transitivityLB.prop("checked", false);
    }

    transPassLB.val(currExp.transPassCriteria);

    $('#transitivity-1 option[value="' + currExp.transLocation1 + '"]').prop("selected", true);
    $('#transitivity-2 option[value="' + currExp.transLocation2 + '"]').prop("selected", true);
    $('#transitivity-3 option[value="' + currExp.transLocation3 + '"]').prop("selected", true);

    if (currExp.equivEnabled) {
        equivalenceLB.prop("checked", true);
    } else {
        equivalenceLB.prop("checked", false);
    }

    equivPassLB.val(currExp.equivPassCriteria);

    $('#equivalence-1 option[value="' + currExp.equivLocation1 + '"]').prop("selected", true);
    $('#equivalence-2 option[value="' + currExp.equivLocation2 + '"]').prop("selected", true);
    $('#equivalence-3 option[value="' + currExp.equivLocation3 + '"]').prop("selected", true);
}

function saveParameters() {
    currExp.version = "1.0.0";
    currExp.id = participantIDLB.val();
    currExp.mode = $("input:radio[name=mode]:checked").val();

    currExp.ptPassCriteria = ptPassCriteriaLB.val();
    currExp.ptTrials = ptTrialsLB.val();
    currExp.ptYesTrials = ptYesTrialsLB.val();
    currExp.ptNoTrials = ptNoTrialsLB.val();
    currExp.ptContextEnabled = ptContextLB.is(":checked");
    currExp.ptContextText = ptContextTextLB.val();
    currExp.ptContextYesText = ptContextYesLB.val();
    currExp.ptContextNoText = ptContextNoLB.val();
    currExp.ptInstructionText = ptInstructionsLB.val();
    currExp.ptInstructionEvalText = ptInstructionsEvalLB.val();

    currExp.tFirstDuration = tFirstDurationLB.val();
    currExp.tSecondDuration = tSecondDurationLB.val();
    currExp.tWithinDuration = tWithinLB.val();
    currExp.tBetweenDuration = tBetweenLB.val();
    currExp.tTrials = tTrialsLB.val();
    currExp.tSimultaneous = tSimultaneousLB.is(":checked");
    currExp.tInstructionText = tInstructionsLB.val();
    currExp.rtInstructionText = rtInstructionsLB.val();
    currExp.tLocation1 = tLocation1LB.val();
    currExp.tLocation2 = tLocation2LB.val();
    currExp.tLocation3 = tLocation3LB.val();
    currExp.tLocation4 = tLocation4LB.val();
    currExp.tLocation5 = tLocation5LB.val();
    currExp.tLocation6 = tLocation6LB.val();

    currExp.eFirstDuration = eFirstDurationLB.val();
    currExp.eSecondDuration = eSecondDurationLB.val();
    currExp.eWithinDuration = eWithinLB.val();
    currExp.eBetweenDuration = eBetweenLB.val();
    currExp.eYesTrials = eYesTrialsLB.val();
    currExp.eNoTrials = eNoTrialsLB.val();
    currExp.showFeedback = eFeedbackLB.is(":checked");

    currExp.symmEnabled = symmetryLB.is(":checked");
    currExp.symmPassCriteria = symmPassLB.val();
    currExp.symmLocation1 = symmLocation1LB.val();
    currExp.symmLocation2 = symmLocation2LB.val();
    currExp.symmLocation3 = symmLocation3LB.val();
    currExp.symmLocation4 = symmLocation4LB.val();
    currExp.symmLocation5 = symmLocation5LB.val();
    currExp.symmLocation6 = symmLocation6LB.val();

    currExp.transEnabled = transitivityLB.is(":checked");
    currExp.transPassCriteria = transPassLB.val();
    currExp.transLocation1 = transLocation1LB.val();
    currExp.transLocation2 = transLocation2LB.val();
    currExp.transLocation3 = transLocation3LB.val();

    currExp.equivEnabled = equivalenceLB.is(":checked");
    currExp.equivPassCriteria = equivPassLB.val();
    currExp.equivLocation1 = equivLocation1LB.val();
    currExp.equivLocation2 = equivLocation2LB.val();
    currExp.equivLocation3 = equivLocation3LB.val();

    currExp.eTrialOrder = eTrialOrderLB.val();
    currExp.yesLocation = yesLocationLB.val();
    currExp.noLocation = noLocationLB.val();
    currExp.eContextEnabled = eContextLB.is(":checked");
    currExp.eContextText = eContextTextLB.val();
    currExp.eContextYesText = eContextYesLB.val();
    currExp.eContextNoText = eContextNoLB.val();
    currExp.eInstructionText = eInstructionsLB.val();
    currExp.retrainLimit = retrainLB.val();

    console.log(currExp);

    localStorage.setObject("experiment", currExp);

    spinner.show();
    setTimeout(function () {
        spinner.hide();
        showPopup("Parameters saved!");
    }, 2000);
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

    loadParameters();

    if (currExp.mode == PretrainingMode){
        runPretraining();
    } else if (currExp.mode == TrainingMode){
        runTraining();
    } else if (currExp.mode == EvaluationMode){
        runEvaluation();
    } else {
        runPretraining();
    }

    spinner.hide();
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
            firstLabel.addClass("center");
            secondLabel.text(currTrial.B);
            secondLabel.addClass("center");

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
                setupPretrainingEval();
                runTrial();
            }
        } else {
            currStimulus = stimulusList.pop();

            currTrial = setupTrial(currStimulus);

            board.css("background", "#FFF");
            firstLabel.text(currTrial.A);
            firstLabel.addClass("center");
            secondLabel.text(currTrial.B);
            secondLabel.addClass("center");

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
            setBtnLocation(firstLabel, parseInt(currTrial.location));

            // check if we have simulataneous presentations enabled
            if (currExp.tSimultaneous) {
                secondLabel.html(currTrial.A + "&nbsp;&nbsp;&nbsp;" + currTrial.B).text();
            } else {
                secondLabel.text(currTrial.B);
            }
            
            setBtnLocation(secondLabel, parseInt(currTrial.location));

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
            setBtnLocation(firstLabel, parseInt(currTrial.location));

            // check if we have simulataneous presentations enabled
            if (currExp.tSimultaneous) {
                secondLabel.html(currTrial.A + "&nbsp;&nbsp;&nbsp;" + currTrial.B).text();
            } else {
                secondLabel.text(currTrial.B);
            }

            setBtnLocation(secondLabel, parseInt(currTrial.location));

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

        console.log(stimulusList);

        currStimulus = stimulusList.pop();

        currTrial = setupTrial(currStimulus);

        //console.log(currTrial);

        board.css("background", "#FFF");
        firstLabel.text(currTrial.A);
        setBtnLocation(firstLabel, parseInt(currTrial.location));

        secondLabel.text(currTrial.B);
        setBtnLocation(secondLabel, parseInt(currTrial.location));

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
        setBtnLocation(firstLabel, parseInt(currTrial.location));

        secondLabel.text(currTrial.B);
        setBtnLocation(secondLabel, parseInt(currTrial.location));

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
    temp.location = stim.location;

    if (currPhase == EvaluationPhase) {
        temp.test = currTest;

        switch (currTest) {
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

    setTimeout(withinTimerTick, withinDuration);
}

function withinTimerTick() {
    secondLabel.show();

    setTimeout(secondTimerTick, secondDuration);
}

function secondTimerTick() {
    secondLabel.hide();

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
        runEvaluationTrial();
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
    if (setupEvaluation()) {
        showInstructions(currInstructionText);
    }
}

function setupPretraining() {
    currPhase = PretrainingMode;

    stimulusList.length = 0; // clear the array

    for (var i = 0; i < currExp.ptTrials; i++) {
        stimulusList.push({ "A": "Red", "B": "Color", "type": 1, "location": Center });
        stimulusList.push({ "A": "Dog", "B": "Bone", "type": 1, "location": Center });
        stimulusList.push({ "A": "Cat", "B": "Mouse", "type": 1, "location": Center });
        stimulusList.push({ "A": "Peanut Butter", "B": "Jelly", "type": 1, "location": Center });
        stimulusList.push({ "A": "Peas", "B": "Carrots", "type": 1, "location": Center });
        stimulusList.push({ "A": "Ketchup", "B": "Mustard", "type": 1, "location": Center });
        stimulusList.push({ "A": "Cow", "B": "Farm", "type": 1, "location": Center });
    }

    shuffleArray(stimulusList);

    firstDuration = 1000;
    secondDuration = 1000;
    withinDuration = 500;
    betweenDuration = 3000;

    currInstructionText = currExp.ptInstructionText;
    board.css("background", "#FFF");
    hideBoard();

    return true;
}

function setupPretrainingEval() {
    currPhase = PretrainingEvalPhase;

    stimulusList.length = 0; // clear the array

    for (var i = 0; i < currExp.ptYesTrials; i++) {
        stimulusList.push({ "A": "Red", "B": "Color", "type": 1, "location": Center });
        stimulusList.push({ "A": "Dog", "B": "Bone", "type": 1, "location": Center });
        stimulusList.push({ "A": "Cat", "B": "Mouse", "type": 1, "location": Center });
        stimulusList.push({ "A": "Peanut Butter", "B": "Jelly", "type": 1, "location": Center });
        stimulusList.push({ "A": "Peas", "B": "Carrots", "type": 1, "location": Center });
        stimulusList.push({ "A": "Ketchup", "B": "Mustard", "type": 1, "location": Center });
        stimulusList.push({ "A": "Cow", "B": "Farm", "type": 1, "location": Center });
    }

    for (var i = 0; i < currExp.ptNoTrials; i++) {
        stimulusList.push({ "A": "Soap", "B": "Exit", "type": 0, "location": Center });
        stimulusList.push({ "A": "Right", "B": "Cloud", "type": 0, "location": Center });
        stimulusList.push({ "A": "Blue", "B": "Camel", "type": 0, "location": Center });
        stimulusList.push({ "A": "Button", "B": "Tomato", "type": 0, "location": Center });
        stimulusList.push({ "A": "Candy", "B": "Different", "type": 0, "location": Center });
        stimulusList.push({ "A": "Eggs", "B": "Shoe", "type": 0, "location": Center });
        stimulusList.push({ "A": "Flower", "B": "Black", "type": 0, "location": Center });
    }

    shuffleArray(stimulusList);

    currPassCriteria = currExp.ptPassCriteria;
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

    for (var i = 0; i < currExp.tTrials; i++) {
        stimulusList.push({ "A": "CUZ", "B": "PIP", "type": 1, "location": currExp.tLocation1});
        stimulusList.push({ "A": "PIP", "B": "FIP", "type": 1, "location": currExp.tLocation2});
        stimulusList.push({ "A": "ZAC", "B": "DUZ", "type": 1, "location": currExp.tLocation3});
        stimulusList.push({ "A": "DUZ", "B": "VAM", "type": 1, "location": currExp.tLocation4});
        stimulusList.push({ "A": "ZID", "B": "JOM", "type": 1, "location": currExp.tLocation5});
        stimulusList.push({ "A": "JOM", "B": "XAD", "type": 1, "location": currExp.tLocation6});
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

    for (var i = 0; i < currExp.tTrials; i++) {
        stimulusList.push({ "A": "CUZ", "B": "PIP", "type": 1, "location": currExp.tLocation1 });
        stimulusList.push({ "A": "PIP", "B": "FIP", "type": 1, "location": currExp.tLocation2 });
        stimulusList.push({ "A": "ZAC", "B": "DUZ", "type": 1, "location": currExp.tLocation3 });
        stimulusList.push({ "A": "DUZ", "B": "VAM", "type": 1, "location": currExp.tLocation4 });
        stimulusList.push({ "A": "ZID", "B": "JOM", "type": 1, "location": currExp.tLocation5 });
        stimulusList.push({ "A": "JOM", "B": "XAD", "type": 1, "location": currExp.tLocation6 });
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
    currPhase = EvaluationPhase;

    testList.length = 0;

    // decide which tests we're going to do
    if (currExp.symmEnabled) {
        testList.push(SymmetryID);

        // YES trials
        for (var i = 0; i < currExp.eYesTrials; i++) {
            symmStimulusList.push({ "A": "PIP", "B": "CUZ", "type": 1, "location": currExp.symmLocation1 });
            symmStimulusList.push({ "A": "FIP", "B": "PIP", "type": 1, "location": currExp.symmLocation2 });
            symmStimulusList.push({ "A": "DUZ", "B": "ZAC", "type": 1, "location": currExp.symmLocation3 });
            symmStimulusList.push({ "A": "VAM", "B": "DUZ", "type": 1, "location": currExp.symmLocation4 });
            symmStimulusList.push({ "A": "JOM", "B": "ZID", "type": 1, "location": currExp.symmLocation5 });
            symmStimulusList.push({ "A": "XAD", "B": "JOM", "type": 1, "location": currExp.symmLocation6 });
        }

        // NO trials
        for (var i = 0; i < currExp.eNoTrials; i++) {
            symmStimulusList.push({ "A": "CUZ", "B": "ZAC", "type": 0, "location": currExp.symmLocation1 });
            symmStimulusList.push({ "A": "PIP", "B": "DUZ", "type": 0, "location": currExp.symmLocation2 });
            symmStimulusList.push({ "A": "FIP", "B": "VAM", "type": 0, "location": currExp.symmLocation3 });
            symmStimulusList.push({ "A": "ZAC", "B": "ZID", "type": 0, "location": currExp.symmLocation4 });
            symmStimulusList.push({ "A": "DUZ", "B": "JOM", "type": 0, "location": currExp.symmLocation5 });
            symmStimulusList.push({ "A": "VAM", "B": "XAD", "type": 0, "location": currExp.symmLocation6 });
        }

        shuffleArray(symmStimulusList);
    }

    if (currExp.transEnabled) {
        testList.push(TransitivityID);

        // YES trials
        for (var i = 0; i < currExp.eYesTrials; i++) {
            transStimulusList.push({ "A": "CUZ", "B": "FIP", "type": 1, "location": currExp.transLocation1 });
            transStimulusList.push({ "A": "ZAC", "B": "VAM", "type": 1, "location": currExp.transLocation2 });
            transStimulusList.push({ "A": "ZID", "B": "XAD", "type": 1, "location": currExp.transLocation3 });
        }

        // NO trials
        for (var i = 0; i < currExp.eNoTrials; i++) {
            transStimulusList.push({ "A": "FIP", "B": "ZAC", "type": 0, "location": currExp.transLocation1 });
            transStimulusList.push({ "A": "CUZ", "B": "VAM", "type": 0, "location": currExp.transLocation2 });
            transStimulusList.push({ "A": "ZAC", "B": "XAD", "type": 0, "location": currExp.transLocation3 });
        }

        shuffleArray(transStimulusList);
    }

    if (currExp.equivEnabled) {
        testList.push(EquivalenceID);

        // YES trials
        for (var i = 0; i < currExp.eYesTrials; i++) {
            equivStimulusList.push({ "A": "FIP", "B": "CUZ", "type": 1, "location": currExp.equivLocation1 });
            equivStimulusList.push({ "A": "VAM", "B": "ZAC", "type": 1, "location": currExp.equivLocation2 });
            equivStimulusList.push({ "A": "XAD", "B": "ZID", "type": 1, "location": currExp.equivLocation3 });
        }

        // NO trials
        for (var i = 0; i < currExp.eNoTrials; i++) {
            equivStimulusList.push({ "A": "CUZ", "B": "DUZ", "type": 0, "location": currExp.equivLocation1 });
            equivStimulusList.push({ "A": "ZAC", "B": "JOM", "type": 0, "location": currExp.equivLocation2 });
            equivStimulusList.push({ "A": "ZID", "B": "PIP", "type": 0, "location": currExp.equivLocation3 });
        }

        shuffleArray(equivStimulusList);
    }

    if (currExp.eTrialOrder == Mixed) shuffleArray(testList);

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

    console.log(stimulusList);

    firstDuration = currExp.eFirstDuration * 1000;
    secondDuration = currExp.eSecondDuration * 1000;
    withinDuration = currExp.eWithinDuration * 1000;
    betweenDuration = currExp.eBetweenDuration * 1000;

    currInstructionText = currExp.eInstructionText;
    board.css("background", "#FFF");
    hideBoard();

    return true;
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

    correctNeeded = Math.round(currPassCriteria * phaseTrialCount);

    console.log("Correct needed: " + correctNeeded + ", Correct count: " + correctCount);

    if (correctCount >= correctNeeded) return true;

    return false;
}

function loadData() {
    spinner.show();

    $.get("../Data/Load", function (data) {
        currDataLog = data;

        console.log(data);

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

