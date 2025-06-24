<script lang="ts">
  import { slide } from 'svelte/transition';

  // --- PROPS ---
  // The component expects an array of objects with a 'question' and 'answer'
  export let items: { question: string; answer:string }[] = [];

  // --- STATE ---
  // This variable tracks which item is currently open. null means all are closed.
  let activeIndex: number | null = null;

  // --- LOGIC ---
  function toggleItem(index: number) {
    // If the clicked item is already open, close it. Otherwise, open the clicked item.
    activeIndex = activeIndex === index ? null : index;
  }
</script>

<div class="w-full">
  {#each items as item, index}
    <div class="border-b border-gray-300/60">
      <h3 class="flex w-full">
        <!-- The trigger is a button for accessibility -->
        <button
          on:click={() => toggleItem(index)}
          class="flex flex-1 items-center justify-between py-4 text-lg font-medium text-left transition-all hover:underline"
        >
          <span>{item.question}</span>
          <!-- The icon rotates based on the active state -->
          <svg
            class="h-4 w-4 shrink-0 transition-transform duration-200"
            class:rotate-180={activeIndex === index}
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </h3>

      <!-- The content panel slides open and closed -->
      {#if activeIndex === index}
        <div transition:slide={{ duration: 250 }} class="overflow-hidden text-lg text-gray-600">
          <div class="pb-4 pt-0">
            <p>{item.answer}</p>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>