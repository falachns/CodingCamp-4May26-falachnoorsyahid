/**
 * StorageManager - Centralized interface for Local Storage operations
 * Handles all data persistence with error handling and validation
 */
class StorageManager {
  /**
   * Save data to Local Storage
   * @param {string} key - Storage key
   * @param {*} data - Data to save (will be JSON stringified)
   * @returns {boolean} - True if save successful, false otherwise
   */
  static save(key, data) {
    try {
      // Validate storage availability
      if (!this.isStorageAvailable()) {
        console.error('Local Storage is not available');
        return false;
      }

      // Validate key
      if (!key || typeof key !== 'string') {
        console.error('Invalid storage key');
        return false;
      }

      // Convert data to JSON and save
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      return true;
    } catch (error) {
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        console.error('Storage quota exceeded. Please clear old data.');
        return false;
      }
      
      // Handle other errors
      console.error('Error saving to Local Storage:', error);
      return false;
    }
  }

  /**
   * Load data from Local Storage
   * @param {string} key - Storage key
   * @returns {*} - Parsed data or null if not found/error
   */
  static load(key) {
    try {
      // Validate storage availability
      if (!this.isStorageAvailable()) {
        console.error('Local Storage is not available');
        return null;
      }

      // Validate key
      if (!key || typeof key !== 'string') {
        console.error('Invalid storage key');
        return null;
      }

      // Retrieve and parse data
      const jsonData = localStorage.getItem(key);
      
      // Return null if key doesn't exist
      if (jsonData === null) {
        return null;
      }

      // Parse JSON data
      return JSON.parse(jsonData);
    } catch (error) {
      // Handle JSON parse errors
      if (error instanceof SyntaxError) {
        console.error('Error parsing JSON from Local Storage:', error);
        return null;
      }
      
      // Handle other errors
      console.error('Error loading from Local Storage:', error);
      return null;
    }
  }

  /**
   * Remove data from Local Storage
   * @param {string} key - Storage key to remove
   * @returns {boolean} - True if removal successful, false otherwise
   */
  static remove(key) {
    try {
      // Validate storage availability
      if (!this.isStorageAvailable()) {
        console.error('Local Storage is not available');
        return false;
      }

      // Validate key
      if (!key || typeof key !== 'string') {
        console.error('Invalid storage key');
        return false;
      }

      // Remove item
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from Local Storage:', error);
      return false;
    }
  }

  /**
   * Clear all application data from Local Storage
   * @returns {boolean} - True if clear successful, false otherwise
   */
  static clear() {
    try {
      // Validate storage availability
      if (!this.isStorageAvailable()) {
        console.error('Local Storage is not available');
        return false;
      }

      // Clear all data
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing Local Storage:', error);
      return false;
    }
  }

  /**
   * Check if Local Storage is available
   * @returns {boolean} - True if available, false otherwise
   */
  static isStorageAvailable() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}



/**
 * GreetingController - Manages time display, date display, and time-based greeting
 * Updates clock every second and displays appropriate greeting based on time of day
 */
class GreetingController {
  /**
   * Create a GreetingController
   * @param {HTMLElement} timeElement - Element to display time
   * @param {HTMLElement} dateElement - Element to display date
   * @param {HTMLElement} greetingElement - Element to display greeting message
   */
  constructor(timeElement, dateElement, greetingElement) {
    this.timeElement = timeElement;
    this.dateElement = dateElement;
    this.greetingElement = greetingElement;
    this.intervalId = null;
  }

  /**
   * Initialize and start clock updates
   */
  init() {
    // Validate DOM elements
    if (!this.timeElement || !this.dateElement || !this.greetingElement) {
      console.error('GreetingController: Missing required DOM elements');
      return;
    }

    // Initial update
    this.updateTime();
    this.updateDate();
    this.updateGreeting();

    // Set up interval for updates (every 1000ms)
    this.intervalId = setInterval(() => {
      this.updateTime();
      this.updateGreeting();
    }, 1000);
  }

  /**
   * Update time display with HH:MM:SS formatting
   */
  updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    this.timeElement.textContent = timeString;
  }

  /**
   * Update date display with readable date format
   */
  updateDate() {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('en-US', options);
    this.dateElement.textContent = dateString;
  }

  /**
   * Update greeting message based on current time
   */
  updateGreeting() {
    const greeting = this.getGreeting();
    this.greetingElement.textContent = greeting;
  }

  /**
   * Get greeting based on current hour
   * @returns {string} - Time-based greeting message
   */
  getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    // Morning: 05:00 - 11:59
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    }
    // Afternoon: 12:00 - 16:59
    else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    }
    // Evening: 17:00 - 20:59
    else if (hour >= 17 && hour < 21) {
      return 'Good evening';
    }
    // Night: 21:00 - 04:59
    else {
      return 'Good night';
    }
  }

  /**
   * Cleanup interval on page unload
   */
  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}


