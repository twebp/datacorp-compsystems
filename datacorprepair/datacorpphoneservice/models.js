const brandSelect = document.querySelector('#phone-brand');
const modelSelect = document.querySelector('#phone-model');
const modelGroup = document.querySelector('.model-group');

const deviceNextButton = document.querySelector('#device-next');

const nextButton = document.querySelectorAll('.next-button');
const backButton = document.querySelectorAll('.back-button');

const reportIssueFieldset = document.querySelector('.report-issue');
const fieldsetActive = document.querySelector('fieldset.active');

const issueCheckbox = document.querySelectorAll('.issue-checkbox');
const continueButton = document.querySelectorAll('.continue-button');

const appointmentStep = document.querySelector('.appointment-step');

// Disable the next button initially
brandSelect.addEventListener('change', () => {
    if (brandSelect.value !== '') {
        nextButton.disabled = false;
    }
    else {
        nextButton.disabled = true;
    }
});


//Phone Models
const phoneModels = {
    'Apple': [
        'iPhone 18',
        'iPhone 17',
        'iPhone 16',
        'iPhone 15',
        'Older iPhone',
    ],

    'Samsung': [
        'Galaxy S26',
        'Galaxy S25',
        'Galaxy Z Flip 5',
        'Galaxy S24',
        'Older Samsung',
    ],
    
    'Google': [
        'Pixel 10',
        'Pixel 9',
        'Pixel 8',
        'Pixel 7', 
        'Older Pixel',
    ],

    'OnePlus': [
        'OnePlus 15',
        'OnePlus 13',
        'OnePlus 12',
        'OnePlus 11', 
        'Older OnePlus',
    ],
    'Other': 
    [

    ]
};
//Brand / Model
brandSelect.addEventListener('change', () => {
    const selectedBrand = brandSelect.value;

    modelSelect.innerHTML = 
    '<option value="">Select a model</option>';

    if (selectedBrand === '') {
        modelGroup.hidden = true;
        return;
    }

    phoneModels[selectedBrand].forEach(model => {

        const  option = document.createElement('option');
        option.value = model;
        option.textContent = model;

        modelSelect.appendChild(option);
    });

        modelGroup.hidden = false;
   });

//Enable the next button when a model is selected
modelSelect.addEventListener('change', () => {
    if (modelSelect.value !== '') {
        deviceNextButton.disabled = false;
    }
    else {
        deviceNextButton.disabled = true;
    }
});

// Enable report issue fieldset when next button is clicked 
reportIssueFieldset.hidden = true;
nextButton.forEach(button => {
    button.addEventListener('click', () => {
        reportIssueFieldset.hidden = false;
        button.disabled = true;
    });
});

//disable fieldset active when next button is clicked
fieldsetActive.hidden = false;
nextButton.forEach(button => {
    button.addEventListener('click', () => {
        fieldsetActive.hidden = true;
    });
});

//enable continue button when checkbox is selected
issueCheckbox.forEach(checkBox => {
    checkBox.addEventListener('change', ()=>{
        continueButton.forEach(button => {
            button.disabled = !Array.from(issueCheckbox).some(cb => cb.checked);
            if (button.disabled) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        });
    });
});

//Continue button functionality
continueButton.forEach(button => {
    button.addEventListener('click', () => {
        appointmentStep.hidden = false;
    });
});
// hide issue fieldset after continue button is clicked
continueButton.forEach(button => {
    button.addEventListener('click', () => {
        reportIssueFieldset.hidden = true;
        appointmentStep.hidden = false;
    });
});