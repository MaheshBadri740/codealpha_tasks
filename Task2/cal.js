'use strict';

(() => {
  const $history = document.getElementById('history');
  const $current = document.getElementById('current');
  const $screen = document.getElementById('screen');

  // ── Number formatting ────────────────────────────────────────────
  const fmt = (n) => {
    if (n === 'Error') return 'Error';
    const s = String(n);
    if (s.endsWith('.')) return s;
    const p = parseFloat(n);
    if (isNaN(p)) return '0';
    if (Number.isInteger(p)) return p.toLocaleString('en-US', { maximumFractionDigits: 0 });
    const trimmed = p.toFixed(8).replace(/\.?0+$/, '');
    const [intPart, decPart] = trimmed.split('.');
    return `${parseInt(intPart).toLocaleString('en-US', { maximumFractionDigits: 0 })}.${decPart}`;
  };

  // ── State ───────────────────────────────────────────────────────
  let current = '';
  let previous = '';
  let op = null;
  let resetNext = false;

  // ── Display update ──────────────────────────────────────────────
  const refresh = () => {
    $current.textContent = fmt(current) || '0';
    $history.textContent = op && previous ? `${fmt(previous)} ${op}` : '';
    $screen.classList.toggle('error', current === 'Error');
  };

  // ── Core operations ─────────────────────────────────────────────
  const clearAll = () => {
    current = '';
    previous = '';
    op = null;
    resetNext = false;
    refresh();
  };

  const del = () => {
    if (resetNext) { current = ''; resetNext = false; refresh(); return; }
    current = current.length <= 1 ? '' : current.slice(0, -1);
    refresh();
  };

  const pct = () => {
    if (!current) return;
    const v = parseFloat(current);
    if (!isNaN(v)) { current = (v / 100).toString(); refresh(); }
  };

  const num = (n) => {
    if (resetNext) { current = ''; resetNext = false; }
    if (n === '.' && current.includes('.')) return;
    if (n === '00' && (current === '0' || current === '0.')) {
      current += '00'; refresh(); return;
    }
    if (current === '' && n === '.') { current = '0.'; refresh(); return; }
    if (current === '0' && n !== '.') current = n;
    else current += n;
    refresh();
  };

  const chooseOp = (symbol) => {
    if (current === '' && previous !== '') { op = symbol; refresh(); return; }
    if (current !== '') {
      if (previous !== '') compute();
      previous = current;
      op = symbol;
      resetNext = true;
    }
    refresh();
  };

  const compute = () => {
    if (!op || previous === '' || current === '') return;
    const a = parseFloat(previous);
    const b = parseFloat(current);
    if (isNaN(a) || isNaN(b)) return;

    let result;
    switch (op) {
      case '+': result = a + b; break;
      case '−': result = a - b; break;
      case '×': result = a * b; break;
      case '÷':
        if (b === 0) { current = 'Error'; previous = ''; op = null; refresh(); return; }
        result = a / b;
        break;
      case '%': result = a % b; break;
      default: return;
    }
    current = result.toString();
    previous = '';
    op = null;
    resetNext = true;
    refresh();
  };

  // ── Bind clicks ─────────────────────────────────────────────────
  document.querySelectorAll('[data-num]').forEach(btn => {
    btn.addEventListener('click', () => num(btn.textContent));
  });
  document.querySelectorAll('[data-op]').forEach(btn => {
    btn.addEventListener('click', () => chooseOp(btn.textContent));
  });
  document.querySelector('[data-action="clear"]').addEventListener('click', clearAll);
  document.querySelector('[data-action="delete"]').addEventListener('click', del);
  document.querySelector('[data-action="compute"]').addEventListener('click', compute);
  document.querySelector('[data-action="pct"]').addEventListener('click', pct);

  // ── Keyboard support ────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') num(e.key);
    else if (e.key === '+') chooseOp('+');
    else if (e.key === '-') chooseOp('−');
    else if (e.key === '*') chooseOp('×');
    else if (e.key === '/') { e.preventDefault(); chooseOp('÷'); }
    else if (e.key === '%') pct();
    else if (e.key === 'Enter' || e.key === '=') compute();
    else if (e.key === 'Backspace') del();
    else if (e.key === 'Escape') clearAll();
  });
})();
