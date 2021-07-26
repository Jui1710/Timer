let hour = 0;
let minute = 0;
let second = 0;
let time1;
let isTimerOn = false;
let onpause_hour = 0;
let onpause_min = 0;
let onpause_sec = 0;



let start = document.getElementById("start");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
let stop = document.getElementById("stop");
let Timer = document.getElementById("Timer");
let inputDiv = document.getElementById("inputDiv");


function format(input) {
    return input < 10 ? `0${input}` : input;
}

Timer.addEventListener('click', event => {
    inputDiv.style.display = 'flex';
    stop.style.display = 'none';
    pause.style.display = 'none';
    start.style.display = 'block';
    reset.style.display = 'block';



    StopWatch.disabled = true;
    let ip_hour = document.getElementById("iphour");
    let ip_min = document.getElementById("ipminute");
    let ip_sec = document.getElementById("ipsecond");

    function validateInputs() {
        var input = parseInt(ip_hour.value);
        if (input < 0 || input > 24) {
            alert("invalid input");
            return false;
        }
        input = parseInt(ip_min.value);
        if (input < 0 || input > 60) {
            alert("invalid input");
            return false;
        }
        input = parseInt(ip_sec.value);
        if (input < 0 || input > 60) {
            alert("invalid input");
            return false;
        }
        return true;
    }

    reset.addEventListener('click', event => {
        clearInterval(time1);
        ip_hour.disabled = false;
        ip_min.disabled = false;
        ip_sec.disabled = false;
        StopWatch.disabled = false;
        location.reload();
    });



    start.addEventListener('click', event => {
        pause.style.display = 'block';
        start.style.display = 'none';
        if (!isTimerOn) {
            return validateInputs() ? timer(ip_hour.value, ip_min.value, ip_sec.value) : location.reload();
        }
        else {
            return timer(onpause_hour, onpause_min, onpause_sec);
        }
    });

    function timer(hour, minute, second) {
        ip_hour.disabled = true;
        ip_min.disabled = true;
        ip_sec.disabled = true;
        hour = hour === "" ? 0 : hour;
        minute = minute === "" ? 0 : minute;
        second = second === "" ? 0 : second;

        document.getElementById('second').innerText = format(second);
        document.getElementById('minute').innerText = format(minute);
        document.getElementById('hour').innerText = format(hour);
        isTimerOn = true;
        time1 = setInterval(() => {
            if (second > 0) {
                second--;
            }
            if ((minute !== 0) && (second === 0)) {
                minute--;
                second = 59;

            }
            if ((hour !== 0) && (minute === 0) && (second === 0)) {
                hour--;
                minute = 59;
                second = 59;
            }
            document.getElementById('second').innerText = format(second);
            document.getElementById('minute').innerText = format(minute);
            document.getElementById('hour').innerText = format(hour);
            if ((hour === 0) && (minute === 0) && (second === 0)) {
                start.disabled = false;
                clearInterval(time1);
                ip_hour.disabled = false;
                ip_min.disabled = false;
                ip_sec.disabled = false;
                StopWatch.disabled = false;
                alert("Timer finished.");
                isTimerOn = false;
            }
            pause.addEventListener('click', event => {
                pause.style.display = 'none';
                start.style.display = 'block';
                onpause_hour = hour;
                onpause_min = minute;
                onpause_sec = second;
                clearInterval(time1);
            });

        }, 1000);
    }
});


// stopwatch

let StopWatch = document.getElementById("StopWatch");

StopWatch.addEventListener('click', event => {
    pause.style.display = 'none';
    start.style.display = 'block';
    reset.style.display = 'block';
    stop.style.display = 'none';


    inputDiv.style.display = 'none';
    Timer.disabled = true;
    stop.addEventListener('click', event => {
        start.style.display = 'none';
        stop.style.display = 'none';
        clearInterval(time1);
        Timer.disabled = false;

    });


    reset.addEventListener('click', event => {
        clearInterval(time1);
        start.disabled = false;
        Timer.disabled = false;
        StopWatch.disabled = false;
        location.reload();
    });

    start.addEventListener('click', event => {
        start.style.display = 'none';
        stop.style.display = 'block';
        time1 = setInterval(() => {
            if (++second === 60) {
                second = 0;
                minute++;
            }
            if (minute === 60) {
                minute = 0;
                hour++;
            }
            document.getElementById('second').innerText = format(second);
            document.getElementById('minute').innerText = format(minute);
            document.getElementById('hour').innerText = format(hour);
        }, 1000);
    });
});
