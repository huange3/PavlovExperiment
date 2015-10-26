
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
    "showFeedback":"",
    "symmEnabled": "",
    "symmPassCriteria": "",
    "symmRetrainLimit": "",
    "symmLocation1": "",
    "symmLocation2": "",
    "symmLocation3": "",
    "symmLocation4": "",
    "symmLocation5": "",
    "symmLocation6": "",
    "transEnabled": "",
    "transPassCriteria": "",
    "transRetrainLimit": "",
    "transLocation1": "",
    "transLocation2": "",
    "transLocation3": "",
    "equivEnabled": "",
    "equivPassCriteria": "",
    "equivRetrainLimit": "",
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
    "eInstructionText": ""
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
    "test": ""
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
    runTrial();
});

nextBtn.click(nextBtnClick);

yesBtn.click(function () {
    stopWatch.stop();
    checkAccuracy(1);
});

noBtn.click(function () {
    stopWatch.stop();
    checkAccuracy(0)
});

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
        currExp.symmEnabled = true;
        currExp.symmPassCriteria = 0.90;
        currExp.symmRetrainLimit = 3;
        currExp.symmLocation1 = 1;
        currExp.symmLocation2 = 1;
        currExp.symmLocation3 = 1;
        currExp.symmLocation4 = 1;
        currExp.symmLocation5 = 1;
        currExp.symmLocation6 = 1;

        currExp.transEnabled = true;
        currExp.transPassCriteria = 0.90;
        currExp.transRetrainLimit = 3;
        currExp.transLocation1 = 1;
        currExp.transLocation2 = 1;
        currExp.transLocation3 = 1;

        currExp.equivEnabled = true;
        currExp.equivPassCriteria = 0.90;
        currExp.equivRetrainLimit = 3;
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
    symmRetrainLB.val(currExp.symmRetrainLimit);

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
    transRetrainLB.val(currExp.transRetrainLimit);

    $('#transitivity-1 option[value="' + currExp.transLocation1 + '"]').prop("selected", true);
    $('#transitivity-2 option[value="' + currExp.transLocation2 + '"]').prop("selected", true);
    $('#transitivity-3 option[value="' + currExp.transLocation3 + '"]').prop("selected", true);

    if (currExp.equivEnabled) {
        equivalenceLB.prop("checked", true);
    } else {
        equivalenceLB.prop("checked", false);
    }

    equivPassLB.val(currExp.equivPassCriteria);
    equivRetrainLB.val(currExp.equivRetrainLimit);

    $('#equivalence-1 option[value="' + currExp.equivLocation1 + '"]').prop("selected", true);
    $('#equivalence-2 option[value="' + currExp.equivLocation2 + '"]').prop("selected", true);
    $('#equivalence-3 option[value="' + currExp.equivLocation3 + '"]').prop("selected", true);
}

function saveParameters() {
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
    currExp.symmRetrainLimit = symmRetrainLB.val();
    currExp.symmLocation1 = symmLocation1LB.val();
    currExp.symmLocation2 = symmLocation2LB.val();
    currExp.symmLocation3 = symmLocation3LB.val();
    currExp.symmLocation4 = symmLocation4LB.val();
    currExp.symmLocation5 = symmLocation5LB.val();
    currExp.symmLocation6 = symmLocation6LB.val();

    currExp.transEnabled = transitivityLB.is(":checked");
    currExp.transPassCriteria = transPassLB.val();
    currExp.transRetrainLimit = transRetrainLB.val();
    currExp.transLocation1 = transLocation1LB.val();
    currExp.transLocation2 = transLocation2LB.val();
    currExp.transLocation3 = transLocation3LB.val();

    currExp.equivEnabled = equivalenceLB.is(":checked");
    currExp.equivPassCriteria = equivPassLB.val();
    currExp.equivRetrainLimit = equivRetrainLB.val();
    currExp.equivLocation1 = equivLocation1LB.val();
    currExp.equivLocation2 = equivLocation2LB.val();
    currExp.equivLocation3 = equivLocation3LB.val();

    currExp.eTrialOrder = eTrialOrderLB.val();
    currExp.yesLocation = yesLocationLB.val();
    currExp.noLocation = yesLocationLB.val();
    currExp.eContextEnabled = eContextLB.is(":checked");
    currExp.eContextText = eContextTextLB.val();
    currExp.eContextYesText = eContextYesLB.val();
    currExp.eContextNoText = eContextNoLB.val();
    currExp.eInstructionText = eInstructionsLB.val();

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
    popupText.text(currText);
    popup.toggleClass("show");
}

function showInstructions(currText) {
    instructionText.html(currText.replace(/\n/g, '<br />')).text();
    instruction.toggleClass("show");
}

function runExperiment() {
    mainMenu.hide();
    board.show();

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
            if (currExp.mode == PretrainingMode) {
                endExperiment();
                return;
            }

            runTraining();
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

            console.log(currTrial);

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
}

function setupTrial(stim) {
    var temp = Object.create(trialObj);

    temp.phase = currPhase;
    temp.A = stim.A;
    temp.B = stim.B;
    temp.type = stim.type;
    temp.location = stim.location;

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

    if (currPhase == PretrainingPhase || currPhase == TrainingPhase) {
        setTimeout(betweenTimerTick, betweenDuration);
    } else {
        setBtnLocation(yesBtn, BottomLeft);
        setBtnLocation(noBtn, BottomRight);
        yesBtn.show();
        noBtn.show();
        stopWatch.start();
    }
}

function betweenTimerTick() {
    if (currPhase == PretrainingPhase || currPhase == TrainingPhase) {
        nextBtn.show();
        stopWatch.start();
    }
}

function nextBtnClick() {
    if (currPhase == PretrainingPhase
        || currPhase == TrainingPhase) stopWatch.stop(); // stopwatch already stopped in other phases

    nextBtn.hide();

    logTrial();
    runTrial();
}

function logTrial() {
    var currLatency = (stopWatch.time() / 1000).toFixed(3);
    currTrial.latency = currLatency;

    stopWatch.reset();

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

function runEvaluation() {

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

function endExperiment() {
    // TODO send data to api

    board.hide();
    mainMenu.show();
    showPopup("Experiment completed! Please see the test conductor for further instructions.");
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

function checkAccuracy(id) {
    yesBtn.hide();
    noBtn.hide();

    currTrial.userAnswer = id;

    if (id == currTrial.type) {
        currTrial.isCorrect = true;
        responseLabel.text("CORRECT");
        responseLabel.css("color", "green");
    } else {
        currTrial.isCorrect = false;
        responseLabel.text("INCORRECT");
        responseLabel.css("color", "red");
    }

    responseLabel.show();

    setTimeout(function () {
        responseLabel.hide();
        nextBtn.show();
    }, 2000);
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

