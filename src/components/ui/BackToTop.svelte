<!-- src/components/about/BackToTop.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowUp } from 'lucide-svelte';

  let isVisible = false;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  onMount(() => {
    const toggleVisibility = () => {
      isVisible = window.scrollY > 300;
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  });
</script>

{#if isVisible}
  <button
    id="back-to-top-button"
    on:click={scrollToTop}
    class="fixed bottom-8 right-8 p-3 bg-purple-950/80 hover:bg-purple-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50 motion-safe:animate-bounceIn"
    aria-label="Back to top"
  >
    <ArrowUp id="back-to-top-icon" class="h-6 w-6" />
  </button>
{/if}