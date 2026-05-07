# Design Document: To-Do List Life Dashboard

## Overview

The To-Do List Life Dashboard is a client-side web application built with vanilla JavaScript, HTML, and CSS. The application provides a unified interface for time awareness, task management, focus timing, and quick website access. All functionality is implemented without external frameworks or libraries, using only browser-native APIs.

### Design Goals

1. **Simplicity**: Single-page application with no build process or dependencies
2. **Performance**: Fast load times and responsive interactions
3. **Persistence**: Reliable data storage using Local Storage API
4. **Maintainability**: Clear separation of concerns with modular JavaScript architecture
5. **Accessibility**: Semantic HTML and keyboard-navigable interface

### Technical Constraints

- **No Frameworks**: Pure vanilla JavaScript (ES6+)
- **File Structure**: Single CSS file (CSS/style.css), single JS file (JS/main.js)
- **Browser Support**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **Storage**: Browser Local Storage only (no backend)
- **Styling**: Single CSS file with no preprocessors

## Architecture

### High-Level Architecture

The application follows a modular architecture with clear separation between:
- **Presentation Layer**: HTML structure and CSS styling
- **Application Layer**: JavaScript modules for business logic
- **Storage Layer**: Local Storage abstraction for data persistence

```
┌─────────────────────────────────────────┐
│           index.html (View)             │
│  ┌─────────┐ ┌──────┐ ┌──────┐ ┌─────┐ │
│  │Greeting │ │Timer │ │Tasks │ │Links│ │
│  └─────────┘ └──────┘ └──────┘ └─────┘ │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│        main.js (Controllers)            │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │GreetingCtrl  │  │  TimerCtrl      │ │
│  ├──────────────┤  ├─────────────────┤ │
│  │TaskManager   │  │ QuickLinksManager│ │
│  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│      StorageManager (Persistence)       │
│         Local Storage API               │
└─────────────────────────────────────────┘
```

### Module Structure

The JavaScript application is organized into five main modules:

1. **StorageManager**: Handles all Local Storage operations
2. **GreetingController**: Manages time display and greeting messages
3. **TimerController**: Manages focus timer state and countdown
4. **TaskManager**: Manages task CRUD operations and persistence
5. **QuickLinksManager**: Manages quick link CRUD operations and persistence

### Initialization Flow

```
Page Load
    │
    ├─> Initialize StorageManager
    │
    ├─> Initialize GreetingController
    │   └─> Start clock update interval
    │
    ├─> Initialize TimerController
    │   └─> Set initial display to 25:00
    │
    ├─> Initialize TaskManager
    │   ├─> Load tasks from storage
    │   └─> Render task list
    │
    └─> Initialize QuickLinksManager
        ├─> Load links from storage
        └─> Render link buttons
```

## Components and Interfaces

### 1. StorageManager

**Purpose**: Centralized interface for all Local Storage operations with error handling and data validation.

**Public Interface**:
```javascript
class StorageManager {
  // Save data to Local Storage
  static save(key, data)
  
  // Load data from Local Storage
  static load(key)
  
  // Remove data from Local Storage
  static remove(key)
  
  // Clear all application data
  static clear()
}
```

**Storage Keys**:
- `tasks`: Array of task objects
- `quickLinks`: Array of quick link objects

**Error Handling**:
- Catches quota exceeded errors
- Validates JSON parsing
- Returns null for missing keys

---

### 2. GreetingController

**Purpose**: Displays current time, date, and time-based greeting message.

**Public Interface**:
```javascript
class GreetingController {
  constructor(timeElement, dateElement, greetingElement)
  
  // Initialize and start clock updates
  init()
  
  // Update time display (called every second)
  updateTime()
  
  // Update date display
  updateDate()
  
  // Get greeting based on current hour
  getGreeting()
  
  // Cleanup interval on page unload
  destroy()
}
```

**Greeting Logic**:
- 05:00 - 11:59: "Good morning"
- 12:00 - 16:59: "Good afternoon"
- 17:00 - 20:59: "Good evening"
- 21:00 - 04:59: "Good night"

**Update Frequency**:
- Time: Every 1000ms (1 second)
- Date: On initialization and at midnight
- Greeting: On initialization and hourly

---

### 3. TimerController

**Purpose**: Manages a 25-minute countdown timer with start, stop, and reset functionality.

**Public Interface**:
```javascript
class TimerController {
  constructor(displayElement, startBtn, stopBtn, resetBtn)
  
  // Initialize timer with default duration
  init()
  
  // Start countdown
  start()
  
  // Stop/pause countdown
  stop()
  
  // Reset to 25:00
  reset()
  
  // Update display (called every second when running)
  updateDisplay()
  
  // Format time as MM:SS
  formatTime(totalSeconds)
  
  // Cleanup interval on page unload
  destroy()
}
```

