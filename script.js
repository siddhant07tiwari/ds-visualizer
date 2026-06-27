/* =====================================================
   NAVIGATION
===================================================== */
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(item.dataset.target).classList.add('active');
  });
});

function logTo(elId, message) {
  const el = document.getElementById(elId);
  const line = document.createElement('div');
  line.textContent = message;
  el.prepend(line);
  while (el.children.length > 12) el.removeChild(el.lastChild);
}

/* =====================================================
   STACK
===================================================== */
(function () {
  const stack = [];
  const column = document.getElementById('stack-column');
  const input = document.getElementById('stack-input');
  const sizeEl = document.getElementById('stack-size');
  const topEl = document.getElementById('stack-top');

  function render() {
    column.innerHTML = '';
    stack.forEach((val, i) => {
      const block = document.createElement('div');
      block.className = 'block' + (i === stack.length - 1 ? ' top-block' : '');
      block.textContent = val;
      column.appendChild(block);
    });
    sizeEl.textContent = stack.length;
    topEl.textContent = stack.length ? stack[stack.length - 1] : '—';
  }

  document.getElementById('stack-push').addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    stack.push(val);
    render();
    logTo('stack-log', `push(${val}) → size ${stack.length}`);
    input.value = '';
    input.focus();
  });

  document.getElementById('stack-pop').addEventListener('click', () => {
    if (!stack.length) { logTo('stack-log', `pop() → stack is empty`); return; }
    const blocks = column.children;
    const last = blocks[blocks.length - 1];
    if (last) {
      last.classList.add('removing');
      setTimeout(() => {
        const val = stack.pop();
        render();
        logTo('stack-log', `pop() → removed "${val}"`);
      }, 160);
    }
  });

  document.getElementById('stack-peek').addEventListener('click', () => {
    if (!stack.length) { logTo('stack-log', `peek() → stack is empty`); return; }
    logTo('stack-log', `peek() → "${stack[stack.length - 1]}"`);
  });

  document.getElementById('stack-clear').addEventListener('click', () => {
    stack.length = 0;
    render();
    logTo('stack-log', `clear() → stack emptied`);
  });

  input.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('stack-push').click(); });

  render();
})();

/* =====================================================
   QUEUE
===================================================== */
(function () {
  const queue = [];
  const row = document.getElementById('queue-row');
  const input = document.getElementById('queue-input');
  const sizeEl = document.getElementById('queue-size');
  const frontEl = document.getElementById('queue-front');

  function render() {
    row.innerHTML = '';
    queue.forEach(val => {
      const block = document.createElement('div');
      block.className = 'q-block';
      block.textContent = val;
      row.appendChild(block);
    });
    sizeEl.textContent = queue.length;
    frontEl.textContent = queue.length ? queue[0] : '—';
  }

  document.getElementById('queue-enqueue').addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    queue.push(val);
    render();
    logTo('queue-log', `enqueue(${val}) → size ${queue.length}`);
    input.value = '';
    input.focus();
  });

  document.getElementById('queue-dequeue').addEventListener('click', () => {
    if (!queue.length) { logTo('queue-log', `dequeue() → queue is empty`); return; }
    const first = row.children[0];
    if (first) {
      first.classList.add('removing');
      setTimeout(() => {
        const val = queue.shift();
        render();
        logTo('queue-log', `dequeue() → removed "${val}"`);
      }, 160);
    }
  });

  document.getElementById('queue-peek').addEventListener('click', () => {
    if (!queue.length) { logTo('queue-log', `peek() → queue is empty`); return; }
    logTo('queue-log', `peek() → "${queue[0]}"`);
  });

  document.getElementById('queue-clear').addEventListener('click', () => {
    queue.length = 0;
    render();
    logTo('queue-log', `clear() → queue emptied`);
  });

  input.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('queue-enqueue').click(); });

  render();
})();

