<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search', 'clear'])

const rawInput = ref('')
const tags = ref(['chicken', 'garlic', 'tomatoes'])

function addTag() {
  const trimmed = rawInput.value.trim().toLowerCase().replace(/,/g, '')
  if (trimmed && !tags.value.includes(trimmed)) {
    tags.value.push(trimmed)
  }
  rawInput.value = ''
}

function handleKeyDown(event) {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault()
    addTag()
  } else if (event.key === 'Backspace' && rawInput.value === '' && tags.value.length > 0) {
    tags.value.pop()
  }
}

function removeTag(index) {
  tags.value.splice(index, 1)
}

function triggerSearch() {
  if (tags.value.length > 0) {
    emit('search', tags.value)
  }
}

function clearAll() {
  tags.value = []
  rawInput.value = ''
  emit('clear')
}
</script>

<template>
  <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-[#887456]/20 shadow-xl mb-8 relative overflow-hidden">
    <label class="block text-[11px] font-black uppercase tracking-widest text-[#71351A] mb-3 font-['Plus_Jakarta_Sans']">
      What ingredients are in your kitchen?
    </label>

    <!-- Tag Input Box -->
    <div class="flex flex-wrap items-center gap-2 p-3 bg-white border border-[#887456]/30 rounded-xl focus-within:border-[#71351A] focus-within:ring-2 focus-within:ring-[#71351A]/20 transition-all shadow-inner">
      <span
          v-for="(tag, index) in tags"
          :key="index"
          class="inline-flex items-center gap-2 bg-[#71351A] text-[#B3A38A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
      >
        {{ tag }}
        <button
            @click="removeTag(index)"
            class="text-[#B3A38A]/70 hover:text-white text-xs font-bold transition cursor-pointer"
            type="button"
        >
          ✕
        </button>
      </span>

      <input
          v-model="rawInput"
          @keydown="handleKeyDown"
          @blur="addTag"
          type="text"
          placeholder="Type ingredient + Enter..."
          class="flex-grow bg-transparent text-sm text-[#4E2A26] placeholder-[#887456] focus:outline-none min-w-[180px] py-1 font-medium"
      />
    </div>

    <!-- Actions Bar -->
    <div class="flex justify-between items-center mt-5">
      <button
          v-if="tags.length > 0"
          @click="clearAll"
          class="text-xs font-bold text-[#887456] hover:text-[#71351A] transition cursor-pointer"
      >
        Reset Ingredients
      </button>
      <span v-else></span>

      <button
          @click="triggerSearch"
          :disabled="tags.length === 0"
          class="inline-flex items-center gap-2 bg-[#71351A] hover:bg-[#4E2A26] disabled:opacity-40 text-[#B3A38A] font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition cursor-pointer active:scale-95 font-['Plus_Jakarta_Sans']"
      >
        <span>🍴 Generate Recipes</span>
      </button>
    </div>
  </div>
</template>