/**
 * TimerController - Manages a customizable countdown timer
 * Provides start, stop, reset, and duration customization functionality
 */
class TimerController {
  /**
   * Create a TimerController
   * @param {HTMLElement} displayElement - Element to display timer
   * @param {HTMLElement} startBtn - Start button element
   * @param {HTMLElement} stopBtn - Stop button element
   * @param {HTMLElement} resetBtn - Reset button element
   * @param {HTMLElement} durationInput - Input element for duration
   * @param {HTMLElement} setDurationBtn - Button to set duration
   */
  constructor(displayElement, startBtn, stopBtn, resetBtn, durationInput, setDurationBtn) {
    this.displayElement = displayElement;
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;
    this.resetBtn = resetBtn;
    this.durationInput = durationInput;
    this.setDurationBtn = setDurationBtn;
    
    // State management
    this.defaultDuration = 1500; // 25 minutes in seconds
    this.timeRemaining = this.defaultDuration;
    this.isRunning = false;
    this.intervalId = null;
  }

  /**
   * Initialize timer with default duration and set up event listeners
   */
  init() {
    // Validate DOM elements
    if (!this.displayElement || !this.startBtn || !this.stopBtn || !this.resetBtn) {
      console.error('TimerController: Missing required DOM elements');
      return;
    }

    // Set initial display
    this.updateDisplay();

    // Set up event listeners
    this.startBtn.addEventListener('click', () => this.start());
    this.stopBtn.addEventListener('click', () => this.stop());
    this.resetBtn.addEventListener('click', () => this.reset());
    
    // Set up duration customization if elements exist
    if (this.durationInput && this.setDurationBtn) {
      this.setDurationBtn.addEventListener('click', () => this.setDuration());
      this.durationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.setDuration();
        }
      });
    }
  }

  /**
   * Set custom timer duration
   */
  setDuration() {
    // Don't allow changing duration while timer is running
    if (this.isRunning) {
      alert('Please stop the timer before changing the duration.');
      return;
    }

    const minutes = parseInt(this.durationInput.value, 10);
    
    // Validate input
    if (isNaN(minutes) || minutes < 1 || minutes > 120) {
      alert('Please enter a valid duration between 1 and 120 minutes.');
      return;
    }

    // Set new default duration
    this.defaultDuration = minutes * 60;
    this.timeRemaining = this.defaultDuration;
    
    // Update display
    this.updateDisplay();
  }

  /**
   * Start countdown timer
   */
  start() {
    // Ignore if already running
    if (this.isRunning) {
      return;
    }

    // Set running state
    this.isRunning = true;

    // Start countdown interval
    this.intervalId = setInterval(() => {
      // Decrease time remaining
      this.timeRemaining--;

      // Update display
      this.updateDisplay();

      // Stop at 00:00
      if (this.timeRemaining <= 0) {
        this.timeRemaining = 0;
        this.stop();
      }
    }, 1000);
  }

  /**
   * Stop/pause countdown timer
   */
  stop() {
    // Clear interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Set running state to false
    this.isRunning = false;
  }

  /**
   * Reset timer to default duration
   */
  reset() {
    // Stop timer if running
    this.stop();

    // Reset time to default duration
    this.timeRemaining = this.defaultDuration;

    // Update display
    this.updateDisplay();
  }

  /**
   * Update display with current time remaining
   */
  updateDisplay() {
    const formattedTime = this.formatTime(this.timeRemaining);
    this.displayElement.textContent = formattedTime;
  }

  /**
   * Format time as MM:SS
   * @param {number} totalSeconds - Total seconds to format
   * @returns {string} - Formatted time string (MM:SS)
   */
  formatTime(totalSeconds) {
    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Pad with zeros and return formatted string
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  /**
   * Cleanup interval on page unload
   */
  destroy() {
    this.stop();
  }
}

/**
 * TaskManager - Manages task CRUD operations and persistence
 * Handles task creation, editing, completion, deletion, and Local Storage sync
 */
