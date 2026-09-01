<script setup>
const props = defineProps({
  recipe: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
      v-if="recipe || loading"
      class="fixed inset-0 bg-[#4E2A26]/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      @click.self="emit('close')"
  >
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#887456]/30 flex flex-col my-auto relative">

      <!-- Close Button -->
      <button
          @click="emit('close')"
          class="absolute top-4 right-4 z-10 bg-[#4E2A26] text-[#B3A38A] hover:bg-[#71351A] w-8 h-8 rounded-full flex items-center justify-center border border-[#887456]/40 font-bold text-xs transition cursor-pointer shadow-md"
      >
        ✕
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="p-16 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#71351A] border-t-transparent mb-3"></div>
        <p class="text-xs font-bold text-[#4E2A26]">Fetching step-by-step instructions...</p>
      </div>

      <!-- Content -->
      <div v-else-if="recipe">
        <div class="relative h-64 sm:h-72 w-full bg-[#4E2A26]">
          <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#4E2A26] via-[#4E2A26]/50 to-transparent flex items-end p-6">
            <div>
              <h2 class="text-2xl font-black text-[#B3A38A] font-['Plus_Jakarta_Sans'] leading-tight mb-2">{{ recipe.title }}</h2>
              <div class="flex items-center gap-3 text-xs font-bold text-white">
                <span v-if="recipe.readyInMinutes">⏱️ {{ recipe.readyInMinutes }} mins</span>
                <span v-if="recipe.servings">🍽️ {{ recipe.servings }} servings</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 space-y-6">
          <div>
            <h3 class="text-[11px] font-black uppercase tracking-widest text-[#71351A] mb-3 font-['Plus_Jakarta_Sans']">Ingredients Needed</h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li
                  v-for="(ing, idx) in recipe.extendedIngredients"
                  :key="idx"
                  class="text-xs bg-[#B3A38A]/20 border border-[#887456]/20 p-3 rounded-xl font-bold text-[#4E2A26] flex justify-between"
              >
                <span class="capitalize">{{ ing.name || ing.originalName }}</span>
                <span class="text-[#887456] font-semibold">{{ ing.amount }} {{ ing.unit }}</span>
              </li>
            </ul>
          </div>

          <hr class="border-[#887456]/20" />

          <div>
            <h3 class="text-[11px] font-black uppercase tracking-widest text-[#71351A] mb-3 font-['Plus_Jakarta_Sans']">Preparation Steps</h3>
            <ol v-if="recipe.analyzedInstructions?.[0]?.steps?.length" class="space-y-4">
              <li
                  v-for="step in recipe.analyzedInstructions[0].steps"
                  :key="step.number"
                  class="flex gap-4 items-start"
              >
                <span class="flex-shrink-0 bg-[#71351A] text-[#B3A38A] font-black text-xs w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shadow-sm">
                  {{ step.number }}
                </span>
                <p class="text-xs sm:text-sm text-[#4E2A26] font-medium leading-relaxed pt-0.5">{{ step.step }}</p>
              </li>
            </ol>
            <p v-else class="text-xs text-[#887456] italic">No structured steps available.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>