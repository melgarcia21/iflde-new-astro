<!-- Navbar.svelte -->
<script>
  import { onMount } from "svelte";

  // Import Lucide icons
  import {
    Home,
    Layers,
    Newspaper,
    Phone,
    Menu,
    X,
  } from "lucide-svelte";

  // State variables
  let isSticky = false;
  let isMobileMenuOpen = false;
  let isClosing = false;

  // Navigation links configuration
  const links = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },

    {
      href: "about",
      label: "About",
      icon: Layers,
    },

    {
      href: "/news",
      label: "News",
      icon: Newspaper,
    },
    {
      href: "contact",
      label: "Contact",
      icon: Phone,
    },
  ];

  // Handle scroll for sticky navbar
  function handleScroll() {
    const headerSection = document.getElementById("header-section");
    if (headerSection) {
      const headerBottom = headerSection.getBoundingClientRect().bottom;
      isSticky = headerBottom < 0;
    }
  }

  // Handle mobile menu toggle
  function handleMenuToggle() {
    if (isMobileMenuOpen) {
      isClosing = true;
      setTimeout(() => {
        isMobileMenuOpen = false;
        isClosing = false;
      }, 200);
    } else {
      isMobileMenuOpen = true;
      isClosing = false;
    }
  }

  // Handle mobile menu link clicks
  function handleLinkClick() {
    isClosing = true;
    setTimeout(() => {
      isMobileMenuOpen = false;
      isClosing = false;
    }, 200);
  }

  // Handle navigation with scroll prevention
  function handleNavigation(href) {
    window.location.href = href;
    handleLinkClick();
  }

  // Get current pathname
  let currentPath = "";

  // Mount and cleanup event listeners
  onMount(() => {
    // Set initial path
    currentPath = window.location.pathname;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<!-- Sticky spacer -->
{#if isSticky}
  <div class="h-[48px] md:h-[100px]"></div>
{/if}

<nav class="navbar {isSticky ? 'sticky-navbar' : ''}">
  <div
    id="navbar-container"
    class="h-6 md:h-6 sm:h-8 max-w-7xl mx-auto px-4 flex items-center justify-between"
  >
    <!-- Brand -->
    <a
      href="/"
      id="navbar-brand"
      class="flex items-center gap-2 text-lg md:text-2xl font-bold hover:text-purple-300"
      style="font-family: 'Open Sans', sans-serif"
      on:click|preventDefault={() => (window.location.href = "/")}
    >
      <img
        src="/images/header/iflde-logo.png"
        alt="IFLDE Logo"
        width="40"
        height="40"
      />
      IFLDE
    </a>

    <!-- Desktop Navigation Links -->
    <div id="navbar-links" class="hidden md:flex items-center space-x-8">
      {#each links as link, index}
        <a
          href={link.href}
          class="group flex items-center space-x-2 relative text-base md:text-lg font-medium"
          on:click|preventDefault={() => handleNavigation(link.href)}
        >
          <span class="relative w-5 h-5 md:w-6 md:h-6">
            <svelte:component
              this={link.icon}
              class="h-4 w-4 md:h-6 md:w-6"
              fill={currentPath === link.href ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </span>
          <span
            class="link-text relative text-sm font-semibold text-white uppercase antialiased"
            style="font-family: 'Open Sans', sans-serif"
          >
            {link.label}
          </span>
        </a>
      {/each}
    </div>

    <div class="flex items-center space-x-4">
      <!-- Mobile Menu Button -->
      <button
        id="mobile-menu-button"
        class="flex md:hidden items-center justify-center p-2 text-white hover:bg-purple-700 rounded-lg transition-colors"
        on:click={handleMenuToggle}
        aria-label="Toggle menu"
      >
        {#if isMobileMenuOpen}
          <X class="h-6 w-6" />
        {:else}
          <Menu class="h-6 w-6" />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Navigation Menu -->
  <div
    class="mobile-menu {isMobileMenuOpen ? 'flex' : ''} {isClosing
      ? 'closing'
      : ''}"
    role="dialog"
    aria-hidden={!isMobileMenuOpen}
  >
    {#each links as link, index}
      <a
        href={link.href}
        class="mobile-menu-link"
        role="menuitem"
        on:click|preventDefault={() => handleNavigation(link.href)}
      >
        <span class="relative w-5 h-5 md:w-6 md:h-6">
          <svelte:component
            this={link.icon}
            class="h-4 w-4 md:h-6 md:w-6"
            fill={currentPath === link.href ? "currentColor" : "none"}
            stroke="currentColor"
          />
        </span>
        <span
          class="link-text relative text-sm font-semibold text-white uppercase antialiased"
          style="font-family: 'Open Sans', sans-serif"
        >
          {link.label}
        </span>
      </a>
    {/each}
  </div>
</nav>

<style>
  /* Navbar Dynamic Styles */
  .navbar {
    position: relative;
    z-index: 50;
    padding: 1rem 0;
    background-color: #35193e;
    color: white;
    transition: all 0.3s ease;
  }

  .sticky-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    background-color: #35193e;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .link-text::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: all 0.1s ease-in-out;
  }

  .group:hover .link-text::after {
    width: 100%;
  }

  /* Mobile Menu Animations */
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 40;
    background-color: #35193e;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-10%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none;
    }
  }

  .mobile-menu.flex {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .mobile-menu-link {
    width: 100%;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: white;
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      opacity 0.15s ease-in-out,
      transform 0.2s ease-in-out;
    opacity: 0;
    transform: translateY(-10px);
  }

  .mobile-menu-link:hover {
    background-color: #7c3aed;
  }

  .mobile-menu.flex .mobile-menu-link {
    opacity: 1;
    transform: translateY(0);
  }

  .mobile-menu.flex .mobile-menu-link:nth-child(1) {
    transition-delay: 0.05s;
  }

  .mobile-menu.flex .mobile-menu-link:nth-child(2) {
    transition-delay: 0.1s;
  }

  .mobile-menu.flex .mobile-menu-link:nth-child(3) {
    transition-delay: 0.15s;
  }

  .mobile-menu.flex .mobile-menu-link:nth-child(4) {
    transition-delay: 0.2s;
  }

  .mobile-menu.closing {
    transform: translateY(-10%);
    opacity: 0;
    visibility: visible;
  }

  .mobile-menu.closing .mobile-menu-link {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
