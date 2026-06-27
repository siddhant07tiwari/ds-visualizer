# DS Lab — Interactive Data Structure Visualizer

A frontend-only website to **visualize and practice** core data structure operations — built to make abstract concepts like push/pop and enqueue/dequeue easy to actually see and understand.

🔗 **Live site:** https://siddhant07tiwari.github.io/ds-visualizer/
*(replace with your actual GitHub Pages link)*

## What it does

Each data structure has its own interactive panel where you can perform real operations and watch the structure update live, with the underlying JavaScript code shown right below the visualization.

| Structure | Operations you can try |
|---|---|
| **Stack** | push, pop, peek, clear |
| **Queue** | enqueue, dequeue, peek, clear |
| **Deque** | addFront, addRear, removeFront, removeRear, clear |
| **Linked List** | addHead, addTail, insertAt(index), removeAt(index), clear |
| **Binary Search Tree** | insert, delete, search (animated path), inorder traversal, clear |

## Built with

- HTML
- CSS
- Vanilla JavaScript (no frameworks, no libraries)

No backend, no build tools, no installation required.

## Run it locally

Just open `index.html` directly in any browser — double-click the file, that's it.

Or, if you prefer a local server:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure