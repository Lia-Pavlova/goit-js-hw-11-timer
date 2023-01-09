// таймер обратного отсчета

class CountdownTimer {
  constructor({ targetDate, selector }) {
    this.targetDate = targetDate;
    this.selector = document.querySelector(selector);

    this.intervalId = null;
  }

  getRefs() {
    const daysRef = this.selector.querySelector('[data-value="days"]');
    const hoursRef = this.selector.querySelector('[data-value="hours"]');
    const minsRef = this.selector.querySelector('[data-value="mins"]');
    const secsRef = this.selector.querySelector('[data-value="secs"]');

    return { daysRef, hoursRef, minsRef, secsRef };
  }

  updateTimer({ daysRef, hoursRef, minsRef, secsRef }) {
    const time = this.targetDate - Date.now();

    const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString();
    const hours = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ).toString();
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString();
    const secs = Math.floor((time % (1000 * 60)) / 1000).toString();

    if (time < 0) {
      clearInterval(this.intervalId);
      this.selector.innerHTML = '<h1>Time is over</h1>';
      return;
    }

    // daysRef.textContent = days < 10 ? `0${days}` : days;
    daysRef.textContent = days.padStart(2, "0");
    hoursRef.textContent = hours.padStart(2, "0");
    minsRef.textContent = mins.padStart(2, "0");
    secsRef.textContent = secs.padStart(2, "0");
  }

    // метод pad (from Репета), приводит к строке и добавляет в начало 0, 
    // если число меньше 2-х знаков: 1 -> то вернет 01; 11 -> 11

   //  pad(value) {
   //    return String(value).padStart(2, "0");
   //  }
    
  startTimer() {
    this.intervalId = setInterval(() => {
      this.updateTimer(this.getRefs());
    }, 1000);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2024 00:00'),
});

timer.startTimer();
