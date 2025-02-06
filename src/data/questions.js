// src/data/questions.js

export const questions = [
  {
    question: "What is the time complexity of accessing an element in a balanced binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctOption : "O(log n)",
  },
  {
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Heap", "Graph"],
    correctOption : "Stack",
  },
  {
    question: "What is the minimum number of passes required in Bubble Sort to sort a list of 'n' elements?",
    options: ["n-1", "n", "log n", "n^2"],
    correctOption: "n-1",
  },
  {
    question: "Which graph traversal algorithm uses a queue?",
    options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Dijkstra's Algorithm", "Prim's Algorithm"],
    correctOption : "Breadth-First Search (BFS)",
  },
  {
    question: "What is the worst-case time complexity of Quick Sort?",
    options: ["O(n log n)", "O(n^2)", "O(log n)", "O(n)"],
    correctOption : "O(n^2)",
  },
  {
    question: "Which of the following is not a type of linked list?",
    options: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Array Linked List"],
    correctOption : "Array Linked List",
  },
  {
    question: "In a min-heap, what is the relationship between a parent node and its children?",
    options: [
      "Parent node is greater than its children",
      "Parent node is less than its children",
      "Parent node is equal to its children",
      "No specific relationship",
    ],
    correctOption : "Parent node is less than its children",
  },
  {
    question: "Which algorithm is used to find the shortest path in a graph with non-negative edge weights?",
    options: ["Bellman-Ford", "Dijkstra's Algorithm", "Floyd-Warshall", "A* Search"],
    correctOption: "Dijkstra's Algorithm",
  },
  {
    question: "What does the acronym 'DFS' stand for in graph theory?",
    options: ["Development Framework System", "Depth-First Search", "Directed Functional Structure", "Dynamic Frequency Shift"],
    correctOption: "Depth-First Search",
  },
  {
    question: "Which data structure is primarily used to implement recursion?",
    options: ["Queue", "Heap", "Stack", "Tree"],
    correctOption: "Stack",
  },
];