**State Management**:
- `timeRemaining`: Seconds remaining (default: 1500)
- `isRunning`: Boolean flag for timer state
- `intervalId`: Reference to setInterval for cleanup

**Timer Behavior**:
- Starts at 25:00 (1500 seconds)
- Counts down to 00:00
- Stops automatically at 00:00
- Can be paused and resumed
- Reset returns to 25:00 regardless of state

---

### 4. TaskManager

**Purpose**: Manages task creation, editing, completion, deletion, and persistence.

**Public Interface**:
```javascript
class TaskManager {
  constructor(inputElement, addButton, listElement)
  
  // Initialize and load saved tasks
  init()
  
  // Add new task
  addTask(text)
  
  // Toggle task completion status
  toggleTask(taskId)
  
  // Edit task text
  editTask(taskId, newText)
  
  // Delete task
  deleteTask(taskId)
  
  // Render all tasks to DOM
  renderTasks()
  
  // Save tasks to storage
  saveTasks()
  
  // Load tasks from storage
  loadTasks()
}
```

**Event Handlers**:
- Add button click: Create new task
- Enter key in input: Create new task
- Task checkbox click: Toggle completion
- Task text click: Enable inline editing
- Delete button click: Remove task

---

### 5. QuickLinksManager

**Purpose**: Manages quick link creation, deletion, and persistence.

**Public Interface**:
```javascript
class QuickLinksManager {
  constructor(nameInput, urlInput, addButton, listElement)
  
  // Initialize and load saved links
  init()
  
  // Add new quick link
  addLink(name, url)
  
  // Delete quick link
  deleteLink(linkId)
  
  // Open link in new tab
  openLink(url)
  
  // Render all links to DOM
  renderLinks()
  
  // Save links to storage
  saveLinks()
  
  // Load links from storage
  loadLinks()
  
  // Validate URL format
  validateUrl(url)
}
```

**Event Handlers**:
- Add button click: Create new link
- Link button click: Open URL in new tab
- Delete button click: Remove link

## Data Models

### Task Object

```javascript
{
  id: string,           // Unique identifier (timestamp-based)
  text: string,         // Task description
  completed: boolean,   // Completion status
  createdAt: number     // Unix timestamp
}
```

**Validation Rules**:
- `id`: Must be unique, non-empty string
- `text`: Must be non-empty string (trimmed)
- `completed`: Must be boolean
- `createdAt`: Must be positive number

**Example**:
```javascript
{
  id: "1704067200000",
  text: "Complete design document",
  completed: false,
  createdAt: 1704067200000
}
```

---

### Quick Link Object

```javascript
{
  id: string,      // Unique identifier (timestamp-based)
  name: string,    // Display name for the link
  url: string      // Full URL including protocol
}
```

**Validation Rules**:
- `id`: Must be unique, non-empty string
- `name`: Must be non-empty string (trimmed)
- `url`: Must be valid URL string starting with http:// or https://

**Example**:
```javascript
{
  id: "1704067200001",
  name: "GitHub",
  url: "https://github.com"
}
```

---

### Local Storage Schema

**Key: `tasks`**
```javascript
[
  {
    id: "1704067200000",
    text: "Complete design document",
    completed: false,
    createdAt: 1704067200000
  },
  {
    id: "1704067200001",
    text: "Review pull requests",
    completed: true,
    createdAt: 1704067200001
  }
]
```

