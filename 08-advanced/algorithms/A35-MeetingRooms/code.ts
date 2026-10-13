/**
 * A35 — Minimum meeting rooms, sweep line (TypeScript)
 * Run: node code.ts
 */
function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => b - a)[0] !== undefined
    ? intervals.map((i) => i[1]).sort((a, b) => a - b)
    : [];
  let rooms = 0,
    maxRooms = 0,
    e = 0;
  for (const start of starts) {
    if (start < ends[e]) {
      rooms++; // no room freed yet — need a new one
    } else {
      e++; // a meeting ended, reuse its room
    }
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}

console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
console.log(minMeetingRooms([[7, 10], [2, 4]]));            // 1
