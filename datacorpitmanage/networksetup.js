
//continue button client type selection
const clientTypeOption = document.querySelectorAll('input[name="client-type"]');
const firstContinueButton = document.querySelector('.form-set[data-step="1"] .continue-button');

clientTypeOption.forEach(option => {
    option.addEventListener('change', () =>{
        firstContinueButton.disabled = false;
    });
});

//continue button after client type selection
const stepOne = document.querySelector('.form-set[data-step="1"]');
const stepTwo = document.querySelector('.form-set[data-step="2"]');
firstContinueButton.addEventListener('click', () => {
    stepOne.hidden = true;
    stepOne.disabled = true;

    stepTwo.hidden = false;
    stepTwo.disabled = false;
});
// continue button after network service selection
const networkSetupOption = document.querySelector('input[value="Network Setup"]');
const secondContinueButton = document.querySelector('.form-set[data-step="2"] .continue-button');
    networkSetupOption.addEventListener('change', () => {
        secondContinueButton.disabled = false;
});
// continue click activates step 3 or 4 based on client type selection
const stepThree = document.querySelector('.form-set[data-step="3"]');
const stepFour = document.querySelector('.form-set[data-step="4"]');

secondContinueButton.addEventListener('click', () => {
    const selectedClient = document.querySelector('input[name="client-type"]:checked');
    stepTwo.hidden = true;
    stepTwo.disabled = true;
    if (selectedClient.value === 'Home') {
        stepThree.hidden = false;
        stepThree.disabled = false;
    }
    if (selectedClient.value === 'Business') {
        stepFour.hidden = false;
        stepFour.disabled = false;
    }
});
//Step 3 check box selection enables continue button
const homeNetworkOptions = stepThree.querySelectorAll('input[name="home-network-services"]');
const thirdContinueButton = stepThree.querySelector('.continue-button');
    homeNetworkOptions.forEach(option => {
        option.addEventListener('change', () => {

            const oneSelected = Array.from(homeNetworkOptions).some(checkbox => checkbox.checked);
            thirdContinueButton.disabled = !oneSelected;
        });
    });
//Step 4 check box selection enables continue button
const businessNetworkOptions = stepFour.querySelectorAll('input[name="business-network-services"]');
const fourthContinueButton = stepFour.querySelector('.continue-button');
businessNetworkOptions.forEach (option => {
    option.addEventListener('change', () => {
        const oneSelected = Array.from(businessNetworkOptions).some(checkbox => checkbox.checked);
        fourthContinueButton.disabled = !oneSelected;
    });
});
//Step 5 activated by Third Continue button click
const stepFive = document.querySelector('.form-set[data-step="5"]');
 thirdContinueButton.addEventListener('click', () => {
    stepThree.hidden = true;
    stepThree.disabled = true;

    stepFive.hidden = false;
    stepFive.disabled = false;
});
//step 5 activated by Fourth Continue button click
fourthContinueButton.addEventListener('click', () => {
    stepFour.hidden = true;
    stepFour.disabled = true;

    stepFive.hidden =  false;
    stepFive.disabled = false;
    });



//Calendar and time selection
const calendarMonth = document.querySelector('#calendar-month');
const calendarDays = document.querySelector('#calendar-days');
const previousMonthButton = document.querySelector('#previous-month');
const nextMonthButton = document.querySelector('#next-month');
const timeSelection = document.querySelector('#time-selection');
const selectDateText = document.querySelector('#selected-date');
const appointmentDate = document.querySelector('#appointment-date');
const appointmentTime = document.querySelector('#appointment-time');
const timeSlots = document.querySelectorAll('.time-slot');




let selectedAppointmentDate = null;
let selectedAppointmentTime = null;
let displayedDate = new Date();

function createCalendar() {
    calendarDays.innerHTML = '';

    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();
    
    const firstDay = 
    new Date(year, month, 1).getDay();
    
    const numberOfDays =
     new Date(year, month + 1, 0).getDate();

// Update the calendar month and year display
calendarMonth.textContent = 
    displayedDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });


for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');

    calendarDays.appendChild(blank);
}

for (let day = 1; day <= numberOfDays; day ++) {
    const dayButton = 
    document.createElement('button');

    dayButton.type = 'button';
    
    dayButton.classList.add('calendar-day');

    dayButton.textContent = day;

    const currentDate = new Date(year, month, day);
// Disable past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (currentDate < today) {
        dayButton.disabled = true;
    }

 if (selectedAppointmentDate && currentDate.toDateString() ===
    selectedAppointmentDate.toDateString()
) {
    dayButton.classList.add('selected');
}
   
dayButton.addEventListener('click', () => {
        selectDate(currentDate, dayButton);
    });
    calendarDays.appendChild(dayButton);
}
}
//Select Appointment Date
function selectDate(date, button) {

    document.querySelectorAll('.calendar-day').forEach(dayButton => {
        dayButton.classList.remove('selected');
    });

    button.classList.add('selected');

    selectedAppointmentDate = date;
   
    selectDateText.textContent = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    appointmentDate.value = date.toISOString().split('T')[0];
    timeSelection.style.display = 'block';

}

//Iniitiate calendar creation on page load
createCalendar();


//calendar navigation buttons
previousMonthButton.addEventListener('click', ()=> {
    displayedDate.setMonth(displayedDate.getMonth() - 1);
    createCalendar();
});
nextMonthButton.addEventListener('click', () => {
    displayedDate.setMonth(displayedDate.getMonth() + 1
);
    createCalendar();
});

