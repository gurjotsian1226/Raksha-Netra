// (The mental-wellbeing.js code from before goes here, unchanged)
document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('mentalWellbeingQuiz');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const quizResults = document.getElementById('quizResults');
    const scoreMessage = document.getElementById('scoreMessage');
    const resetQuizButton = document.getElementById('resetQuiz');

    const totalQuestions = 6;
    const maxScorePerQuestion = 4; // 'A' option gives 4 points
    const maxPossibleScore = totalQuestions * maxScorePerQuestion; // 6 * 4 = 24

    let userScores = {}; // To store scores for each question

    // Event listener for changes in radio buttons
    quizForm.addEventListener('change', (event) => {
        if (event.target.type === 'radio') {
            const questionName = event.target.name; // e.g., 'q1'
            const score = parseInt(event.target.value); // The point value of the selected answer

            userScores[questionName] = score; // Store or update the score for this question

            updateProgressBar();
            checkQuizCompletion();
        }
    });

    // Function to update the progress bar
    function updateProgressBar() {
        const answeredQuestions = Object.keys(userScores).length;
        const progressPercentage = (answeredQuestions / totalQuestions) * 100;

        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${Math.round(progressPercentage)}%`;
    }

    // Function to check if all questions are answered and show results
    function checkQuizCompletion() {
        if (Object.keys(userScores).length === totalQuestions) {
            calculateAndDisplayScore();
            quizResults.style.display = 'block'; // Show results section
        } else {
            quizResults.style.display = 'none'; // Hide if not all questions are answered
        }
    }

    // Function to calculate and display the final score and message
    function calculateAndDisplayScore() {
        let totalScore = 0;
        for (const question in userScores) {
            totalScore += userScores[question];
        }

        const percentageScore = (totalScore / maxPossibleScore) * 100;
        let message = '';

        if (percentageScore >= 80) {
            message = `Your score: ${totalScore}/${maxPossibleScore} (${Math.round(percentageScore)}%). You demonstrate a strong foundation for mental well-being. Keep up the great work in nurturing your inner strength!`;
        } else if (percentageScore >= 60) {
            message = `Your score: ${totalScore}/${maxPossibleScore} (${Math.round(percentageScore)}%). You're doing well, but there might be areas where you could further support your mental well-being. Explore our resources for tips!`;
        } else if (percentageScore >= 40) {
            message = `Your score: ${totalScore}/${maxPossibleScore} (${Math.round(percentageScore)}%). It looks like you might be facing some challenges. Remember, it's okay to not be okay, and support is available. Please consider reaching out to a mental health professional or utilizing our support network.`;
        } else {
            message = `Your score: ${totalScore}/${maxPossibleScore} (${Math.round(percentageScore)}%). It seems like your mental well-being might need significant attention. Please know you're not alone. We strongly encourage you to seek professional help and utilize the immediate support resources available on Raksha Netra.`;
        }
        scoreMessage.textContent = message;
    }

    // Reset Quiz functionality
    resetQuizButton.addEventListener('click', () => {
        quizForm.reset(); // Resets all radio button selections
        userScores = {}; // Clear stored scores
        updateProgressBar(); // Reset progress bar
        quizResults.style.display = 'none'; // Hide results
        scoreMessage.textContent = ''; // Clear message
    });

    // Initial update of progress bar in case of page reload with answers (though typically not needed for a fresh load)
    updateProgressBar();
});