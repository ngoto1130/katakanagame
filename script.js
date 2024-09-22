const hiraganaList = ["あ", "い", "う", "え", "お"];  // 簡単な例としてあ行だけ
const katakanaList = ["ア", "イ", "ウ", "エ", "オ"];
let gameMode = '';

function startGame(mode) {
    gameMode = mode;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    setupGameBoard();
}

function resetGame() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('game').style.display = 'none';
}

function setupGameBoard() {
    const hiraganaBoard = document.getElementById('hiragana-board');
    const katakanaCards = document.getElementById('katakana-cards');

    hiraganaBoard.innerHTML = '';
    katakanaCards.innerHTML = '';

    hiraganaList.forEach((hiragana, index) => {
        let dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.setAttribute('data-index', index);
        hiraganaBoard.appendChild(dropZone);

        let katakanaCard = document.createElement('div');
        katakanaCard.className = 'card';
        katakanaCard.draggable = true;
        katakanaCard.innerText = katakanaList[index];
        katakanaCard.setAttribute('data-index', index);
        katakanaCard.addEventListener('dragstart', dragStart);
        katakanaCards.appendChild(katakanaCard);
    });

    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('drop', drop);
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-index'));
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    const draggedIndex = event.dataTransfer.getData('text');
    const targetIndex = event.target.getAttribute('data-index');

    if (draggedIndex === targetIndex) {
        event.target.innerText = katakanaList[draggedIndex];
        event.target.classList.add('correct');
    } else {
        event.target.classList.add('incorrect');
        setTimeout(() => {
            event.target.classList.remove('incorrect');
        }, 1000);
    }
}
