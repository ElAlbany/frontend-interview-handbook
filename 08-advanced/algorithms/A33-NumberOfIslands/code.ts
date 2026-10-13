/**
 * A33 — Number of islands, DFS flood fill (TypeScript)
 * Run: node code.ts
 */
function numIslands(grid: string[][]): number {
  const rows = grid.length,
    cols = grid[0]?.length ?? 0;
  let islands = 0;

  const sink = (r: number, c: number): void => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0"; // mark visited by sinking
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        sink(r, c);
      }
    }
  }
  return islands;
}

const grid = [
  ["1", "1", "0", "0"],
  ["1", "0", "0", "1"],
  ["0", "0", "1", "1"],
];
console.log(numIslands(grid)); // 2
console.log(numIslands([["1"]])); // 1