**Key: `quickLinks`**
```javascript
[
  {
    id: "1704067200000",
    name: "GitHub",
    url: "https://github.com"
  },
  {
    id: "1704067200001",
    name: "Gmail",
    url: "https://mail.google.com"
  }
]
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Task persistence round-trip

*For any* valid task list, saving to Local Storage then loading from Local Storage SHALL produce an equivalent task list with the same content and completion status.

**Validates: Requirements 8.4**

### Property 2: Quick link persistence round-trip

*For any* valid quick link list, saving to Local Storage then loading from Local Storage SHALL produce an equivalent quick link list with the same names and URLs.

**Validates: Requirements 12.4**

### Property 3: Task addition increases list length

*For any* task list and any valid (non-empty, non-whitespace) task text, adding the task SHALL increase the task list length by exactly one.

**Validates: Requirements 4.1, 4.2**

### Property 4: Empty task rejection preserves state

*For any* task list and any empty or whitespace-only string, attempting to add the task SHALL not modify the task list.

**Validates: Requirements 4.5**

### Property 5: Task deletion decreases list length

*For any* task list containing at least one task, deleting a task SHALL decrease the task list length by exactly one.

**Validates: Requirements 7.2**

### Property 6: Task toggle preserves text

*For any* task, toggling its completion status SHALL preserve the task text unchanged.

**Validates: Requirements 5.4**

### Property 7: Task edit preserves completion status

*For any* task, editing its text SHALL preserve the task completion status unchanged.

**Validates: Requirements 6.4**

### Property 8: Quick link addition increases list length

*For any* quick link list and any valid (non-empty) name and URL, adding the link SHALL increase the quick link list length by exactly one.

**Validates: Requirements 9.1, 9.2**

### Property 9: Invalid quick link rejection preserves state

*For any* quick link list and any input where either name or URL is empty, attempting to add the link SHALL not modify the quick link list.

**Validates: Requirements 9.5**

### Property 10: Quick link deletion decreases list length

*For any* quick link list containing at least one link, deleting a link SHALL decrease the quick link list length by exactly one.

**Validates: Requirements 11.2**

### Property 11: Timer stop preserves time

*For any* timer state, stopping the timer SHALL preserve the remaining time (within 1 second tolerance due to update intervals).

**Validates: Requirements 3.3**

### Property 12: Timer reset restores initial state

*For any* timer state, calling reset SHALL set the remaining time to exactly 25 minutes (1500 seconds).

**Validates: Requirements 3.4**

### Property 13: Greeting reflects time boundaries

*For any* hour value (0-23), the greeting message SHALL match the expected greeting for that time range: "Good morning" for hours 5-11, "Good afternoon" for hours 12-16, "Good evening" for hours 17-20, and "Good night" for hours 21-23 and 0-4.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

## Error Handling

### Local Storage Errors

**Quota Exceeded**:
- **Detection**: Catch `QuotaExceededError` during save operations
- **Response**: Display user-friendly error message suggesting to clear old data
- **Fallback**: Continue operation without persistence (in-memory only)

**Parse Errors**:
- **Detection**: Catch `SyntaxError` during JSON.parse
- **Response**: Log error to console, return empty array
- **Recovery**: Initialize with empty data structure

**Storage Unavailable**:
- **Detection**: Check for `localStorage` availability on init
- **Response**: Display warning banner to user
- **Fallback**: Operate in memory-only mode

### Input Validation Errors

**Empty Task Text**:
- **Detection**: Check trimmed length before adding
- **Response**: Do nothing (silent rejection)
- **User Feedback**: Input field remains focused

**Empty Link Fields**:
- **Detection**: Check both name and URL before adding
- **Response**: Do nothing (silent rejection)
- **User Feedback**: Highlight empty fields with red border

**Invalid URL Format**:
- **Detection**: Validate URL starts with http:// or https://
- **Response**: Auto-prepend https:// if missing protocol
- **User Feedback**: Show corrected URL in input field

### Timer Errors

**Multiple Start Calls**:
- **Detection**: Check `isRunning` flag before starting
- **Response**: Ignore subsequent start calls
- **Prevention**: Disable start button when running

**Interval Cleanup**:
- **Detection**: Track intervalId
- **Response**: Clear interval before setting new one
- **Prevention**: Always clear on stop, reset, and destroy

### DOM Errors

**Missing Elements**:
- **Detection**: Check for null after querySelector
- **Response**: Log error and skip initialization
- **Prevention**: Validate all required elements exist on init

**Event Handler Errors**:
- **Detection**: Wrap handlers in try-catch
- **Response**: Log error, prevent propagation
- **Recovery**: Continue operation without crashing

## Testing Strategy

### Unit Testing Approach

The application will use a combination of **example-based unit tests** and **property-based tests** to ensure correctness.

**Unit Tests** will focus on:
- Specific examples demonstrating correct behavior
- Edge cases and boundary conditions
- Error handling scenarios
- Integration between components

**Property-Based Tests** will focus on:
- Universal properties that hold across all valid inputs
- Data persistence round-trips
- State transitions and invariants
- Input validation rules

### Property-Based Testing Configuration

**Library**: fast-check (JavaScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: todo-list-life-dashboard, Property {N}: {property text}`

**Example Property Test Structure**:
```javascript
// Feature: todo-list-life-dashboard, Property 1: Task persistence round-trip
fc.assert(
  fc.property(fc.array(taskArbitrary), (tasks) => {
    StorageManager.save('tasks', tasks);
    const loaded = StorageManager.load('tasks');
    return deepEqual(tasks, loaded);
  }),
  { numRuns: 100 }
);
```

### Test Coverage by Component

#### StorageManager
- **Unit Tests**:
  - Save and load with valid data
  - Load returns null for missing key
  - Clear removes all data
  - Quota exceeded error handling
  - JSON parse error handling
- **Property Tests**:
  - Property 1: Task persistence round-trip
  - Property 2: Quick link persistence round-trip

