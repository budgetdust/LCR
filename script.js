document.addEventListener('DOMContentLoaded', () => {
    const leftButton = document.getElementById('leftButton');
    const centerButton = document.getElementById('centerButton');
    const rightButton = document.getElementById('rightButton');
    const feedbackDiv = document.getElementById('feedback');

    function recordShot(selection) {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        // Send data to the backend (Google Apps Script)
        fetch('https://script.google.com/macros/s/AKfycbwKs9Xj6HVLipGFmlbcQxpfmIPCrvK05c-NysY4GxiIsjoqAPuDbUNcURz80fo8zjo/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, time, selection }),
        })
        .then(response => response.json())
        .then(data => {
            feedbackDiv.textContent = data.message || 'Shot recorded!';
        })
        .catch(error => {
            console.error('Error sending data:', error);
            feedbackDiv.textContent = 'Error recording shot.';
        });
    }

    leftButton.addEventListener('click', () => recordShot('Left'));
    centerButton.addEventListener('click', () => recordShot('Center'));
    rightButton.addEventListener('click', () => recordShot('Right'));
});