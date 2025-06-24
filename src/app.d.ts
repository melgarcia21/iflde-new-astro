// src/app.d.ts

// This tells TypeScript that any HTML element in a Svelte component
// can have a custom event handler for 'on:enter'.
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:enter'?: (event: CustomEvent<any>) => any;
  }
}