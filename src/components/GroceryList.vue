<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'toggle-item',
  'remove-item',
  'add-custom-item',
  'clear-completed',
  'clear-all'
])

const customInput = ref('')

function handleAddCustom() {
  const trimmed = customInput.value.trim()
  if (trimmed) {
    emit('add-custom-item', trimmed)
    customInput.value = ''
  }
}

const completedCount = computed(() => props.items.filter(i => i.completed).length)
</script>

<template>
  <div class="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#887456]/20 p-6 sticky top-24 shadow-xl">
    <!-- Header -->
    <div class="flex justify-between items-center mb-5">
      <h2 class="text-base font-black text-[#4E2A26] flex items-center gap-2 font-['Plus_Jakarta_Sans']">
        <span>🛒 Grocery List</span>
      </h2>
      <span class="text-[11px] font-extrabold text-[#71351A] bg-[#71351A]/10 border border-[#71351A]/20 px-3 py-1 rounded-full">
        {{ completedCount }}/{{ items.length }} Done
      </span>
    </div>

    <!-- Quick Add Input -->
    <form @submit.prevent="handleAddCustom" class="flex gap-2 mb-4">
      <input
          v-model="customInput"
          type="text"
          placeholder="Add item..."
          class="flex-grow bg-white text-xs border border-[#887456]/30 rounded-xl px-3 py-2 text-[#4E2A26] placeholder-[#887456] focus:outline-none focus:border-[#71351A]"
      />
      <button
          type="submit"
          :disabled="!customInput.trim()"
          class="bg-[#71351A] hover:bg-[#4E2A26] disabled:opacity-30 text-[#B3A38A] font-extrabold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer font-['Plus_Jakarta_Sans']"
      >
        + Add
      </button>
    </form>

    <!-- Empty State -->
    <div v-if="items.length === 0" class="text-center py-10 bg-[#B3A38A]/10 rounded-xl border border-dashed border-[#887456]/30">
      <p class="text-2xl mb-1">📝</p>
      <p class="text-xs font-bold text-[#4E2A26]">List is empty</p>
      <p class="text-[11px] text-[#887456] mt-1 px-4">Missing ingredients from recipe cards will appear here.</p>
    </div>

    <!-- Items -->
    <ul v-else class="space-y-2 mb-4 max-h-80 overflow-y-auto pr-1">
      <li
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between p-3 rounded-xl border border-[#887456]/20 transition"
          :class="item.completed ? 'bg-[#B3A38A]/20 text-[#887456] line-through' : 'bg-white text-[#4E2A26] shadow-sm'"
      >
        <div
            @click="emit('toggle-item', item.id)"
            class="flex items-center gap-3 cursor-pointer select-none flex-grow"
        >
          <input
              type="checkbox"
              :checked="item.completed"
              class="h-4 w-4 rounded border-[#887456] text-[#71351A] focus:ring-[#71351A]/20 cursor-pointer"
          />
          <span class="text-xs font-bold capitalize">{{ item.name }}</span>
        </div>

        <button
            @click="emit('remove-item', item.id)"
            class="text-[#887456] hover:text-[#71351A] text-xs px-1.5 transition cursor-pointer"
        >
          ✕
        </button>
      </li>
    </ul>

    <!-- Actions -->
    <div v-if="items.length > 0" class="flex gap-2 border-t border-[#887456]/20 pt-4">
      <button
          @click="emit('clear-completed')"
          class="flex-1 text-[11px] font-bold text-[#4E2A26] bg-[#B3A38A]/20 hover:bg-[#B3A38A]/40 py-2 rounded-xl transition cursor-pointer"
      >
        Clear Done
      </button>
      <button
          @click="emit('clear-all')"
          class="flex-1 text-[11px] font-bold text-[#71351A] bg-[#71351A]/10 hover:bg-[#71351A]/20 border border-[#71351A]/20 py-2 rounded-xl transition cursor-pointer"
      >
        Clear All
      </button>
    </div>
  </div>
</template>