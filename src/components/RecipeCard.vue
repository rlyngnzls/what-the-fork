<script setup>
const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-missing-to-grocery', 'view-details'])
</script>

<template>
  <div class="bg-white/90 backdrop-blur-xl rounded-2xl border border-[#887456]/20 overflow-hidden flex flex-col justify-between hover:border-[#71351A]/40 hover:shadow-2xl transition duration-300 group">

    <!-- Clickable Header Area -->
    <div @click="emit('view-details', recipe.id)" class="cursor-pointer">
      <!-- Image Container -->
      <div class="relative h-52 overflow-hidden bg-[#4E2A26]">
        <img
            :src="recipe.image"
            :alt="recipe.title"
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-95 group-hover:opacity-100"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#4E2A26]/80 via-transparent to-transparent"></div>

        <!-- Coverage Badge -->
        <div class="absolute top-3 right-3 bg-[#4E2A26] text-[#B3A38A] text-[11px] font-black px-3 py-1 rounded-full border border-[#887456]/40 shadow-md">
          {{ recipe.usedIngredientCount }} / {{ recipe.usedIngredientCount + recipe.missedIngredientCount }} Have
        </div>
      </div>

      <!-- Content -->
      <div class="p-5">
        <h3 class="font-extrabold text-base text-[#4E2A26] mb-4 line-clamp-2 group-hover:text-[#71351A] transition font-['Plus_Jakarta_Sans'] leading-snug">
          {{ recipe.title }}
        </h3>

        <!-- Available Ingredients -->
        <div v-if="recipe.usedIngredients?.length" class="mb-3">
          <p class="text-[10px] font-black uppercase tracking-widest text-[#71351A] mb-1.5 font-['Plus_Jakarta_Sans']">
            ✓ In Your Pantry ({{ recipe.usedIngredients.length }})
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
                v-for="item in recipe.usedIngredients"
                :key="item.id"
                class="text-[11px] bg-[#B3A38A]/30 text-[#4E2A26] px-2.5 py-0.5 rounded-md border border-[#887456]/30 font-semibold"
            >
              {{ item.name }}
            </span>
          </div>
        </div>

        <!-- Missing Ingredients -->
        <div v-if="recipe.missedIngredients?.length">
          <p class="text-[10px] font-black uppercase tracking-widest text-[#887456] mb-1.5 font-['Plus_Jakarta_Sans']">
            🛒 Missing Items ({{ recipe.missedIngredients.length }})
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
                v-for="item in recipe.missedIngredients"
                :key="item.id"
                class="text-[11px] bg-[#71351A]/10 text-[#71351A] px-2.5 py-0.5 rounded-md border border-[#71351A]/20 font-semibold"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="p-4 bg-[#B3A38A]/10 border-t border-[#887456]/20 space-y-2">
      <button
          @click="emit('view-details', recipe.id)"
          class="w-full text-xs font-bold text-[#4E2A26] bg-white hover:bg-[#4E2A26] hover:text-[#B3A38A] py-2.5 rounded-xl transition text-center cursor-pointer border border-[#887456]/30 shadow-sm font-['Plus_Jakarta_Sans']"
      >
        📖 Cook Instructions
      </button>
      <button
          @click="emit('add-missing-to-grocery', recipe.missedIngredients)"
          class="w-full text-xs font-bold text-[#71351A] bg-[#71351A]/10 hover:bg-[#71351A] hover:text-[#B3A38A] border border-[#71351A]/30 py-2.5 rounded-xl transition text-center cursor-pointer font-['Plus_Jakarta_Sans']"
      >
        + Add Missing to Grocery List
      </button>
    </div>
  </div>
</template>