class TaskManager {
  /**
   * Create a TaskManager
   * @param {HTMLElement} inputElement - Task input field element
   * @param {HTMLElement} addButton - Add task button element
   * @param {HTMLElement} listElement - Task list container element
   * @param {HTMLElement} sortSelect - Sort dropdown element
   */
  constructor(inputElement, addButton, listElement, sortSelect) {
    this.inputElement = inputElement;
    this.addButton = addButton;
    this.listElement = listElement;
    this.sortSelect = sortSelect;
    this.tasks = [];
    this.currentSort = 'default';
  }

  /**
   * Initialize and load saved tasks
   */
  init() {
    // Validate DOM elements
    if (!this.inputElement || !this.addButton || !this.listElement) {
      console.error('TaskManager: Missing required DOM elements');
      return;
    }

    // Load tasks from storage
    this.loadTasks();

    // Render tasks
    this.renderTasks();

    // Set up event listeners
    this.addButton.addEventListener('click', () => {
      const text = this.inputElement.value;
      this.addTask(text);
    });

    // Add enter key listener
    this.inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const text = this.inputElement.value;
        this.addTask(text);
      }
    });

    // Set up sort listener if element exists
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderTasks();
      });
    }
  }

  /**
   * Check if task with same text already exists
   * @param {string} text - Task text to check
   * @returns {boolean} - True if duplicate exists, false otherwise
   */
  isDuplicate(text) {
    return this.tasks.some(task => task.text.toLowerCase() === text.toLowerCase());
  }

  /**
   * Add new task
   * @param {string} text - Task text
   * @returns {boolean} - True if task added successfully, false otherwise
   */
  addTask(text) {
    // Validate input - must be non-empty after trimming
    const trimmedText = text ? text.trim() : '';
    
    if (!trimmedText) {
      // Silent rejection for empty input
      return false;
    }

    // Check for duplicate
    if (this.isDuplicate(trimmedText)) {
      alert('This task already exists in your list!');
      return false;
    }

    // Create new task object
    const task = {
      id: Date.now().toString(), // Generate unique ID using timestamp
      text: trimmedText,
      completed: false,
      createdAt: Date.now()
    };

    // Add to tasks array
    this.tasks.push(task);

    // Clear input field
    this.inputElement.value = '';

    // Save to storage
    this.saveTasks();

    // Re-render tasks
    this.renderTasks();

    return true;
  }

  /**
   * Toggle task completion status
   * @param {string} taskId - Task ID to toggle
   * @returns {boolean} - True if task toggled successfully, false otherwise
   */
  toggleTask(taskId) {
    // Find task by ID
    const task = this.tasks.find(t => t.id === taskId);

    if (!task) {
      console.error('TaskManager: Task not found:', taskId);
      return false;
    }

    // Toggle completion status
    task.completed = !task.completed;

    // Save to storage
    this.saveTasks();

    // Re-render tasks
    this.renderTasks();

    return true;
  }

  /**
   * Edit task text
   * @param {string} taskId - Task ID to edit
   * @param {string} newText - New task text
   * @returns {boolean} - True if task edited successfully, false otherwise
   */
  editTask(taskId, newText) {
    // Validate new text - must be non-empty after trimming
    const trimmedText = newText ? newText.trim() : '';
    
    if (!trimmedText) {
      console.error('TaskManager: Cannot edit task with empty text');
      return false;
    }

    // Find task by ID
    const task = this.tasks.find(t => t.id === taskId);

    if (!task) {
      console.error('TaskManager: Task not found:', taskId);
      return false;
    }

    // Update task text (preserve completion status)
    task.text = trimmedText;

    // Save to storage
    this.saveTasks();

    // Re-render tasks
    this.renderTasks();

    return true;
  }

  /**
   * Delete task
   * @param {string} taskId - Task ID to delete
   * @returns {boolean} - True if task deleted successfully, false otherwise
   */
  deleteTask(taskId) {
    // Find task index
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      console.error('TaskManager: Task not found:', taskId);
      return false;
    }

    // Remove task from array
    this.tasks.splice(taskIndex, 1);

    // Save to storage
    this.saveTasks();

    // Re-render tasks
    this.renderTasks();

    return true;
  }

  /**
   * Get sorted tasks based on current sort option
   * @returns {Array} - Sorted array of tasks
   */
  getSortedTasks() {
    const tasksCopy = [...this.tasks];

    switch (this.currentSort) {
      case 'alphabetical':
        return tasksCopy.sort((a, b) => a.text.localeCompare(b.text));
      
      case 'status':
        return tasksCopy.sort((a, b) => {
          // Incomplete tasks first
          if (a.completed === b.completed) {
            return 0;
          }
          return a.completed ? 1 : -1;
        });
      
      case 'default':
      default:
        // Default: newest first (reverse chronological by createdAt)
        return tasksCopy.sort((a, b) => b.createdAt - a.createdAt);
    }
  }

  /**
   * Render all tasks to DOM
   */
  renderTasks() {
    // Clear current list
    this.listElement.innerHTML = '';

    // Get sorted tasks
    const sortedTasks = this.getSortedTasks();

    // Render each task
    sortedTasks.forEach(task => {
      // Create list item
      const li = document.createElement('li');
      li.className = 'task-item';
      if (task.completed) {
        li.classList.add('completed');
      }

      // Create checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('click', () => {
        this.toggleTask(task.id);
      });

      // Create task text span
      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.text;
      
      // Add click to edit functionality
      textSpan.addEventListener('click', () => {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null) {
          this.editTask(task.id, newText);
        }
      });

      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-delete';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        this.deleteTask(task.id);
      });

      // Append elements to list item
      li.appendChild(checkbox);
      li.appendChild(textSpan);
      li.appendChild(deleteBtn);

      // Append list item to list
      this.listElement.appendChild(li);
    });
  }

  /**
   * Save tasks to Local Storage using StorageManager
   * @returns {boolean} - True if save successful, false otherwise
   */
  saveTasks() {
    return StorageManager.save('tasks', this.tasks);
  }

  /**
   * Load tasks from Local Storage using StorageManager
   * @returns {boolean} - True if load successful, false otherwise
   */
  loadTasks() {
    const loadedTasks = StorageManager.load('tasks');
    
    // If no tasks found or error, initialize with empty array
    if (!loadedTasks || !Array.isArray(loadedTasks)) {
      this.tasks = [];
      return false;
    }

    // Set tasks
    this.tasks = loadedTasks;
    return true;
  }
}

