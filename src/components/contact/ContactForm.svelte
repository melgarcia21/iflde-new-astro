<script lang="ts">
  import { Building2, Phone, Mail } from "lucide-svelte";

  // Privacy policy data is defined as a local constant.
  const privacyPolicyData = {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information We Collect",
        content:
          "When you use our contact form, we collect the information you provide, which may include your name, email address, phone number, and any message content you share with us.",
      },
      {
        heading: "How We Use Your Information",
        content:
          "We use the information you provide solely to communicate with you and address your inquiries or requests.",
      },
      {
        heading: "Your Rights",
        content:
          "You have the right to access, correct, or delete your personal information at any time. Please contact us for assistance.",
      },
      {
        heading: "Data Retention",
        content:
          "We will maintain your contact information only for as long as necessary to respond to your inquiry.",
      },
    ],
    acceptButtonText: "I Understand and Agree",
  };

  // TypeScript Interfaces for type safety
  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
    privacyPolicy: boolean;
  }
  interface ErrorsState {
    email?: string;
    message?: string;
    privacyPolicy?: string;
  }

  // Svelte reactive state variables
  let formData: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    privacyPolicy: false,
  };
  let errors: ErrorsState = {};
  let showPrivacyPolicy = false;

  const validateForm = (): boolean => {
    const newErrors: ErrorsState = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.privacyPolicy)
      newErrors.privacyPolicy = "You must agree to the Privacy Policy";

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Create and download a JSON file for demonstration
      const jsonData = JSON.stringify(formData, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "contact_form_data.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Reset form after submission
      formData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
        privacyPolicy: false,
      };
    }
  };

  const acceptPrivacyPolicy = () => {
    showPrivacyPolicy = false;
    formData.privacyPolicy = true;
    if (errors.privacyPolicy) errors.privacyPolicy = undefined;
  };
</script>

