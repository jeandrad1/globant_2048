/**
 * @file js/movement.js
 * Functions to handle tile movements in 2048 game
 */

// Movement functions now receive the tiles array and gridSize to avoid circular imports
function removeTileFromArray(tiles, tile) {
    const idx = tiles.indexOf(tile);
    if (idx !== -1) tiles.splice(idx, 1);
}

function animateMerge(tile, target, tiles) {
    // move the source tile to the target position so the transform transition can run
    // make sure moving tile is on top
    try { tile.element.style.zIndex = 2; } catch (e) {}
    try { target.element.style.zIndex = 1; } catch (e) {}
    tile.setPosition(target.x, target.y);

    const finalize = () => {
        try { tile.element.remove(); } catch (e) {}
        removeTileFromArray(tiles, tile);
    };

    const onEnd = (ev) => {
        if (!ev || ev.propertyName === 'transform') {
            finalize();
            try { tile.element.removeEventListener('transitionend', onEnd); } catch (e) {}
        }
    };

        // listen for the transition end; fallback after 500ms
    try {
        tile.element.addEventListener('transitionend', onEnd);
    } catch (e) {}
        setTimeout(() => {
        // if element still exists, finalize as fallback
        if (tile.element && tile.element.parentElement) {
            finalize();
            try { tile.element.removeEventListener('transitionend', onEnd); } catch (e) {}
        }
        }, 500);
}

// Returns true if any tile moved or merged
export function moveLeft(tiles, gridSize = 4, score = null) {
    let moved = false;
    for (let y = 0; y < gridSize; y++) {
        // tiles in this row sorted left-to-right
        const row = tiles.filter(t => t.y === y).sort((a, b) => a.x - b.x);
        if (row.length === 0) continue;

        const result = [];
        for (const tile of row) {
            if (result.length > 0) {
                const last = result[result.length - 1];
                        if (last.value === tile.value && !last._merged) {
                            // merge tile into last (animate the moving tile into the last one)
                            const newVal = last.value * 2;
                              // update target synchronously to prevent it merging again this move
                              last.setValue(newVal);
                              last._merged = true;
                              if (score && typeof score.add === 'function') score.add(newVal);
                              animateMerge(tile, last, tiles);
                              moved = true;
                              continue;
                        }
            }
            result.push(tile);
        }

        // place result tiles starting at x=0
        for (let i = 0; i < result.length; i++) {
            const tile = result[i];
            const newX = i;
            if (tile.x !== newX) {
                tile.setPosition(newX, y);
                moved = true;
            }
            // reset merged flag for next move
            tile._merged = false;
        }
    }
    return moved;
}

export function moveRight(tiles, gridSize = 4, score = null) {
    let moved = false;
    for (let y = 0; y < gridSize; y++) {
        // tiles in this row sorted right-to-left
        const row = tiles.filter(t => t.y === y).sort((a, b) => b.x - a.x);
        if (row.length === 0) continue;

        const result = [];
        for (const tile of row) {
            if (result.length > 0) {
                const last = result[result.length - 1];
                if (last.value === tile.value && !last._merged) {
                    const newVal = last.value * 2;
                    last.setValue(newVal);
                    last._merged = true;
                    if (score && typeof score.add === 'function') score.add(newVal);
                    animateMerge(tile, last, tiles);
                    moved = true;
                    continue;
                }
            }
            result.push(tile);
        }

        // place result tiles starting at right edge
        for (let i = 0; i < result.length; i++) {
            const tile = result[i];
            const newX = gridSize - 1 - i;
            if (tile.x !== newX) {
                tile.setPosition(newX, y);
                moved = true;
            }
            tile._merged = false;
        }
    }
    return moved;
}

export function moveUp(tiles, gridSize = 4, score = null) {
    let moved = false;
    for (let x = 0; x < gridSize; x++) {
        // tiles in this column sorted top-to-bottom
        const col = tiles.filter(t => t.x === x).sort((a, b) => a.y - b.y);
        if (col.length === 0) continue;

        const result = [];
        for (const tile of col) {
            if (result.length > 0) {
                const last = result[result.length - 1];
                if (last.value === tile.value && !last._merged) {
                    const newVal = last.value * 2;
                    last.setValue(newVal);
                    last._merged = true;
                    if (score && typeof score.add === 'function') score.add(newVal);
                    animateMerge(tile, last, tiles);
                    moved = true;
                    continue;
                }
            }
            result.push(tile);
        }

        // place result tiles starting at y=0
        for (let i = 0; i < result.length; i++) {
            const tile = result[i];
            const newY = i;
            if (tile.y !== newY) {
                tile.setPosition(tile.x, newY);
                moved = true;
            }
            tile._merged = false;
        }
    }
    return moved;
}

export function moveDown(tiles, gridSize = 4, score = null) {
    let moved = false;
    for (let x = 0; x < gridSize; x++) {
        // tiles in this column sorted bottom-to-top
        const col = tiles.filter(t => t.x === x).sort((a, b) => b.y - a.y);
        if (col.length === 0) continue;

        const result = [];
        for (const tile of col) {
            if (result.length > 0) {
                const last = result[result.length - 1];
                if (last.value === tile.value && !last._merged) {
                    const newVal = last.value * 2;
                    last.setValue(newVal);
                    last._merged = true;
                    if (score && typeof score.add === 'function') score.add(newVal);
                    animateMerge(tile, last, tiles);
                    moved = true;
                    continue;
                }
            }
            result.push(tile);
        }

        // place result tiles starting at bottom
        for (let i = 0; i < result.length; i++) {
            const tile = result[i];
            const newY = gridSize - 1 - i;
            if (tile.y !== newY) {
                tile.setPosition(tile.x, newY);
                moved = true;
            }
            tile._merged = false;
        }
    }
    return moved;
}