/* =====================================================
   DEQUE
===================================================== */
(function () {
  const deque = [];
  const row = document.getElementById('deque-row');
  const input = document.getElementById('deque-input');
  const sizeEl = document.getElementById('deque-size');

  function render() {
    row.innerHTML = '';
    deque.forEach(val => {
      const block = document.createElement('div');
      block.className = 'q-block';
      block.textContent = val;
      row.appendChild(block);
    });
    sizeEl.textContent = deque.length;
  }

  document.getElementById('deque-addfront').addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    deque.unshift(val);
    render();
    logTo('deque-log', `addFront(${val}) → size ${deque.length}`);
    input.value = '';
  });

  document.getElementById('deque-addrear').addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    deque.push(val);
    render();
    logTo('deque-log', `addRear(${val}) → size ${deque.length}`);
    input.value = '';
  });

  document.getElementById('deque-remfront').addEventListener('click', () => {
    if (!deque.length) { logTo('deque-log', `removeFront() → deque is empty`); return; }
    const val = deque.shift();
    render();
    logTo('deque-log', `removeFront() → removed "${val}"`);
  });

  document.getElementById('deque-remrear').addEventListener('click', () => {
    if (!deque.length) { logTo('deque-log', `removeRear() → deque is empty`); return; }
    const val = deque.pop();
    render();
    logTo('deque-log', `removeRear() → removed "${val}"`);
  });

  document.getElementById('deque-clear').addEventListener('click', () => {
    deque.length = 0;
    render();
    logTo('deque-log', `clear() → deque emptied`);
  });

  input.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('deque-addrear').click(); });

  render();
})();

/* =====================================================
   LINKED LIST
===================================================== */
(function () {
  let list = []; // simple array represents node chain for visualization simplicity
  const lane = document.getElementById('ll-lane');
  const input = document.getElementById('ll-input');
  const indexInput = document.getElementById('ll-index');
  const sizeEl = document.getElementById('ll-size');

  function render() {
    lane.innerHTML = '';
    if (!list.length) {
      const nullSpan = document.createElement('span');
      nullSpan.className = 'll-null';
      nullSpan.textContent = 'head → null';
      lane.appendChild(nullSpan);
      sizeEl.textContent = 0;
      return;
    }
    list.forEach((val, i) => {
      const node = document.createElement('div');
      node.className = 'll-node';
      node.innerHTML = `
        <div class="ll-node-value">${val}</div>
        <div class="ll-node-ptr">next</div>
      `;
      lane.appendChild(node);
      if (i < list.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'll-arrow';
        arrow.textContent = '→';
        lane.appendChild(arrow);
      }
    });
    const nullSpan = document.createElement('span');
    nullSpan.className = 'll-null';
    nullSpan.textContent = '→ null';
    lane.appendChild(nullSpan);
    sizeEl.textContent = list.length;
  }

  document.getElementById('ll-addhead').addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    list.unshift(val);
    render();
    logTo('ll-log', `addHead(${val}) → length ${list.length}`);
    input.value = '';
  });

  document.getElementById('ll-addtail').addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    list.push(val);
    render();
    logTo('ll-log', `addTail(${val}) → length ${list.length}`);
    input.value = '';
  });

  document.getElementById('ll-insertat').addEventListener('click', () => {
    const val = input.value.trim();
    const idx = parseInt(indexInput.value, 10);
    if (!val || isNaN(idx) || idx < 0 || idx > list.length) {
      logTo('ll-log', `insertAt() → invalid index`);
      return;
    }
    list.splice(idx, 0, val);
    render();
    logTo('ll-log', `insertAt(${idx}, ${val}) → length ${list.length}`);
    input.value = '';
  });

  document.getElementById('ll-removeat').addEventListener('click', () => {
    const idx = parseInt(indexInput.value, 10);
    if (isNaN(idx) || idx < 0 || idx >= list.length) {
      logTo('ll-log', `removeAt() → invalid index`);
      return;
    }
    const [removed] = list.splice(idx, 1);
    render();
    logTo('ll-log', `removeAt(${idx}) → removed "${removed}"`);
  });

  document.getElementById('ll-clear').addEventListener('click', () => {
    list = [];
    render();
    logTo('ll-log', `clear() → list emptied`);
  });

  render();
})();

