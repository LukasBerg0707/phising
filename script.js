// ===== SETUP & UTILS =====
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Initialize all handlers
  initSimulation();
  initQuiz();
});

// ===== SIMULATION HANDLERS =====
function initSimulation() {
  const startBtn = document.getElementById('startBtn');
  const skipBtn = document.getElementById('skipBtn');
  const simSection = document.getElementById('sim');
  const hero = document.querySelector('.hero');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // Hide hero, show sim
      hero.style.display = 'none';
      simSection.classList.remove('hidden');
      // Scroll to simulation
      simSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      // Hide hero and sim, scroll to learning section
      hero.style.display = 'none';
      simSection.classList.add('hidden');
      const learSection = document.getElementById('lær');
      if (learSection) {
        learSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Tab opening functionality
  const consentCheckbox = document.getElementById('consentTabs');
  const openTabsBtn = document.getElementById('openTabsBtn');
  const showUrlBtn = document.getElementById('showUrlBtn');
  const urlBox = document.getElementById('urlBox');

  if (consentCheckbox) {
    consentCheckbox.addEventListener('change', () => {
      if (openTabsBtn) {
        openTabsBtn.disabled = !consentCheckbox.checked;
      }
    });
  }

  if (openTabsBtn) {
    openTabsBtn.addEventListener('click', () => {
      // Only open if consent is given
      if (consentCheckbox && consentCheckbox.checked) {
        // Open 2 demo tabs (these are harmless example URLs)
        window.open('about:blank', '_blank');
        window.open('about:blank', '_blank');
        alert('2 demo-faner åpnet. Dette demonstrerer hvordan phishing kan distrahere med flere vinduer.');
      }
    });
  }

  if (showUrlBtn) {
    showUrlBtn.addEventListener('click', () => {
      if (urlBox) {
        urlBox.classList.toggle('hidden');
        showUrlBtn.textContent = urlBox.classList.contains('hidden') 
          ? 'Vis "mistenkelig" URL' 
          : 'Skjul URL';
      }
    });
  }
}

// ===== QUIZ HANDLERS =====
function initQuiz() {
  const quizForm = document.getElementById('quizForm');
  const resetBtn = document.getElementById('resetQuiz');
  const resultDiv = document.getElementById('quizResult');

  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      evaluateQuiz();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      quizForm.reset();
      if (resultDiv) {
        resultDiv.classList.add('hidden');
      }
    });
  }
}

function evaluateQuiz() {
  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  const resultDiv = document.getElementById('quizResult');

  // Check if all answers are selected
  if (!q1 || !q2) {
    alert('Vennligst svar på alle spørsmål før du sender inn.');
    return;
  }

  // Scoring
  let score = 0;
  if (q1.value === 'b') score++; // Correct answer: check sender and domain
  if (q2.value === 'b') score++; // Correct answer: typos in URL

  // Generate result message
  let resultClass = 'fair';
  let resultTitle = '📊 Resultat';
  let resultMessage = '';

  if (score === 2) {
    resultClass = 'good';
    resultTitle = '✅ Glimrende!';
    resultMessage = `
      <p>Du fikk begge svarene riktig! Du har god forståelse av phishing-tegn.</p>
      <p>Husk å alltid:</p>
      <ul style="text-align: left; margin-left: 1rem;">
        <li>Stoppe og tenke før du klikker</li>
        <li>Sjekke avsender og domene nøye</li>
        <li>Ikke oppgi passord eller MFA-koder på e-post</li>
        <li>Rapportere mistenkelig e-post</li>
      </ul>
    `;
  } else if (score === 1) {
    resultTitle = '🎯 Bra start!';
    resultMessage = `
      <p>Du fikk ett svar riktig! Du er på rett vei.</p>
      <p>Husk:</p>
      <ul style="text-align: left; margin-left: 1rem;">
        <li>Phishing bruker ofte pressende språk</li>
        <li>Lenker kan se veldig like ut (typosquatting) – hold musepekeren over dem for å se riktig URL</li>
        <li>Dobbeltsjekk alltid før du oppgir sensitive opplysninger</li>
      </ul>
    `;
  } else {
    resultTitle = '📚 Tid for læring!';
    resultMessage = `
      <p>Begge svarene var dessverre feil. La oss lære:</p>
      <ul style="text-align: left; margin-left: 1rem;">
        <li><strong>Spørsmål 1:</strong> Den riktige handlingen er alltid å sjekke avsender og domene – aldri klikke i hast.</li>
        <li><strong>Spørsmål 2:</strong> Små skrivefeil (typosquatting) er et vanlig rødt flagg for phishing.</li>
      </ul>
      <p style="margin-top: 1rem;">Les læringsdelen over og ta quizen på nytt!</p>
    `;
  }

  // Display result
  resultDiv.innerHTML = `
    <h3>${resultTitle}</h3>
    ${resultMessage}
    <p style="margin-top: 1rem; font-size: 0.9rem; color: #7f8c8d;">
      <strong>Ditt resultat:</strong> ${score}/2 riktig
    </p>
  `;
  resultDiv.classList.remove('hidden', 'fair');
  resultDiv.classList.add(resultClass);

  // Scroll to result
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== ACCESSIBILITY =====
// Ensure keyboard navigation works
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const urlBox = document.getElementById('urlBox');
    if (urlBox && !urlBox.classList.contains('hidden')) {
      urlBox.classList.add('hidden');
      const showUrlBtn = document.getElementById('showUrlBtn');
      if (showUrlBtn) {
        showUrlBtn.textContent = 'Vis "mistenkelig" URL';
      }
    }
  }
});
