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

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
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

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorageManager, GreetingController };
}