//Select Appointment Time
timeSlots.forEach(timeButton => {
    timeButton.addEventListener('click',() => {
        timeSlots.forEach(button => {
            button.classList.remove('selected');
        });
        timeButton.classList.add('selected');

            selectedAppointmentTime = timeButton.textContent.trim();

            appointmentTime.value = selectedAppointmentTime;

        reviewButton.disabled = false;
    });
});
//Review button click activates confirmation step
const reviewButton = document.querySelector('#review-button');
const confirmationStep = document.querySelector('.form-set[data-step="6"]');
   

// Review Appointment / Confirmation


const confirmationClient = document.querySelector('#confirmation-client');

const confirmationDate = document.querySelector('#confirmation-date');

const confirmationTime = document.querySelector('#confirmation-time');

const confirmationTypeOfService = document.querySelector('#confirmation-type-of-service');


const homeContactInformation = document.querySelector('.home-contact-information');

const businessContactInformation = document.querySelector('.business-contact-information');

const confirmationDetailNotes = document.querySelector('#confirmation-detail-notes');

const generalServiceDetails = document.querySelector('textarea[name="it-service-details"]');

const homeNetworkDetails = document.querySelector('textarea[name="home-network-service-details"]');

const businessNetworkDetails = document.querySelector('textarea[name="business-network-service-details"]');


reviewButton.addEventListener('click', () => {

    const selectedClient =
        document.querySelector(
            'input[name="client-type"]:checked'
        );


    // Client type
    confirmationClient.textContent =
        selectedClient.value;


    // Appointment date
    confirmationDate.textContent =
        selectedAppointmentDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });


    // Appointment time
    confirmationTime.textContent =
        selectedAppointmentTime;


    // Network services
    let selectedServices = [];

    if (selectedClient.value === 'Home') {

        selectedServices =
            Array.from(homeNetworkOptions)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

    }

    if (selectedClient.value === 'Business') {

        selectedServices =
            Array.from(businessNetworkOptions)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

    }

    confirmationTypeOfService.textContent =
        selectedServices.join(', ');

//customer notes
        const generalNotes = generalServiceDetails.value.trim();

        let networkNotes = '';

        if (selectedClient.value === 'Home') {
            networkNotes = homeNetworkDetails.value.trim();
        }
        if (selectedClient.value === 'Business') {
            networkNotes = businessNetworkDetails.value.trim();
        }

        const customerNotes = [generalNotes, networkNotes].filter(note => note !== '');

            confirmationDetailNotes.textContent = 
            customerNotes.length 
            ? customerNotes.join(' | ')
            : 'None provided';
        
    // Move from calendar to confirmation
    stepFive.hidden = true;
    stepFive.disabled = true;

    confirmationStep.hidden = false;
    confirmationStep.disabled = false;

if (selectedClient.value === 'Home') {

    homeContactInformation.hidden = false;
    homeContactInformation.disabled = false;

    businessContactInformation.hidden = true;
    businessContactInformation.disabled = true;

} else if (selectedClient.value === 'Business') {

    businessContactInformation.hidden = false;
    businessContactInformation.disabled = false;

    homeContactInformation.hidden = true;
    homeContactInformation.disabled = true;
}
});

//back button functionality
const previousPageButton = document.querySelector('#previous-page');


previousPageButton.addEventListener('click',() => {
    window.history.back();
});


const backButtons = document.querySelector('.back-button:not(#previous-page)');
const stepTwoBackButton = stepTwo.querySelector('.back-button');

const stepThreeBackButton = stepThree.querySelector('.back-button');
const stepFourBackButton = stepFour.querySelector('.back-button');

const stepFiveBackButton = stepFive.querySelector('.back-button');
const confirmationBackButtons = confirmationStep.querySelectorAll('.back-button');

stepTwoBackButton.addEventListener('click', ()=> {
    stepTwo.hidden = true;
    stepTwo.disabled = true;

    stepOne.hidden = false;
    stepOne.disabled = false;
});

stepThreeBackButton.addEventListener('click',()=> {
 
    stepThree.hidden = true;
    stepThree.disabled = true;

    stepTwo.hidden = false;
    stepTwo.disabled = false;
});

stepFourBackButton.addEventListener('click',()=> {
    stepFour.hidden = true;
    stepFour.disabled = true;

    stepTwo.hidden = false;
    stepTwo.disabled = false;
});

stepFiveBackButton.addEventListener('click', () => {

    const selectedClient = document.querySelector('input[name="client-type"]:checked');

    stepFive.hidden = true;
    stepFive.disabled = true;


    if (selectedClient.value === 'Home') {
        stepThree.hidden = false;
        stepThree.disabled = false;
    }
    if (selectedClient.value === 'Business') {
        stepFour.hidden = false;
        stepFour.disabled = false;
    }
});

// Review step back button functionality
confirmationBackButtons.forEach(backButton => {
    backButton.addEventListener('click',() => {
        confirmationStep.hidden = true;
        confirmationStep.disabled = true;

        stepFive.hidden = false;
        stepFive.disabled = false;


    });
});


//submit form
const itServiceForm =
    document.querySelector('#it-service-form');

itServiceForm.addEventListener('submit', () => {

    const selectedClient =
        document.querySelector(
            'input[name="client-type"]:checked'
        );

    // Shared steps
    stepOne.disabled = false;
    stepTwo.disabled = false;
    stepFive.disabled = false;
    confirmationStep.disabled = false;

    if (selectedClient.value === 'Home') {

        stepThree.disabled = false;
        stepFour.disabled = true;

        homeContactInformation.disabled = false;
        businessContactInformation.disabled = true;

    } else if (selectedClient.value === 'Business') {

        stepThree.disabled = true;
        stepFour.disabled = false;

        homeContactInformation.disabled = true;
        businessContactInformation.disabled = false;
    }

});