/* =====================================================
   BINARY SEARCH TREE
===================================================== */
(function () {
  class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  let root = null;
  const input = document.getElementById('bst-input');
  const sizeEl = document.getElementById('bst-size');
  const heightEl = document.getElementById('bst-height');
  const svg = document.getElementById('bst-svg');

  function insert(node, value) {
    if (!node) return new Node(value);
    if (value < node.value) node.left = insert(node.left, value);
    else if (value > node.value) node.right = insert(node.right, value);
    return node;
  }

  function findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  function deleteNode(node, value) {
    if (!node) return null;
    if (value < node.value) { node.left = deleteNode(node.left, value); return node; }
    if (value > node.value) { node.right = deleteNode(node.right, value); return node; }
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const successor = findMin(node.right);
    node.value = successor.value;
    node.right = deleteNode(node.right, successor.value);
    return node;
  }

  function countNodes(node) {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  }

  function height(node) {
    if (!node) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
  }

  function inorder(node, out = []) {
    if (!node) return out;
    inorder(node.left, out);
    out.push(node.value);
    inorder(node.right, out);
    return out;
  }

  function layout(node, depth, counter, positions) {
    if (!node) return;
    layout(node.left, depth + 1, counter, positions);
    const x = counter.i++;
    positions.set(node, { x, depth });
    layout(node.right, depth + 1, counter, positions);
  }

  function render(highlightPath = [], foundValue = null) {
    svg.innerHTML = '';
    sizeEl.textContent = countNodes(root);
    heightEl.textContent = height(root);

    if (!root) return;

    const positions = new Map();
    layout(root, 0, { i: 0 }, positions);

    const total = positions.size;
    const width = 900;
    const colWidth = width / (total + 1);
    const rowHeight = 70;
    const yOffset = 40;

    const coords = new Map();
    positions.forEach((pos, node) => {
      coords.set(node, {
        x: colWidth * (pos.x + 1),
        y: yOffset + pos.depth * rowHeight
      });
    });

    function drawEdges(node) {
      if (!node) return;
      const c = coords.get(node);
      if (node.left) {
        const cl = coords.get(node.left);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', c.x); line.setAttribute('y1', c.y);
        line.setAttribute('x2', cl.x); line.setAttribute('y2', cl.y);
        line.setAttribute('class', 'bst-edge');
        svg.appendChild(line);
        drawEdges(node.left);
      }
      if (node.right) {
        const cr = coords.get(node.right);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', c.x); line.setAttribute('y1', c.y);
        line.setAttribute('x2', cr.x); line.setAttribute('y2', cr.y);
        line.setAttribute('class', 'bst-edge');
        svg.appendChild(line);
        drawEdges(node.right);
      }
    }
    drawEdges(root);

    coords.forEach((c, node) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      let cls = 'bst-node';
      if (highlightPath.includes(node)) cls += ' highlight';
      if (foundValue !== null && node.value === foundValue) cls += ' found';
      g.setAttribute('class', cls);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', c.x);
      circle.setAttribute('cy', c.y);
      circle.setAttribute('r', 20);
      g.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', c.x);
      text.setAttribute('y', c.y + 1);
      text.textContent = node.value;
      g.appendChild(text);

      svg.appendChild(g);
    });
  }

  document.getElementById('bst-insert').addEventListener('click', () => {
    const val = parseInt(input.value, 10);
    if (isNaN(val)) return;
    root = insert(root, val);
    render();
    logTo('bst-log', `insert(${val})`);
    input.value = '';
  });

  document.getElementById('bst-delete').addEventListener('click', () => {
    const val = parseInt(input.value, 10);
    if (isNaN(val)) return;
    root = deleteNode(root, val);
    render();
    logTo('bst-log', `delete(${val})`);
    input.value = '';
  });

  document.getElementById('bst-search').addEventListener('click', async () => {
    const val = parseInt(input.value, 10);
    if (isNaN(val)) return;
    let node = root;
    const path = [];
    let found = false;
    while (node) {
      path.push(node);
      render(path);
      await new Promise(r => setTimeout(r, 350));
      if (node.value === val) { found = true; break; }
      node = val < node.value ? node.left : node.right;
    }
    render(path, found ? val : null);
    logTo('bst-log', found ? `search(${val}) → found` : `search(${val}) → not found`);
  });

  document.getElementById('bst-inorder').addEventListener('click', () => {
    const result = inorder(root);
    logTo('bst-log', `inorder() → [${result.join(', ')}]`);
  });

  document.getElementById('bst-clear').addEventListener('click', () => {
    root = null;
    render();
    logTo('bst-log', `clear() → tree emptied`);
  });

  input.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('bst-insert').click(); });

  // seed with a small example tree so it's not empty on load
  [50, 30, 70, 20, 40, 60, 80].forEach(v => { root = insert(root, v); });
  render();
})();