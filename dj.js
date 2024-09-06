// Function to update time in a specified time container
function updateTime(containerClass, timeZoneOffset) {
    const container = document.querySelector(`.${containerClass}`);
    if (!container) return;

    setInterval(function() {
        const now = new Date();
        const localTime = new Date(now.getTime() + timeZoneOffset * 60 * 60 * 1000);
        let hour = localTime.getHours();
        const minutes = localTime.getMinutes();
        const seconds = localTime.getSeconds();
        const amOrpm = hour >= 24 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hour = hour % 12 || 12; // 0 should be 12

        // Format hours, minutes, and seconds to always be two digits
        const formattedHour = hour < 10 ? '0' + hour : hour;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        // Combine time components
        const formattedTime = `${formattedHour}${formattedMinutes}${formattedSeconds}`;
        const amPmTime = amOrpm === 'PM' ? '1' : '0'; // Use '1' for PM and '0' for AM
        const fullTime = formattedTime + amPmTime;

        // Get the digit divs for updating
        const digitDivs = Array.from(container.querySelectorAll('.digit'));
        const timeDigits = fullTime.split('');

        // Update each digit div with the appropriate time digit
        digitDivs.forEach((div, index) => {
            const digit = timeDigits[index];
            Array.from(div.querySelectorAll('li')).forEach((li) => {
                li.style.top = -(parseInt(digit) * 50) + 'px';
            });
        });

        // Update AM/PM
        const amPmDiv = container.querySelector('.am-pm');
        if (amPmDiv) {
            Array.from(amPmDiv.querySelectorAll('li')).forEach((li) => {
                li.style.top = -(amPmTime === '1' ? 1 : 0) * 50 + 'px'; // Adjust for AM/PM
            });
        }
    }, 1000); // Update every second
}

// Update Indian Time (UTC+5:30)
updateTime('indian-time', 5.5);

// Update American Time (Eastern Time, UTC-4 during daylight saving)
updateTime('american-time', -4);
