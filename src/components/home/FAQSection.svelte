<script lang="ts">

  import Accordion from '../ui/Accordion.svelte';

  interface FAQ {
    question: string;
    answer: string;
  }

  interface FAQCategory {
    category: string;
    questions: FAQ[];
  }

  export let faqCategories: FAQCategory[] = [];
</script>

<section id="homepage-faq" class="w-full py-12 bg-white">
  <div class="container px-4 md:px-6 mx-auto max-w-5xl">
    <div id="faq-header" class="text-center mb-10">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">Frequently Asked Questions</h2>
    </div>

    <div id="faq-category-grid" class="grid grid-cols-1 gap-12">
      {#each faqCategories as category}
        <div id="faq-category-{category.category.toLowerCase().replace(/[\s&]+/g, '-')}" class="bg-gray-50 rounded-lg p-6 border">

          <h3 class="text-xl font-semibold text-gray-800 mb-4">{category.category}</h3>

          <Accordion items={category.questions} />
        </div>
      {/each}
    </div>
  </div>
</section>