
var currExp = {
    "version": "",
    "date": "",
    "id": "",
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

const GeneralID = 0;
const PretrainingID = 1;
const TrainingID = 2;
const EvaluationID = 3;

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

dataLogBtn.click(function () {
    showPopup("Hey, this is a popup!");
})

popupClose.click(function () {
    popup.toggleClass("show");
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
        console.log(currObj);
    }

    mapParameters();

    return true;
}

function mapParameters() {
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

    console.log(currExp);

    localStorage.setObject("experiment", currExp);
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