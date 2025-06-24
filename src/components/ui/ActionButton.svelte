<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let label: string;
  export let className: string = '';
  
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }
</script>

<button
  on:click={handleClick}
  class="inline-block bg-[#400040] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#500050] transition-colors {className}"
>
  {label}
</button>