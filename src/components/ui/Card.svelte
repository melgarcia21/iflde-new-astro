<script lang="ts">
  import { onMount } from 'svelte';

  // --- Props ---
  export let title: string;
  export let content: string;
  export let link: string;
  export let embedUrl: string | undefined = undefined;
  export let fbCaption: string | undefined = undefined;

  // --- State ---
  let isLoading = true;
  let isMounted = false;

  // --- Lifecycle ---
  // onMount ensures this code only runs in the browser, preventing SSR issues.
  onMount(() => {
    isMounted = true;
  });

  // --- Helper Functions ---
  const getFacebookPostUrl = (urlStr: string) => {
    try {
      const url = new URL(urlStr);
      const postUrl = url.searchParams.get('href');
      return decodeURIComponent(postUrl || '#');
    } catch {
      return '#'; // Fallback if URL parsing fails
    }
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
</script>

<div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
  <!-- Svelte's {#if} block handles conditional rendering -->
  {#if embedUrl && isMounted}
    <div class="w-full relative pt-[75%]">
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div id="card-spinner" class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#400040]"></div>
        </div>
      {/if}
      <!-- Svelte's on:event directive handles the load event -->
      <iframe
        src={`${embedUrl}&width=100%`}
        class="absolute top-0 left-0 w-full h-full border-0 overflow-y-auto"
        scrolling="yes"
        frameborder="0"
        allowfullscreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        on:load={() => isLoading = false}
      />
      {#if fbCaption && !isLoading}
        <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-50/90 border-t border-gray-100">
          <p class="text-sm text-gray-600 line-clamp-1">
            {truncateText(fbCaption, 15)}
            <a 
              href={getFacebookPostUrl(embedUrl)}
              target="_blank" rel="noopener noreferrer"
              class="ml-1 text-[#400040] hover:underline inline-flex items-center"
            >
              View post →
            </a>
          </p>
        </div>
      {/if}
    </div>
  {/if}

  <div class="p-3 md:p-4 flex flex-col flex-grow">
    <h3 class="text-lg md:text-xl font-semibold mb-2">{title}</h3>
    <p class="text-gray-600 mb-3 text-sm line-clamp-2">{content}</p>
    
    <!-- The link dynamically points to the Facebook post or the fallback link -->
    <a 
      href={embedUrl && isMounted ? getFacebookPostUrl(embedUrl) : link}
      target="_blank" rel="noopener noreferrer"
      class="inline-flex items-center px-3 py-1.5 bg-[#400040] text-white text-sm rounded-md hover:bg-[#500050] transition-colors duration-200 group w-fit mt-auto"
    >
      Read more
      <svg class="w-3 h-3 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  </div>
</div>