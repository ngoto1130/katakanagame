const hiraganaList = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を", "ん"
];

const katakanaList = [
    "ア", "イ", "ウ", "エ", "オ",
    "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ",
    "タ", "チ", "ツ", "テ", "ト",
    "ナ", "ニ", "ヌ", "ネ", "ノ",
    "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ",
    "ヤ", "ユ", "ヨ",
    "ラ", "リ", "ル", "レ", "ロ",
    "ワ", "ヲ", "ン"
];

function startGame(mode) {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    setupGameBoard(mode);
}

function resetGame() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('game').style.display = 'none';
}

function setupGameBoard(mode) {
    const hiraganaBoard = document.getElementById('hiragana-board');
    const katakanaCards = document.getElementById('katakana-cards');

    hiraganaBoard.innerHTML = '';
    katakanaCards.innerHTML = '';

    let hiraganaSubset, katakanaSubset;
    
    // モードに基づいて配列を切り取る
    switch (mode) {
        case 'row':
            hiraganaSubset = hiraganaList.slice(0, 5); // あ行
            katakanaSubset = katakanaList.slice(0, 5); // ア行
            break;
        case 'column':
            hiraganaSubset = hiraganaList.filter((_, index) => index % 5 === 0); // あ段
            katakanaSubset = katakanaList.filter((_, index) => index % 5 === 0); // ア段
            break;
        default:
            hiraganaSubset = hiraganaList;
            katakanaSubset = katakanaList;
            break;
    }

    // ひらがなボードのセットアップ
    hiraganaSubset.forEach((hiragana, index) => {
        let dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.setAttribute('data-index', index);
        hiraganaBoard.appendChild(dropZone);

        let katakanaCard = document.createElement('div');
        katakanaCard.className = 'card';
        katakanaCard.draggable = true;
        katakanaCard.innerText = katakanaSubset[index];
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
