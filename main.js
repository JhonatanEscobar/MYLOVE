document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const playerImages = {
        'X': 'D.jpg',
        'O': 'J.jpg'
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });

    function handleCellClick(e) {
        const cell = e.target;
        const playerImage = document.createElement('img');
        playerImage.src = playerImages[currentPlayer];
        cell.appendChild(playerImage);
        if (checkWin(currentPlayer)) {
            const winner = currentPlayer === 'X' ? 'Deyna' : 'Jhonatan';
            setTimeout(() => alert(`${winner} gana!`), 10);
            resetGame();
        } else if (isDraw()) {
            setTimeout(() => alert('Empate!'), 10);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                const cell = cells[index];
                const img = cell.querySelector('img');
                return img && img.src.includes(playerImages[player]);
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.querySelector('img');
        });
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.addEventListener('click', handleCellClick, { once: true });
        });
        currentPlayer = 'X';
    }
});
