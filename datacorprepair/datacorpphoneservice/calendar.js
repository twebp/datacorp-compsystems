const calendarMonth = document.querySelector('#calendar-month');
const calendarDays = document.querySelector('#calendar-days');
const previousMonthButton = document.querySelector('#previous-month');
const nextMonthButton = document.querySelector('#next-month');
const timeSelection = document.querySelector('#time-selection');
const selectDateText = document.querySelector('#selected-date');
const appointmentDate = document.querySelector('#appointment-date');
const appointmentTime = document.querySelector('#appointment-time');
const reviewButton = document.querySelector('#review-button');
const timeSlots = document.querySelectorAll('.time-slot');

const confirmationStep = document.querySelector('.form-set[data-step="4"]');
const confirmationDevice = document.querySelector('#confirmation-device');
const confirmationDate = document.querySelector('#confirmation-date');
const confirmationTime = document.querySelector('#confirmation-time');
const confirmationIssues = document.querySelector('#confirmation-issues');
const confirmationIssuesDetails = document.querySelector('#confirmation-issues-details');
const customerNotes = document.querySelector('[name="phone-issue-details"]');

const confirmationBrand = document.querySelector('#phone-brand');
const confirmationModel = document.querySelector('#phone-model');
const confirmationIssueCheckBoxes = document.querySelectorAll('.issue-checkbox');

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


createCalendar();



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
//Review Appointment
reviewButton.addEventListener('click', () => { 
    const brandName = 
    confirmationBrand.options[
        confirmationBrand.selectedIndex
    ].text;
    const modelName = confirmationModel.options[
        confirmationModel.selectedIndex
    ].text;
    confirmationDevice.textContent = 
    `${brandName} ${modelName}`;
    const selectedIssues = 
    Array.from(confirmationIssueCheckBoxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.parentElement.textContent.trim()
    );
   
    confirmationIssues.textContent = selectedIssues.join(', ');

    confirmationIssuesDetails.textContent = 
        customerNotes.value.trim() || 'None provided';
   

    confirmationDate.textContent = selectedAppointmentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    
    confirmationTime.textContent = selectedAppointmentTime;

appointmentStep.hidden = true;
appointmentStep.disabled = true;

confirmationStep.hidden = false;
confirmationStep.disabled = false;

});

//back button functionality
const backButtons = document.querySelectorAll('.back-button');

backButtons.forEach(button => {

    button.addEventListener ('click', () => {

        const currentFieldset =
            button.closest('.form-set');

        const currentStep =
            Number(currentFieldset.dataset.step);

        const previousStep =
                currentStep - 1;
                currentFieldset.hidden = true;
                currentFieldset.disabled = true;

        const previousFieldset = document.querySelector(`.form-set[data-step="${previousStep}"]`

        );
        if (previousFieldset) {
            previousFieldset.hidden = false;
            previousFieldset.disabled = false;
        }

    });
}); 



const deviceBackButton = document.querySelector('#back-device');

//return to repairshop
    deviceBackButton.addEventListener('click', () => {
        //return to previous page
        window.history.back();
    });

    const phoneForm =
    document.querySelector('#phone-form');

phoneForm.addEventListener('submit', () => {

    document
        .querySelectorAll('.form-set')
        .forEach(fieldset => {

            fieldset.disabled = false;

        });

});