/**
 * QuickLinksManager - Manages quick link CRUD operations and persistence
 * Handles link creation, deletion, opening, and Local Storage sync
 */
class QuickLinksManager {
  /**
   * Create a QuickLinksManager
   * @param {HTMLElement} nameInput - Link name input field element
   * @param {HTMLElement} urlInput - Link URL input field element
   * @param {HTMLElement} addButton - Add link button element
   * @param {HTMLElement} listElement - Link list container element
   */
  constructor(nameInput, urlInput, addButton, listElement) {
    this.nameInput = nameInput;
    this.urlInput = urlInput;
    this.addButton = addButton;
    this.listElement = listElement;
    this.links = [];
  }

  /**
   * Initialize and load saved links
   */
  init() {
    // Validate DOM elements
    if (!this.nameInput || !this.urlInput || !this.addButton || !this.listElement) {
      console.error('QuickLinksManager: Missing required DOM elements');
      return;
    }

    // Load links from storage
    this.loadLinks();

    // Render links
    this.renderLinks();

    // Set up event listeners
    this.addButton.addEventListener('click', () => {
      const name = this.nameInput.value;
      const url = this.urlInput.value;
      this.addLink(name, url);
    });

    // Add enter key listener for both inputs
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        const name = this.nameInput.value;
        const url = this.urlInput.value;
        this.addLink(name, url);
      }
    };

    this.nameInput.addEventListener('keypress', handleEnter);
    this.urlInput.addEventListener('keypress', handleEnter);
  }

  /**
   * Add new quick link
   * @param {string} name - Link name
   * @param {string} url - Link URL
   * @returns {boolean} - True if link added successfully, false otherwise
   */
  addLink(name, url) {
    // Validate inputs - both must be non-empty after trimming
    const trimmedName = name ? name.trim() : '';
    const trimmedUrl = url ? url.trim() : '';
    
    if (!trimmedName || !trimmedUrl) {
      // Silent rejection for empty input
      return false;
    }

    // Validate and normalize URL
    const validatedUrl = this.validateUrl(trimmedUrl);
    
    if (!validatedUrl) {
      console.error('QuickLinksManager: Invalid URL format');
      return false;
    }

    // Create new link object
    const link = {
      id: Date.now().toString(), // Generate unique ID using timestamp
      name: trimmedName,
      url: validatedUrl
    };

    // Add to links array
    this.links.push(link);

    // Clear input fields
    this.nameInput.value = '';
    this.urlInput.value = '';

    // Save to storage
    this.saveLinks();

    // Re-render links
    this.renderLinks();

    return true;
  }

  /**
   * Delete quick link
   * @param {string} linkId - Link ID to delete
   * @returns {boolean} - True if link deleted successfully, false otherwise
   */
  deleteLink(linkId) {
    // Find link index
    const linkIndex = this.links.findIndex(l => l.id === linkId);

    if (linkIndex === -1) {
      console.error('QuickLinksManager: Link not found:', linkId);
      return false;
    }

    // Remove link from array
    this.links.splice(linkIndex, 1);

    // Save to storage
    this.saveLinks();

    // Re-render links
    this.renderLinks();

    return true;
  }

  /**
   * Open link in new tab
   * @param {string} url - URL to open
   */
  openLink(url) {
    // Open URL in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Render all links to DOM
   */
  renderLinks() {
    // Clear current list
    this.listElement.innerHTML = '';

    // Render each link
    this.links.forEach(link => {
      // Create link container
      const linkContainer = document.createElement('div');
      linkContainer.className = 'link-item';

      // Create link button
      const linkBtn = document.createElement('button');
      linkBtn.className = 'btn btn-link';
      linkBtn.textContent = link.name;
      linkBtn.addEventListener('click', () => {
        this.openLink(link.url);
      });

      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-delete btn-delete-small';
      deleteBtn.textContent = '×';
      deleteBtn.setAttribute('aria-label', `Delete ${link.name}`);
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering link open
        this.deleteLink(link.id);
      });

      // Append buttons to container
      linkContainer.appendChild(linkBtn);
      linkContainer.appendChild(deleteBtn);

      // Append container to list
      this.listElement.appendChild(linkContainer);
    });
  }

  /**
   * Save links to Local Storage using StorageManager
   * @returns {boolean} - True if save successful, false otherwise
   */
  saveLinks() {
    return StorageManager.save('quickLinks', this.links);
  }

  /**
   * Load links from Local Storage using StorageManager
   * @returns {boolean} - True if load successful, false otherwise
   */
  loadLinks() {
    const loadedLinks = StorageManager.load('quickLinks');
    
    // If no links found or error, initialize with empty array
    if (!loadedLinks || !Array.isArray(loadedLinks)) {
      this.links = [];
      return false;
    }

    // Set links
    this.links = loadedLinks;
    return true;
  }

  /**
   * Validate URL format and ensure protocol exists
   * @param {string} url - URL to validate
   * @returns {string|null} - Validated URL with protocol, or null if invalid
   */
  validateUrl(url) {
    // Check if URL is empty
    if (!url || typeof url !== 'string') {
      return null;
    }

    const trimmedUrl = url.trim();
    
    if (!trimmedUrl) {
      return null;
    }

    // Check if URL already has a protocol
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }

    // Auto-prepend https:// if no protocol
    return `https://${trimmedUrl}`;
  }
}

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorageManager, GreetingController, TimerController, TaskManager, QuickLinksManager };
}