#### GreetingController
- **Unit Tests**:
  - Time format is HH:MM:SS
  - Date format is readable
  - Clock updates every second
  - Interval cleanup on destroy
- **Property Tests**:
  - Property 13: Greeting changes reflect time boundaries

#### TimerController
- **Unit Tests**:
  - Initial state is 25:00
  - Start begins countdown
  - Stop pauses countdown
  - Reset returns to 25:00
  - Timer stops at 00:00
  - Format time handles edge cases (0, 59, 3599)
- **Property Tests**:
  - Property 11: Timer countdown preserves duration
  - Property 12: Timer reset restores initial state

#### TaskManager
- **Unit Tests**:
  - Add task with valid text
  - Add task clears input field
  - Empty text does not create task
  - Toggle changes completion status
  - Edit updates task text
  - Delete removes task
  - Render displays all tasks
- **Property Tests**:
  - Property 3: Task addition increases list length
  - Property 4: Empty task rejection preserves state
  - Property 5: Task deletion decreases list length
  - Property 6: Task toggle preserves text
  - Property 7: Task edit preserves completion status

#### QuickLinksManager
- **Unit Tests**:
  - Add link with valid name and URL
  - Add link clears input fields
  - Empty name or URL does not create link
  - Delete removes link
  - Open link uses correct URL
  - Render displays all links
  - URL validation adds protocol if missing
- **Property Tests**:
  - Property 8: Quick link addition increases list length
  - Property 9: Invalid quick link rejection preserves state
  - Property 10: Quick link deletion decreases list length

### Integration Testing

**Browser Compatibility Tests**:
- Manual testing in Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- Verify Local Storage works in all browsers
- Verify timer accuracy across browsers
- Verify event handlers work correctly

**Performance Tests**:
- Page load time < 500ms
- User action response time < 50ms
- Display update time < 100ms
- Test with 100+ tasks and links

**Accessibility Tests**:
- Keyboard navigation works for all interactive elements
- Screen reader compatibility (semantic HTML)
- Sufficient color contrast (WCAG AA)
- Focus indicators visible

### Test Data Generators (for Property-Based Tests)

**Task Arbitrary**:
```javascript
const taskArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  text: fc.string({ minLength: 1 }),
  completed: fc.boolean(),
  createdAt: fc.nat()
});
```

**Quick Link Arbitrary**:
```javascript
const quickLinkArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  name: fc.string({ minLength: 1 }),
  url: fc.webUrl()
});
```

**Whitespace String Arbitrary**:
```javascript
const whitespaceArbitrary = fc.stringOf(
  fc.constantFrom(' ', '\t', '\n', '\r')
);
```

### Manual Testing Checklist

- [ ] Time displays correctly and updates every second
- [ ] Date displays correctly
- [ ] Greeting changes at correct time boundaries
- [ ] Timer counts down correctly
- [ ] Timer start/stop/reset buttons work
- [ ] Tasks can be added, edited, completed, deleted
- [ ] Empty tasks are rejected
- [ ] Quick links can be added and deleted
- [ ] Quick links open in new tab
- [ ] Empty link fields are rejected
- [ ] All data persists after page reload
- [ ] UI is responsive and provides feedback
- [ ] Layout is clean and readable
- [ ] Works in all supported browsers

---

## Implementation Notes

### CSS Organization

The single CSS file should be organized into sections:
1. **Reset/Base**: Normalize styles, box-sizing
2. **Layout**: Grid/flexbox for component positioning
3. **Typography**: Font families, sizes, line heights
4. **Components**: Styles for each section (greeting, timer, tasks, links)
5. **Interactive Elements**: Buttons, inputs, checkboxes
6. **States**: Hover, focus, active, completed
7. **Responsive**: Media queries for smaller screens

### JavaScript Best Practices

- Use ES6+ features (classes, arrow functions, destructuring)
- Use `const` and `let` (no `var`)
- Use template literals for string interpolation
- Use array methods (map, filter, reduce) over loops
- Add JSDoc comments for public methods
- Use strict equality (`===`) throughout
- Validate all user inputs
- Clean up intervals and event listeners

### Performance Considerations

- Debounce storage operations if needed
- Use event delegation for dynamic elements
- Minimize DOM manipulations (batch updates)
- Cache DOM element references
- Use `requestAnimationFrame` for animations if added

### Accessibility Considerations

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Provide focus indicators
- Use sufficient color contrast
- Support screen readers

### Browser Compatibility Notes

- Local Storage is supported in all target browsers
- ES6 features are supported in all target browsers
- No polyfills needed for target browser versions
- Test `localStorage` availability before use
- Handle private browsing mode (storage may be disabled)

