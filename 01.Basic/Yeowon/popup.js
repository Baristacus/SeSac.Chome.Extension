const game_board = document.querySelector('.board');
const game_size = 3;

let card_state = [];

function game_init() {
    for(let i = 1; i < game_size * game_size; i++) {
        card_state.push(i);
    }
    card_state.push(null);

    set_card();
}

function set_card() {
    for(let i = 0; i < card_state.length; i++) {
        const card = document.createElement('div');
        if (card_state[i] == null) {
            card.textContent = ""
        } else {
            card.textContent = card_state[i];
        }
        card.addEventListener('click', () => move_card(i));
        game_board.appendChild(card);
    }
}

function move_card(index) {
    console.log('카드 클릭됨', index);
}


window.onload = game_init;