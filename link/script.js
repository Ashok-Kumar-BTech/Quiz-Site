const correctAnswers = [
    'C', 'A', 'C', 'A', 'B',
    'B', 'B', 'C', 'C', 'D',
    'B', 'A', 'B', 'C', 'C',
    'D', 'A', 'C', 'A', 'D'
  ];
  
  let userAnswers = [];
  const totalQuestions = correctAnswers.length;
  const timePerQuestion = 10; // Time given for each question in seconds
  let totalTime = totalQuestions * timePerQuestion; // Total time in seconds
  let timer;

  function navigateTo(pageId) {
    document.querySelectorAll('.head > div').forEach(div => div.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  }

  function submitQuiz() {
    // Collect user answers
    userAnswers = [];
    for (let i = 1; i <= totalQuestions; i++) {
      let answer = document.querySelector(`input[name="q${i}"]:checked`);
      userAnswers.push(answer ? answer.value : null);
    }

    // Calculate score
    let correctCount = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        correctCount++;
      }
    }
    let percentage = (correctCount / totalQuestions) * 100;
    document.getElementById('score').innerText = `Score: ${correctCount}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    navigateTo('result');
    clearInterval(timer);
  }

  function retakeQuiz() {
    userAnswers = [];
    totalTime = totalQuestions * timePerQuestion; // Reset total time
    navigateTo('home');
  }

  function startTimer() {
    timer = setInterval(() => {
      totalTime--;
      if (totalTime <= 0) {
        clearInterval(timer);
        submitQuiz();
      } else {
        document.getElementById('timer').innerText = `Time left: ${Math.floor(totalTime / 60)}:${totalTime % 60 < 10 ? '0' : ''}${totalTime % 60}`;
      }
    }, 1000);
  }

  // Start timer when quiz starts
  document.querySelector('#home button').addEventListener('click', () => {
    navigateTo('pg1');
    startTimer();
  });

  // Initial page load setup
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.head > div').forEach(div => div.classList.remove('active'));
    document.getElementById('home').classList.add('active');
  });