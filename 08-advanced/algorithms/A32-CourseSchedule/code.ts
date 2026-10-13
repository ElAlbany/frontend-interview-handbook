/**
 * A32 — Course schedule, Kahn's topological sort (TypeScript)
 * Run: node code.ts
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const indegree = new Array<number>(numCourses).fill(0);
  const graph = new Map<number, number[]>();
  for (const [course, prereq] of prerequisites) {
    indegree[course]++;
    if (!graph.has(prereq)) graph.set(prereq, []);
    graph.get(prereq)!.push(course);
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);

  let finished = 0;
  while (queue.length) {
    const course = queue.shift()!;
    finished++;
    for (const next of graph.get(course) ?? []) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return finished === numCourses; // false if a cycle trapped some courses
}

console.log(canFinish(2, [[1, 0]]));           // true
console.log(canFinish(2, [[1, 0], [0, 1]]));   // false
console.log(canFinish(4, [[1, 0], [2, 1], [3, 2]])); // true
