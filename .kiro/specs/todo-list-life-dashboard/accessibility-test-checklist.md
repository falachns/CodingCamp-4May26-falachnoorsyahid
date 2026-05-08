# Accessibility and Responsive Design Test Checklist

## Responsive Design Testing

### Viewport Size Testing
Test the application at the following viewport sizes to verify responsive behavior:

- [ ] **320px width** (iPhone SE, smallest common mobile)
  - Time display should be 2rem
  - All buttons should be full width
  - Input groups should stack vertically
  - Timer controls should stack vertically
  - Base font size should be 14px

- [ ] **375px width** (iPhone 12/13)
  - Time display should be 2rem
  - All buttons should be full width
  - Input groups should stack vertically

- [ ] **480px width** (Large mobile)
  - Time display should be 3rem
  - Buttons should be full width
  - Timer controls should be horizontal with wrapping

- [ ] **768px width** (iPad portrait)
  - 2-column grid layout
  - Greeting section spans full width
  - Time display should be 4.5rem
  - Input groups should be horizontal

- [ ] **1024px width** (iPad landscape / Small desktop)
  - 2-column grid layout
  - Time display should be 6rem
  - Optimal spacing

- [ ] **1440px width** (Desktop)
  - Maximum width: 1400px
  - Time display should be 7rem
  - Enhanced typography

- [ ] **1920px width** (Large desktop)
  - Content centered with max-width
  - No horizontal scrolling

### Orientation Testing
- [ ] **Portrait mode** on mobile devices
  - Layout should be vertical
  - All content visible without scrolling horizontally

- [ ] **Landscape mode** on mobile devices (height < 600px)
  - Reduced vertical spacing
  - Smaller time display (2.5rem)
  - Compact padding

### Browser Testing
Test in the following browsers:
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

## Accessibility Testing

### Color Contrast (WCAG AA)
Use browser DevTools or online contrast checkers to verify:

