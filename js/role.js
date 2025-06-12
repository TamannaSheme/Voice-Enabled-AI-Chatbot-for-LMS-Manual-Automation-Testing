// Ensure this is globally accessible
window.handleRole = function handleRole(role) {
    if (role === 'student') {
        window.location.href = 'student.html';
    } else if (role === 'instructor') {
        window.location.href = 'instructor.html';
    } else if (role === 'admin') {
        window.location.href = 'admin.html';
    }
};
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");

    if (cards.length >= 5) {
        cards[0].addEventListener("click", () => window.location.href = 'enrolled-courses.html');
        cards[1].addEventListener("click", () => window.location.href = 'upcoming-deadlines.html');
        cards[2].addEventListener("click", () => window.location.href = 'submit-assignment.html');
        cards[3].addEventListener("click", () => window.location.href = 'view-grades.html');
        cards[4].addEventListener("click", () => window.location.href = 'notifications.html');
    }

    if (cards.length >= 6) {
        cards[5].addEventListener("click", redirectToAskLumi);
    }

    function redirectToAskLumi() {
        window.location.href = "ask-lumi.html";
    }
});

