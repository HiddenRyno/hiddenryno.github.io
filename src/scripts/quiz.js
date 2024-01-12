const questions = [
  {
    question: 'What is a common risk associated with using the Dark Web?',
    optionA: 'Winning a free vacation',
    optionB: 'Exposure to illegal activities',
    optionC: 'Finding too many friends',
    optionD: 'Improved internet speed',
    correctOption: 'optionB',
  },
  {
    question: 'Using the Dark Web can potentially expose you to:',
    optionA: 'Malware and cyber attacks',
    optionB: 'The best online shopping deals',
    optionC: 'Delicious cookie recipes',
    optionD: 'Free pizza every Friday',
    correctOption: 'optionA',
  },
  {
    question: 'Which is a safer practice while browsing online?',
    optionA: 'Sharing your passwords with friends',
    optionB: 'Using the same password everywhere',
    optionC: 'Using strong, unique passwords',
    optionD: 'Writing your passwords on a billboard',
    correctOption: 'optionC',
  },
  {
    question: 'What can result from careless use of the Dark Web?',
    optionA: 'A surprise party in your honor',
    optionB: 'Identity theft',
    optionC: 'Increased social media followers',
    optionD: 'A pet unicorn',
    correctOption: 'optionB',
  },
  {
    question: 'What should you avoid downloading from the Dark Web?',
    optionA: 'Nothing, it’s all safe',
    optionB: 'Unknown or suspicious files',
    optionC: 'Recipes for lasagna',
    optionD: 'Pictures of cute kittens',
    correctOption: 'optionB',
  },
  {
    question: 'Why is anonymity important for Dark Web users?',
    optionA: 'To win hide and seek',
    optionB: 'To avoid recognition by celebrities',
    optionC: 'For privacy and security',
    optionD: 'To become invisible',
    correctOption: 'optionC',
  },
  {
    question: 'What kind of information is risky to share online?',
    optionA: 'Your favorite color',
    optionB: 'Your personal and financial information',
    optionC: 'Your opinion about pineapple on pizza',
    optionD: 'Your love for sunsets',
    correctOption: 'optionB',
  },
  {
    question: 'Accessing illegal content on the Dark Web is:',
    optionA: 'A great way to spend weekends',
    optionB: 'Still illegal',
    optionC: 'Recommended for research',
    optionD: 'Encouraged in cooking classes',
    correctOption: 'optionB',
  },
  {
    question: 'What is a risk of not using secure connections on the Dark Web?',
    optionA: 'You might get too popular',
    optionB: 'Exposure to network surveillance',
    optionC: 'You’ll miss the latest memes',
    optionD: 'Your coffee will get cold',
    correctOption: 'optionB',
  },
  {
    question: 'What can excessive trust in Dark Web anonymity lead to?',
    optionA: 'A starring role in a movie',
    optionB: 'Getting a million likes on social media',
    optionC: 'Reckless behavior and potential exposure',
    optionD: 'Finding hidden treasure',
    correctOption: 'optionC',
  },
];

let shuffledQuestions = [];

function handleQuestions() {
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById('question-number').innerHTML = questionNumber;
  document.getElementById('player-score').innerHTML = playerScore;
  document.getElementById('display-question').innerHTML =
    currentQuestion.question;
  document.getElementById('option-one-label').innerHTML =
    currentQuestion.optionA;
  document.getElementById('option-two-label').innerHTML =
    currentQuestion.optionB;
  document.getElementById('option-three-label').innerHTML =
    currentQuestion.optionC;
  document.getElementById('option-four-label').innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber];
  const currentQuestionAnswer = currentQuestion.correctOption;
  const options = document.getElementsByName('option');
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      correctOption = option.labels[0].id;
    }
  });

  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById('option-modal').style.display = 'flex';
  }

  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = 'green';
      playerScore++;
      indexNumber++;

      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = 'red';
      document.getElementById(correctOption).style.backgroundColor = 'green';
      wrongAttempt++;
      indexNumber++;

      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();

  setTimeout(() => {
    if (indexNumber <= 9) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

function resetOptionBackground() {
  const options = document.getElementsByName('option');
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = '';
  });
}

function unCheckRadioButtons() {
  const options = document.getElementsByName('option');
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  if (playerScore <= 3) {
    remark = 'Bad Grades, It is too easy to scam you.';
    remarkColor = 'red';
  } else if (playerScore >= 4 && playerScore < 7) {
    remark = 'Average Grades, You can do better.';
    remarkColor = 'orange';
  } else if (playerScore >= 7) {
    remark = 'Excellent, Keep the good work going.';
    remarkColor = 'green';
  }
  const playerGrade = (playerScore / 10) * 100;

  document.getElementById('remarks').innerHTML = remark;
  document.getElementById('remarks').style.color = remarkColor;
  document.getElementById('grade-percentage').innerHTML = playerGrade;
  document.getElementById('wrong-answers').innerHTML = wrongAttempt;
  document.getElementById('right-answers').innerHTML = playerScore;
  document.getElementById('score-modal').style.display = 'flex';
}

function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById('score-modal').style.display = 'none';
}

function closeOptionModal() {
  document.getElementById('option-modal').style.display = 'none';
}
