<script lang="ts">
  export let label: string;
  export let href: string;
  export let className: string;
</script>

<a
  href={href}
  class={`inline-block bg-[#400040] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#500050] transition-colors ${className ?? ''}`}
>
  {label}
</a>