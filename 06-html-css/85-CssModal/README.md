# 85. Modal overlay in pure CSS

**Frequency in interviews:** medium

## The problem

Style a modal: a full-viewport dimmed backdrop (`position: fixed; inset: 0`) with a centered dialog that scrolls internally when its content is too tall.

## Approach and explanation

`position: fixed` + `inset: 0` for the full-viewport dim, grid centering for the dialog. Mention `z-index` and stacking contexts (why portals exist) as the talking point.

## Solution

`index.html`

```html
<!-- Problem 85 — Pure-CSS modal overlay. Open in a browser, click the label. -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- checkbox hack: clicking the label toggles the modal without JS -->
  <label for="modal-toggle" class="open-btn">Open modal</label>
  <input type="checkbox" id="modal-toggle" hidden />

  <div class="backdrop">
    <div class="dialog">
      <h2>Pure CSS modal</h2>
      <p>No JavaScript — the hidden checkbox does the toggling.</p>
      <label for="modal-toggle" class="close-btn">Close</label>
    </div>
  </div>
</body>
</html>
```

`style.css`

```css
body { font-family: sans-serif; padding: 24px; }
.open-btn, .close-btn {
  background: #3b82f6; color: white; padding: 8px 16px;
  border-radius: 8px; cursor: pointer;
}

.backdrop {
  position: fixed;
  inset: 0;                       /* top/right/bottom/left: 0 */
  background: rgb(0 0 0 / 0.5);
  display: none;                  /* hidden until the checkbox is checked */
  place-items: center;
  z-index: 100;
}
#modal-toggle:checked ~ .backdrop { display: grid; }

.dialog {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 90vw;
  max-height: 85vh;
  overflow: auto;                 /* scrolls internally when too tall */
}
```
