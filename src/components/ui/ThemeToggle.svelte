<script>
  import { onMount } from 'svelte';
  
  let isDarkMode = false;

  onMount(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    // Apply theme immediately
    applyTheme();
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDarkMode = e.matches;
        applyTheme();
      }
    });
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme();
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  function applyTheme() {
    // Add/remove 'dark' class on html element
    // This triggers ALL dark: classes across your entire website
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<button
  on:click={toggleTheme}
  class="
    relative p-3 rounded-lg transition-all duration-200 ease-in-out
    bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
    text-gray-700 dark:text-gray-200
    border border-gray-200 dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    dark:focus:ring-offset-gray-800
    shadow-sm hover:shadow-md
  "
  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <div class="w-5 h-5 relative">
    <!-- Sun icon (visible in dark mode) -->
    <svg
      class="absolute inset-0 w-5 h-5 transition-all duration-300 transform {isDarkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
    </svg>
    
    <!-- Moon icon (visible in light mode) -->
    <svg
      class="absolute inset-0 w-5 h-5 transition-all duration-300 transform {isDarkMode ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
    </svg>
  </div>
</button>