- [ ] **Primary color** (#1565c0 on white): 5.7:1 ratio ✓
- [ ] **Primary hover** (#0d47a1 on white): 8.6:1 ratio ✓
- [ ] **Text** (#212121 on white): 16.1:1 ratio ✓
- [ ] **Text secondary** (#5f5f5f on white): 7.0:1 ratio ✓
- [ ] **Text muted** (#757575 on white): 4.6:1 ratio ✓
- [ ] **Success** (#2e7d32 on white): 4.5:1 ratio ✓
- [ ] **Danger** (#c62828 on white): 5.5:1 ratio ✓
- [ ] **Stop button** (#f57c00 on white): Sufficient contrast ✓

### Keyboard Navigation
Test keyboard navigation through all interactive elements:

- [ ] **Tab key** moves focus to next interactive element
- [ ] **Shift+Tab** moves focus to previous interactive element
- [ ] **Enter key** activates buttons and submits forms
- [ ] **Space key** toggles checkboxes
- [ ] **Focus indicators** are clearly visible on all elements
- [ ] **Focus order** is logical and follows visual layout

### Focus Indicators
Verify focus indicators are visible and meet WCAG requirements:

- [ ] **Buttons** show 3px outline with 2px offset + 5px ring
- [ ] **Input fields** show 3px outline + border color change + 4px ring
- [ ] **Checkboxes** show 3px outline with 3px offset + 5px ring
- [ ] **Links** show appropriate focus styling
- [ ] **Focus indicators** have sufficient contrast (3:1 minimum)

### Touch Target Sizes (Mobile)
On mobile devices (< 768px), verify all interactive elements meet 44x44px minimum:

- [ ] **Primary buttons** (Add, Add Link, Start, Stop, Reset)
- [ ] **Delete buttons**
- [ ] **Link buttons**
- [ ] **Checkboxes**
- [ ] **Input fields** (height)
- [ ] **Task items** (height)

### Screen Reader Testing

#### VoiceOver (macOS/iOS)
- [ ] Enable VoiceOver (Cmd+F5 on Mac)
- [ ] Navigate through all sections
- [ ] Verify all interactive elements are announced
- [ ] Verify button labels are clear
- [ ] Verify input field labels are announced
- [ ] Verify task completion status is announced

#### NVDA (Windows)
- [ ] Enable NVDA
- [ ] Navigate through all sections
- [ ] Verify all interactive elements are announced
- [ ] Verify semantic structure is correct

### Browser Preference Testing

#### Dark Mode
- [ ] Enable dark mode in system preferences
- [ ] Verify color palette switches to dark theme
- [ ] Verify contrast ratios are maintained
- [ ] Verify all text is readable
- [ ] Verify focus indicators are visible

#### High Contrast Mode
- [ ] Enable high contrast mode in system preferences
- [ ] Verify colors switch to high contrast palette
- [ ] Verify borders are increased to 2px
- [ ] Verify all content is readable

#### Reduced Motion
- [ ] Enable reduced motion in system preferences
- [ ] Verify all animations are disabled
- [ ] Verify transitions are minimal (0.01ms)
- [ ] Verify smooth scrolling is disabled

### Text Resizing
- [ ] Set browser zoom to 100%
- [ ] Increase zoom to 150%
  - Verify all content is readable
  - Verify no horizontal scrolling
  - Verify layout adapts appropriately
- [ ] Increase zoom to 200%
  - Verify all content is readable
  - Verify no content is cut off
  - Verify layout remains functional

### Print Testing
- [ ] Open print preview (Cmd+P / Ctrl+P)
- [ ] Verify interactive elements are hidden
- [ ] Verify layout is optimized for printing
- [ ] Verify colors are converted to black and white
- [ ] Verify page breaks don't split items

## Functional Testing

### Responsive Behavior
- [ ] **Greeting section** spans full width on all screen sizes
- [ ] **Timer controls** stack vertically on small mobile
- [ ] **Task input group** stacks vertically on mobile
- [ ] **Link input group** stacks vertically on mobile
- [ ] **Grid layout** switches to 2 columns on tablet and above
- [ ] **Font sizes** scale appropriately at each breakpoint

### Interactive Elements
- [ ] All buttons are clickable/tappable
- [ ] All input fields are focusable and editable
- [ ] All checkboxes are toggleable
- [ ] All links open in new tabs
- [ ] Hover states work on desktop
- [ ] Active states work on all devices

## Manual Testing Checklist

### Visual Inspection
- [ ] Layout is clean and organized
- [ ] Spacing is consistent
- [ ] Typography is readable
- [ ] Colors are pleasant and not harsh
- [ ] Focus indicators don't obscure content
- [ ] No visual glitches or overlapping elements

### User Experience
- [ ] Navigation is intuitive
- [ ] Feedback is immediate
- [ ] Errors are clear
- [ ] Success states are obvious
- [ ] Loading states are handled (if applicable)

## Automated Testing (Optional)

### Tools to Use
- [ ] **Lighthouse** (Chrome DevTools)
  - Run accessibility audit
  - Target score: 90+
  
- [ ] **axe DevTools** (Browser extension)
  - Run automated accessibility scan
  - Fix any critical issues
  
- [ ] **WAVE** (Web Accessibility Evaluation Tool)
  - Run online accessibility check
  - Review and address findings

### Lighthouse Audit Checklist
- [ ] Accessibility score: 90+
- [ ] Best Practices score: 90+
- [ ] Performance score: 80+
- [ ] SEO score: 90+

## Known Limitations

### Full WCAG Compliance
Note: Full WCAG 2.1 Level AA compliance requires:
- Manual testing with assistive technologies
- Expert accessibility review
- User testing with people with disabilities

This implementation provides a strong foundation but should be validated by accessibility experts for production use.

## Testing Notes

### Date Tested: ___________
### Tested By: ___________
### Browser/Device: ___________
### Issues Found: ___________

---

## Quick Test Commands

### Open in Browser
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Test with Different Viewport Sizes (Chrome DevTools)
1. Open Chrome DevTools (F12)
2. Click "Toggle device toolbar" (Cmd+Shift+M / Ctrl+Shift+M)
3. Select different device presets or enter custom dimensions
4. Test at: 320px, 375px, 480px, 768px, 1024px, 1440px

### Test Keyboard Navigation
1. Click in address bar to reset focus
2. Press Tab repeatedly to move through all interactive elements
3. Verify focus indicators are visible
4. Press Enter/Space to activate elements

### Test Screen Reader (macOS)
```bash
# Enable VoiceOver
Cmd + F5

# Navigate
Control + Option + Right Arrow (next element)
Control + Option + Left Arrow (previous element)
```

### Test Dark Mode (macOS)
```bash
# Toggle dark mode
System Preferences > General > Appearance > Dark
```

### Test Reduced Motion (macOS)
```bash
# Enable reduced motion
System Preferences > Accessibility > Display > Reduce motion
```
