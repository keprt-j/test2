const STORAGE_YES = 'friend_yes';
const STORAGE_NO = 'friend_no';

function getYesCount(): number {
  const n = sessionStorage.getItem(STORAGE_YES);
  return n === null ? 0 : parseInt(n, 10);
}

function getNoCount(): number {
  const n = sessionStorage.getItem(STORAGE_NO);
  return n === null ? 0 : parseInt(n, 10);
}

function setYesCount(n: number): void {
  sessionStorage.setItem(STORAGE_YES, String(n));
}

function setNoCount(n: number): void {
  sessionStorage.setItem(STORAGE_NO, String(n));
}

// Elements
const desc = document.getElementById('desc') as HTMLParagraphElement;
const question = document.getElementById('question') as HTMLHeadingElement;
const buttons = document.getElementById('buttonsContainer') as HTMLDivElement;
const yesBtn = document.getElementById('yesBtn') as HTMLButtonElement;
const noBtn = document.getElementById('noBtn') as HTMLButtonElement;
const changeMindTitle = document.getElementById('changeMindTitle') as HTMLHeadingElement;
const changeMindSub = document.getElementById('changeMindSub') as HTMLParagraphElement;

const views = document.querySelectorAll('.view');

function showView(id: string): void {
  views.forEach((v) => v.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// No button: shrink in place until video reached; after that, random move
const shrinkScales = [1, 0.85, 0.7];
const moveScales = [0.7, 0.55, 0.4, 0.25, 0.15, 0.08, 0.04, 0.02];

function getRandomOffset(): number {
  return (Math.random() - 0.5) * 280;
}

function updateNoButton(): void {
  const noCount = getNoCount();
  if (noCount <= 2) {
    const scale = shrinkScales[Math.min(noCount, shrinkScales.length - 1)];
    noBtn.style.transform = `scale(${scale})`;
    return;
  }
  const moveIndex = noCount - 3;
  const scale = moveScales[Math.min(moveIndex, moveScales.length - 1)];
  const x = getRandomOffset();
  const y = getRandomOffset();
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

function goHome(): void {
  showView('view-home');
  updateNoButton();
}

function handleYesClick(): void {
  const count = getYesCount() + 1;
  setYesCount(count);
  if (count === 1) {
    showView('view-first-yes');
  } else {
    showView('view-success');
  }
}

function handleNoClick(): void {
  const count = getNoCount() + 1;
  setNoCount(count);
  if (count > 0) setYesCount(Math.max(1, getYesCount()));
  if (count <= 2) {
    changeMindTitle.textContent =
      count === 1
        ? 'Would you like to change your mind?'
        : 'Really? Last chance to change your mind.';
    changeMindSub.textContent = 'Sending you back...';
    showView('view-change-mind');
    setTimeout(goHome, 2200);
  } else if (count === 3) {
    showView('view-video');
  } else {
    updateNoButton();
  }
}

function handleBackFromFirstYes(e: Event): void {
  e.preventDefault();
  goHome();
}

function handleBackFromVideo(): void {
  goHome();
}

function handleBackFromChangeMind(e: Event): void {
  e.preventDefault();
  goHome();
}

function handleBackFromSuccess(): void {
  goHome();
}

// Typing animation (only on home when counts are 0)
function startAnimationSequence(): void {
  setTimeout(() => desc.classList.add('typing'), 300);
  setTimeout(() => {
    desc.classList.remove('typing');
    desc.classList.add('done');
    question.classList.add('typing');
  }, 2500);
  setTimeout(() => {
    question.classList.remove('typing');
    question.classList.add('done');
    buttons.classList.add('fade-in');
  }, 4700);
}

// Init
const yesCount = getYesCount();
const noCount = getNoCount();
if (yesCount === 0 && noCount === 0) {
  startAnimationSequence();
} else {
  desc.classList.add('done');
  question.classList.add('done');
  buttons.classList.add('fade-in');
  updateNoButton();
}

yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('click', handleNoClick);
document.getElementById('linkBackFromFirstYes')!.addEventListener('click', handleBackFromFirstYes);
document.getElementById('linkBackFromChangeMind')!.addEventListener('click', handleBackFromChangeMind);
document.getElementById('btnBackFromSuccess')!.addEventListener('click', handleBackFromSuccess);
document.getElementById('btnBackFromVideo')!.addEventListener('click', handleBackFromVideo);
