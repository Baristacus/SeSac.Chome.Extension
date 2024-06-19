const game_board = document.querySelector('.board');
const game_size = 3;
const card_num = game_size * game_size;

let count = '';

let card_state = [];

function game_init() {
    card_state = [];

    document.querySelector('.board').style.gridTemplateColumns = `repeat(${game_size}, 1fr)`;

    for (let i = 1; i < card_num; i++) {
        card_state.push(i);
    }
    card_state.push(null);

    shuffle_card();
    set_card();
}

function shuffle_card() {
    for (let i = card_state.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [card_state[i], card_state[j]] = [card_state[j], card_state[i]];
    }
    if (!is_game_valid()) {
        shuffle_card();
    }
}

function is_game_valid() {
    const empty_index = card_state.indexOf(null);
    const from_bottom = game_size - Math.floor(empty_index / game_size);

    let inversion = 0;
    for (let i = 0; i < card_num - 1; i++) {
        for (let j = i + 1; j < card_num; j++) {
            if (card_state[i] && card_state[j] && card_state[i] > card_state[j]) {
                inversion++;
            }
        }
    }

    if (game_size % 2 == 1 && inversion % 2 == 0) {
        return true;
    } else if (game_size % 2 == 0) {
        if (from_bottom % 2 == 0 && inversion % 2 == 1) {
            return true;
        } else if (from_bottom % 2 == 1 && inversion % 2 == 0) {
            return true;
        }
    }
    return false;
}

function set_card() {
    game_board.innerHTML = '';
    for (let i = 0; i < card_state.length; i++) {
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

function is_game_solved() {
    for (let i = 0; i < card_state.length - 1; i++) {
        if (card_state[i] != i + 1) {
            return false;
        }
    }
    return true;
}

function move_card(index) {
    const empty_index = card_state.indexOf(null);

    if (is_move_valid(index, empty_index)) {
        card_state[empty_index] = card_state[index];
        card_state[index] = null;

        count = Number(count) + 1;
        document.getElementById('moves').textContent = count;
        console.log(count)
        set_card();


        if (is_game_solved()) {
            setTimeout(() => {
                alert('게임 성공!');
            }, 0);
        }
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