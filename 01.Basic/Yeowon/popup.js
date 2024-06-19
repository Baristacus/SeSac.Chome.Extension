const game_board = document.querySelector('.board');
const game_size = 3;

let card_state = [];

function game_init() {
    card_state = [];
    for(let i = 1; i < game_size * game_size; i++) {
        card_state.push(i);
    }
    card_state.push(null);

    set_card();
}

function set_card() {
    game_board.innerHTML = '';
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
    const empty_index = card_state.indexOf(null);
    console.log('카드 클릭됨', empty_index);

    if (is_move_valid(index, empty_index)) {
        card_state[empty_index] = card_state[index];
        card_state[index] = null;
        set_card();
    }
}

function is_move_valid(index, empty_index) {
    if (Math.floor(index / game_size) == Math.floor(empty_index / game_size) && Math.abs(index % game_size - empty_index % game_size) == 1)
        return true;
    
    if (index % game_size == empty_index % game_size && Math.abs(Math.floor(index / game_size) - Math.floor(empty_index / game_size)) == 1)
        return true;

    return false;
}

window.onload = game_init;