/**
 * Initialize application on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Query all required DOM elements
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  const greetingElement = document.getElementById('greeting-text');
  
  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const resetBtn = document.getElementById('reset-btn');
  const timerDuration = document.getElementById('timer-duration');
  const setDurationBtn = document.getElementById('set-duration-btn');
  
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const taskSort = document.getElementById('task-sort');
  
  const linkName = document.getElementById('link-name');
  const linkUrl = document.getElementById('link-url');
  const addLinkBtn = document.getElementById('add-link-btn');
  const linkList = document.getElementById('link-list');

  // Validate all elements exist
  if (!timeElement || !dateElement || !greetingElement) {
    console.error('Missing greeting elements');
  } else {
    // Initialize GreetingController
    const greetingController = new GreetingController(timeElement, dateElement, greetingElement);
    greetingController.init();
  }

  if (!timerDisplay || !startBtn || !stopBtn || !resetBtn) {
    console.error('Missing timer elements');
  } else {
    // Initialize TimerController with optional duration controls
    const timerController = new TimerController(timerDisplay, startBtn, stopBtn, resetBtn, timerDuration, setDurationBtn);
    timerController.init();
  }

  if (!taskInput || !addTaskBtn || !taskList) {
    console.error('Missing task elements');
  } else {
    // Initialize TaskManager with optional sort control
    const taskManager = new TaskManager(taskInput, addTaskBtn, taskList, taskSort);
    taskManager.init();
  }

  if (!linkName || !linkUrl || !addLinkBtn || !linkList) {
    console.error('Missing quick links elements');
  } else {
    // Initialize QuickLinksManager
    const quickLinksManager = new QuickLinksManager(linkName, linkUrl, addLinkBtn, linkList);
    quickLinksManager.init();
  }
});
