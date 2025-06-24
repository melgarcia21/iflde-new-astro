<!-- src/components/about/AboutInstitute.svelte -->
<script lang="ts">
  let sectionVisible = false;
  let gridVisible = false;

  function viewport(
    node: HTMLElement,
    options: { threshold: number; once?: boolean } = {
      threshold: 0.1,
      once: true,
    }
  ) {
    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.dispatchEvent(new CustomEvent("enter"));
          if (options.once) {
            observer.unobserve(node);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  const cards = [
    {
      id: "mission",
      title: "Mission",
      text: "To provide accessible, flexible, and quality digital education through innovative learning solutions that empower lifelong learners.",
    },
    {
      id: "vision",
      title: "Vision",
      text: "To be a leading institution in flexible learning and digital education, recognized for excellence in borderless and innovative education.",
    },
    {
      id: "mandate",
      title: "Mandate",
      text: "To develop and implement high-quality flexible learning programs aligned with national educational standards and industry needs.",
    },
  ];
</script>

<!-- Styles are now in the global animations.css, so the style block is not needed here -->

<div
  id="about-institute-section"
  class="max-w-7xl mx-auto px-4 py-20"
  class:motion-safe:animate-fadeInUp={sectionVisible}
  use:viewport={{ threshold: 0.2 }}
  on:enter={() => (sectionVisible = true)}
>
  <h2
    id="about-institute-title"
    class="text-4xl font-bold mb-8 text-center text-purple-800"
  >
    About IFLDE
  </h2>

  <div
    id="about-institute-grid"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
    class:motion-safe:animate-fadeInUp={gridVisible}
    use:viewport={{ threshold: 0.1 }}
    on:enter={() => (gridVisible = true)}
  >
    {#each cards as card, i}
      <div
        id="{card.id}-card"
        class="bg-white p-8 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        style="--delay: {i * 150}ms"
      >
        <h3
          id="{card.id}-header"
          class="text-xl font-semibold mb-4 text-purple-950"
        >
          {card.title}
        </h3>
        <p id="{card.id}-text" class="text-lg text-purple-900 leading-relaxed">
          {card.text}
        </p>
      </div>
    {/each}
  </div>

  <div
    id="rtu-role-highlight"
    class="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 my-8 transform hover:scale-[1.02] transition-all duration-300 motion-safe:animate-scaleIn"
  >
    <h3 id="rtu-role-header" class="text-xl font-semibold mb-4 text-purple-950">
      Our Role at RTU
    </h3>
    <p id="rtu-role-text" class="text-lg text-purple-900 leading-relaxed">
          As dedicated institute for flexible learning, we spearhead the development and implementation of innovative digital education solutions. Our focus is on making quality education accessible to all through modern learning approaches and technologies.
    </p>
  </div>
</div>
