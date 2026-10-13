# 86. Pure-CSS tooltip

**Frequency in interviews:** medium

## The problem

Build a pure-CSS tooltip using a `data-*` attribute and `::after`, visible on hover **and** keyboard focus. Honest follow-up: CSS can't flip the tooltip near screen edges — real apps use floating-ui.

## Approach and explanation

The tricks: `attr(data-tip)` pulls text from the attribute, `::after` is the bubble, parent needs `position: relative`. Honest follow-up: pure CSS can't flip the tooltip when near the viewport edge — real apps use floating-ui.

## Solution

`index.html`

```html
<!-- Problem 86 — Pure-CSS tooltip. Open in a browser, hover or Tab to the button. -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css" />
</head>
<body style="font-family: sans-serif; padding: 80px">
  <button class="tooltip" data-tip="Save your changes">Hover me</button>
</body>
</html>
```

`style.css`

```css
.tooltip { position: relative; }

.tooltip::after {
  content: attr(data-tip);        /* pulls the text from the attribute */
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms;
}

.tooltip:hover::after,
.tooltip:focus-visible::after { opacity: 1; }

/* Honest follow-up: CSS can't flip the tooltip near viewport edges —
   real apps use floating-ui for that. */
```
