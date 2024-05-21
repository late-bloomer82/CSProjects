function isValid(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function bfsKnightShortestPath(start, end) {
  const knightMoves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  if (start[0] === end[0] && start[1] === end[1]) {
    return [start];
  }

  const queue = [];
  queue.push(start);

  const visited = new Set();
  visited.add(start.toString());

  const parent = {};
  parent[start.toString()] = null;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of knightMoves) {
      const nx = x + dx;
      const ny = y + dy;

      if (isValid(nx, ny)) {
        const nextPos = [nx, ny];
        if (!visited.has(nextPos.toString())) {
          visited.add(nextPos.toString());
          parent[nextPos.toString()] = [x, y];
          queue.push(nextPos);

          if (nx === end[0] && ny === end[1]) {
            const path = [];
            let current = nextPos;
            while (current) {
              path.push(current);
              current = parent[current.toString()];
            }
            return path.reverse();
          }
        }
      }
    }
  }

  return null; // If no path is found
}

// Define start and end positions (0-indexed)
const startPosition = [0, 0]; // e.g., [0, 0] represents 'a1'
const endPosition = [3, 3]; // e.g., [7, 7] represents 'h8'

// Find the shortest path
const path = bfsKnightShortestPath(startPosition, endPosition);

// Output the full path
console.log(`Shortest path from ${startPosition} to ${endPosition}:`);
path.forEach((step) => {
  console.log(step);
});
