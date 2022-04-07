let timeCounter;
const displayTime = document.querySelector('.timeLeft');
const displayEndTime = document.querySelector('.expectedEndTime');
const buttons = document.querySelectorAll('[data-time]');
const customTimerModal = document.querySelectorAll('[data-modal-target]');
const customTimerModalClose = document.querySelectorAll('[data-close-button]');
const pauseButton = document.querySelector('.pauseButton');
const resumeButton = document.querySelector('.resumeButton');
const voiceDropdown = document.querySelector('[name="voice"]')
const sound = new SpeechSynthesisUtterance();

let voices = [];

sound.text = 'Time is up! To start a new timer, please select a timer from above or make a custom timer.'

function populateVoices() {
    voices = this.getVoices();
    voiceDropdown.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
}

function setVoice() {
    sound.voice = voices.find(voice => voice.name === this.value);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voiceDropdown.addEventListener('change', setVoice);

customTimerModal.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal)
    });
});

customTimerModalClose.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal)
    });
});

function openModal(modal) {
    if(modal == null) return;
    modal.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return;
    modal.classList.remove('active')
}

displayRemainingTime(0);

function timer(seconds){

    clearInterval(timeCounter)

    const start = Date.now();
    const end = start + seconds * 1000;
    displayRemainingTime(seconds);
    showEndTime(end);
    displayEndTime.classList.remove('hidden');

   timeCounter = setInterval(() => {
        const timeLeft = Math.round((end - Date.now()) / 1000);
        const pauseTime = Math.round((end - Date.now()) / 1000);

        pauseButton.addEventListener('click', () => {
            clearInterval(timeCounter);
            displayRemainingTime(pauseTime);
            displayEndTime.classList.add('hidden');
        });

        resumeButton.addEventListener('click', () => {
            timer(pauseTime);
            displayRemainingTime(pauseTime);
        });

        if (timeLeft < 0) {
            clearInterval(timeCounter);
            displayEndTime.classList.add('hidden');
            speechSynthesis.speak(sound);
            return;
        }

        displayRemainingTime(timeLeft);
    }, 1000);
}


function displayRemainingTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds  % 60;
    const show = `${minutes} : ${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

    displayTime.textContent = show; 
}

function showEndTime(timestamp) {
    const finish = new Date(timestamp);
    const hour = finish.getHours();
    const updatedHour = hour > 12 ? hour - 12 :hour
    const minutes = finish.getMinutes();
    displayEndTime.textContent = `End Time ${updatedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);

}



buttons.forEach(button=> button.addEventListener('click', startTimer));

document.customTimerForm.addEventListener('submit', function(e){
e.preventDefault();
const time = this.minutes.value;
console.log(time);
timer(time * 60);
this.reset();
closeModal(modal);
});