<!-- The 'motion-safe:' prefix is removed from this div -->
<div id="contact-form-section" class="py-16 sm:py-24 animate-fadeInUp">
  <div
    class="max-w-7xl mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-16"
  >
    <!-- Left column - Contact info AND Map -->
    <div class="flex flex-col justify-start">

      <h2 class="text-4xl font-bold tracking-tight text-purple-950 sm:text-5xl">
        Get in touch
      </h2>
      
      <p class="mt-4 text-lg leading-8 text-gray-600">
        We're happy to answer any questions. Contact us directly or fill out the
        form and we’ll get back to you shortly.
      </p>


      <div class="mt-10 space-y-6">
        <div class="flex items-center gap-x-4">
          <Building2 class="h-6 w-6 flex-none text-purple-800" />
          <p>Rizal Technological University, Boni Ave, Mandaluyong</p>
        </div>
        <div class="flex items-center gap-x-4">
          <Phone class="h-6 w-6 flex-none text-purple-800" />
          <p>+63 976 047 2582</p>
        </div>
        <div class="flex items-center gap-x-4">
          <Mail class="h-6 w-6 flex-none text-purple-800" />
          <p>rtu-iflde@gmail.com</p>
        </div>
      </div>



      <!-- Map Section (integrated here) -->
      <div id="map-section" class="mt-12">
        <h3 class="text-2xl font-semibold mb-4 text-purple-950">
          Our Location
        </h3>
        <div
          class="overflow-hidden rounded-lg shadow-md border border-gray-200"
        >
          <iframe
            id="google-maps-embed"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2318.23117914427!2d121.04142296202032!3d14.574488450448928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c84f21cb9053%3A0xfcc017aa32d78946!2sRizal%20Technological%20University%20-%20Main%20Campus!5e0!3m2!1sen!2sph!4v1744256747062!5m2!1sen!2sph"
            class="w-full h-80 border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Google Maps embed of RTU-IFLDE location"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Right column - Form -->

    
    <div class="form-wrapper">
      <h1 class="text-4xl font-bold text-purple-900 mb-2">Reach us!</h1>
      <p class="text-purple-950/80 mb-8">
        Have questions or need assistance? Fill out the form below.
      </p>

      <form
        on:submit|preventDefault={handleSubmit}
        class="w-full flex flex-col gap-4"
        novalidate
      >
        <!-- The form's HTML structure is identical to the previous version -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="input-container">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder=" "
              bind:value={formData.firstName}
            /><label for="firstName">First Name</label>
          </div>
          <div class="input-container">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder=" "
              bind:value={formData.lastName}
            /><label for="lastName">Last Name</label>
          </div>
        </div>
        <div>
          <div class="input-container" class:error={errors.email}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
              bind:value={formData.email}
              on:input={() => (errors.email = undefined)}
            /><label for="email">Email</label>
          </div>
          {#if errors.email}<span class="error-message">{errors.email}</span
            >{/if}
        </div>
        <div class="input-container">
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder=" "
            bind:value={formData.phoneNumber}
          /><label for="phoneNumber">Phone Number</label>
        </div>
        <div>
          <div class="input-container" class:error={errors.message}>
            <textarea
              id="message"
              name="message"
              placeholder=" "
              required
              rows="4"
              bind:value={formData.message}
              on:input={() => (errors.message = undefined)}
            ></textarea><label for="message">Message</label>
          </div>
          {#if errors.message}<span class="error-message">{errors.message}</span
            >{/if}
        </div>
        <div>
          <label class="checkbox-label" class:error-text={errors.privacyPolicy}>
            <input
              type="checkbox"
              name="privacyPolicy"
              required
              bind:checked={formData.privacyPolicy}
              on:change={() => (errors.privacyPolicy = undefined)}
            />
            <span class="custom-checkbox"
              ><svg viewBox="0 0 16 16"
                ><polyline points="3.5 8 6.5 11 12.5 5"></polyline></svg
              ></span
            >
            <span
              >You agree to our friendly <button
                type="button"
                class="privacy-link"
                on:click={() => (showPrivacyPolicy = true)}
                >Privacy Policy</button
              >.</span
            >
          </label>
          {#if errors.privacyPolicy}<span class="error-message privacy-error"
              >{errors.privacyPolicy}</span
            >{/if}
        </div>
        <button type="submit" class="submit-button">SEND MESSAGE</button>
      </form>
    </div>
  </div>
</div>

{#if showPrivacyPolicy}
  <div class="modal-backdrop">
    <div class="modal-content">
      <button
        type="button"
        class="modal-close"
        on:click={() => (showPrivacyPolicy = false)}>×</button
      >
      <div class="modal-text">
        <h2 class="font-bold text-2xl leading-6">{privacyPolicyData.title}</h2>
        {#each privacyPolicyData.sections as section}
          <div>
            <h3 class="font-bold text-lg mt-4 mb-2">{section.heading}</h3>
            <p>{section.content}</p>
          </div>
        {/each}
      </div>
      <button type="button" class="modal-accept" on:click={acceptPrivacyPolicy}
        >{privacyPolicyData.acceptButtonText}</button
      >
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  /* CHANGED: Background color is now lighter (purple-50) */
  .form-wrapper {
    @apply max-w-md mx-auto p-8 bg-purple-50 rounded-xl shadow-2xl mt-16 lg:mt-0;
  }

  .input-container {
    @apply relative flex-1;
  }
  /* CHANGED: Inputs now have a solid white background for better readability */
  .input-container input,
  .input-container textarea {
    @apply w-full bg-white border-2 border-purple-200 rounded-md outline-none transition-colors duration-200 text-purple-900;
    padding: 1.5rem 0.75rem 0.5rem;
  }
  .input-container textarea {
    @apply resize-none h-36;
  }
  .input-container input:focus,
  .input-container textarea:focus {
    @apply border-purple-600 ring-2 ring-purple-600/20;
  }

  .input-container label {
    @apply absolute top-4 left-4 text-gray-500 pointer-events-none transition-all duration-200;
  }
  :global(input:focus + label),
  :global(input:not(:placeholder-shown) + label),
  :global(textarea:focus + label),
  :global(textarea:not(:placeholder-shown) + label) {
    @apply top-2 text-xs text-purple-700 font-semibold;
  }

  /* --- Checkbox Styles --- */
  .checkbox-label {
    @apply flex items-start gap-3 text-gray-700 cursor-pointer text-sm;
  }
  .checkbox-label input {
    @apply sr-only; /* Visually hidden but accessible */
  }
  /* ENHANCED: Converted to a flex container for perfect checkmark centering */
  .custom-checkbox {
    @apply mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 border-2 border-purple-300 rounded-md relative transition-all duration-200 bg-white;
  }
  .custom-checkbox svg {
    @apply absolute stroke-white stroke-[2.5px] fill-none origin-center;
    width: 1rem;
    height: 1rem;
    transform: scale(0);
    transition: transform 0.2s ease-in-out;
  }
  :global(input:checked + .custom-checkbox) {
    @apply bg-purple-700 border-purple-700;
  }
  :global(input:checked + .custom-checkbox svg) {
    transform: scale(1);
  }
  .privacy-link {
    @apply text-purple-800 font-semibold underline bg-transparent border-none cursor-pointer;
  }

  /* --- Error States --- */
  .input-container.error input,
  .input-container.error textarea {
    @apply border-red-500;
    animation: shake 0.4s ease;
  }
  .input-container.error label,
  .checkbox-label.error-text {
    @apply text-red-600;
  }
  .error-message {
    @apply text-red-600 text-xs mt-1 block;
  }
  .privacy-error {
    @apply ml-8;
  }

  /* --- Submit Button --- */
  .submit-button {
    @apply w-full bg-gradient-to-r from-purple-700 to-purple-900 text-white p-3 rounded-lg font-semibold tracking-wide transition-all duration-300;
  }
  .submit-button:hover {
    @apply shadow-lg shadow-purple-500/40 -translate-y-0.5;
  }

  /* --- Modal Styles --- */
  .modal-backdrop {
    /* CHANGED: Removed animate-fadeIn utility */
    @apply fixed inset-0 flex items-center justify-center z-50 bg-gray-900/60 backdrop-blur-sm;
    animation: fadeIn 0.3s ease-out;
  }
  .modal-content {
    /* CHANGED: Removed animate-scaleIn utility */
    @apply bg-white rounded-lg shadow-xl p-6 max-w-lg w-11/12 max-h-[90vh] overflow-y-auto relative;
    animation: scaleIn 0.3s ease-out;
  }
  .modal-close {
    @apply absolute right-4 top-2 text-3xl text-gray-500 hover:text-gray-800 bg-transparent border-none cursor-pointer;
  }
  .modal-text {
    @apply text-gray-700 mb-6 mt-8 space-y-4;
  }
  .modal-accept {
    @apply w-full bg-purple-800 text-white py-2.5 rounded-md font-semibold hover:bg-purple-900 transition-colors;
  }
</style>
