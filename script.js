const winrateInput = document.getElementById('winrate');
const mmrGoalInput = document.getElementById('mmr_goal');
const thinkingUI = document.getElementById('thinking');
const resultUI = document.getElementById('result');

function calculateGames() {
  const mmrPerGameSolo = 30,
    mmrPerGameParty = 20;

  const winrate = winrateInput.value / 100,
    mmrGoal = mmrGoalInput.value;

  const gamesWith100WinrateSolo = Math.ceil(mmrGoal / mmrPerGameSolo),
    gamesWith100WinrateParty = Math.ceil(mmrGoal / mmrPerGameParty);

  const neededSoloGames =
    ((gamesWith100WinrateSolo * winrate) / (2 * winrate - 1)) * 2 -
    gamesWith100WinrateSolo;

  const neededPartyGames =
    ((gamesWith100WinrateParty * winrate) / (2 * winrate - 1)) * 2 -
    gamesWith100WinrateParty;
  // (40x/(2x-1)*2)-40

  updateUI(Math.ceil(neededSoloGames), Math.ceil(neededPartyGames));
}

function thinking() {
  resultUI.style.display = 'none';
  thinkingUI.style.display = 'inline';

  setTimeout(() => {
    thinkingUI.style.display = 'none';
    resultUI.style.display = 'block';
  }, 1300);
}

function updateUI(soloGames, partyGames) {
  if (mmrGoalInput.value === '' && winrateInput.value < 10) {
    resultUI.innerHTML = `Hi! I'm Morphing! I will tell You how many games you would need to play to gain your goal MMR`;
  } else if (mmrGoalInput.value === '') {
    resultUI.innerHTML = `Hi! I'm Morphing! I will tell You how many games you would need to play to gain your goal MMR`;
  } else if (winrateInput.value === '') {
    resultUI.innerHTML = `Hi! I'm Morphing! I will tell You how many games you would need to play to gain your goal MMR`;
  } else if (
    mmrGoalInput.value < 20 &&
    mmrGoalInput.value !== '' &&
    winrateInput.value !== ''
  ) {
    thinking();
    resultUI.innerHTML = `Can't really gain less than 20, go higher!`;
  } else if (
    winrateInput.value !== '' &&
    mmrGoalInput.value !== '' &&
    winrateInput.value <= 50 &&
    winrateInput.value >= 10
  ) {
    thinking();
    resultUI.innerHTML = `To gain MMR you wound have to have winrate above 50%`;
  } else if (mmrGoalInput.value !== '' && winrateInput.value >= 10) {
    thinking();
    resultUI.innerHTML = `To gain ${mmrGoalInput.value} MMR with ${winrateInput.value}% winrate you would need to play <span class="bold">${soloGames}</span> solo games or <span class="bold">${partyGames}</span> party games`;
  }
}

winrateInput.addEventListener('keyup', calculateGames);
mmrGoalInput.addEventListener('keyup', calculateGames);
