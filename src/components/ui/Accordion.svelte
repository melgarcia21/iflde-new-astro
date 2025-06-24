<script lang="ts">
  import { slide } from "svelte/transition";
  import { ChevronDown } from "lucide-svelte";

  export let items: { question: string; answer: string }[] = [];

  let activeIndex: number | null = null;

  function toggleItem(index: number) {
    activeIndex = activeIndex === index ? null : index;
  }
</script>

<div class="w-full space-y-3">
  {#each items as item, index}
    <div class="accordion-item" class:active={activeIndex === index}>
      <h2>
        <button
          on:click={() => toggleItem(index)}
          aria-expanded={activeIndex === index}
          class="accordion-trigger"
        >
          <span class="text-left font-semibold text-purple-900">
            {item.question}
          </span>

          <!-- This type of directive is not valid on components: class:rotate-180={activeIndex === index} -->
          <ChevronDown
            class="h-5 w-5 shrink-0 text-purple-600 transition-transform duration-300 {activeIndex ===
            index
              ? 'rotate-180'
              : ''}"
          />
        </button>
      </h2>

      {#if activeIndex === index}
        <div transition:slide={{ duration: 300 }} class="accordion-content">
          <p class="text-gray-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .accordion-item {
    @apply w-full rounded-lg bg-purple-50 border border-purple-200/80 transition-all duration-300;
  }
  .accordion-item.active {
    @apply bg-white shadow-lg;
  }

  .accordion-trigger {
    @apply flex w-full items-center justify-between p-5 text-left;
  }

  .accordion-content {
    @apply overflow-hidden px-5 pb-5 pt-0;
  }
</style>
