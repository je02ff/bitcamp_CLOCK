class DigitalClock {
    constructor(element) {
        this.element = element;
    }
    start() {
        setInterval(() => {
            this.update24();
        }, 500);
        setInterval(() => {
            this.update12();
        }, 500);
        setInterval(() => {
            this.updateAnalog();
        }, 500);

    }
    update24() {
        const time24 = this.getTime();
        const minuteFormatted = time24.min.toString().padStart(2, "0");
        const secFormatted = time24.sec.toString().padStart(2,"0");
        const time24formatted = `${time24.hour}:${minuteFormatted}:${secFormatted}`;
        
        this.element.querySelector(".clock-time24").textContent = time24formatted;
    }
    update12() {
        const time12= this.getTime();
        const hourFormatted = time12.hour % 12 || 12;
        const minuteFormatted = time12.min.toString().padStart(2, "0");
        const secFormatted = time12.sec.toString().padStart(2,"0");
        const time12formatted = `${hourFormatted}:${minuteFormatted}:${secFormatted}`;

        this.element.querySelector(".clock-time12").textContent = time12formatted;
        this.element.querySelector(".clock-ampm").textContent = time12.isAM ? "AM" : "PM";
    }
    updateAnalog() {
        const analogTime = this.getTime();
        const secondsRatio = analogTime.sec / 60;
        const minutesRatio = (secondsRatio + analogTime.min) / 60;
        
        const hourRatio = (minutesRatio + analogTime.hour) / 12;

        const hourHand = document.querySelector('[data-hour-hand]');
        const minuteHand = document.querySelector('[data-minute-hand]');
        const secondHand = document.querySelector('[data-second-hand]');
        this.setRotation(secondHand, secondsRatio);
        this.setRotation(minuteHand, minutesRatio);
        this.setRotation(hourHand, hourRatio);
        
    
    }
    setRotation(element, rotationRatio) {
        element.style.setProperty('--rotation', rotationRatio * 360);

    }
    getTime() {
        const now = new Date();

        return {
            hour: now.getHours(),
            min: now.getMinutes(),
            sec: now.getSeconds(),
            isAM: now.getHours() < 12
        };
    }
}

const clockElement24 = document.querySelector(".clock24");
const clockObject24 = new DigitalClock(clockElement24);
const clockElement12 = document.querySelector(".clock12");
const clockObject12 = new DigitalClock(clockElement12);
clockObject24.start();
clockObject12.start();

