<script setup>
import { ref, watch, onMounted } from 'vue'
import IngredientInput from './components/IngredientInput.vue'
import RecipeCard from './components/RecipeCard.vue'
import GroceryList from './components/GroceryList.vue'
import RecipeModal from './components/RecipeModal.vue'
import { fetchRecipesByIngredients, fetchRecipeDetails } from './services/spoonacular'

const recipes = ref([])
const loading = ref(false)
const errorMsg = ref('')
const hasSearched = ref(false)

const selectedRecipe = ref(null)
const modalLoading = ref(false)
const groceryItems = ref([])

onMounted(() => {
  const saved = localStorage.getItem('whatthefork_grocery_list')
  if (saved) {
    try {
      groceryItems.value = JSON.parse(saved)
    } catch (e) {
      groceryItems.value = []
    }
  }
})

watch(groceryItems, (newList) => {
  localStorage.setItem('whatthefork_grocery_list', JSON.stringify(newList))
}, { deep: true })

async function handleSearch(ingredientsList) {
  loading.value = true
  errorMsg.value = ''
  hasSearched.value = true

  try {
    recipes.value = await fetchRecipesByIngredients(ingredientsList)
  } catch (err) {
    errorMsg.value = 'Failed to fetch recipes.'
  } finally {
    loading.value = false
  }
}

function handleClear() {
  recipes.value = []
  hasSearched.value = false
  errorMsg.value = ''
}

async function handleViewDetails(recipeId) {
  modalLoading.value = true
  selectedRecipe.value = null
  try {
    selectedRecipe.value = await fetchRecipeDetails(recipeId)
  } catch (err) {
    alert('Could not load recipe details.')
  } finally {
    modalLoading.value = false
  }
}

function closeModal() {
  selectedRecipe.value = null
  modalLoading.value = false
}

function addCustomGroceryItem(name) {
  const exists = groceryItems.value.some(
      i => i.name.toLowerCase() === name.toLowerCase() && !i.completed
  )
  if (!exists) {
    groceryItems.value.push({
      id: Date.now() + Math.random(),
      name: name,
      completed: false
    })
  }
}

function handleAddMissingIngredients(missingItems) {
  missingItems.forEach(item => {
    addCustomGroceryItem(item.name)
  })
}

function toggleGroceryItem(id) {
  const item = groceryItems.value.find(i => i.id === id)
  if (item) item.completed = !item.completed
}

function removeGroceryItem(id) {
  groceryItems.value = groceryItems.value.filter(i => i.id !== id)
}

function clearCompletedGrocery() {
  groceryItems.value = groceryItems.value.filter(i => !i.completed)
}

function clearAllGrocery() {
  groceryItems.value = []
}
</script>

<template>
  <div class="min-h-screen bg-[#B3A38A]/10 text-[#4E2A26] pb-16 font-sans">
    <!-- Header -->
    <header class="border-b border-[#887456]/20 bg-[#4E2A26] sticky top-0 z-40 shadow-md">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🍴</span>
          <div>
            <h1 class="text-xl font-black tracking-tight text-[#B3A38A] font-['Plus_Jakarta_Sans']">
              WhatThe<span class="text-white">Fork</span>
            </h1>
            <p class="text-[11px] text-[#B3A38A]/70">Pantry Leftover Engine</p>
          </div>
        </div>

        <span class="text-[11px] font-black bg-[#71351A] text-[#B3A38A] px-3.5 py-1 rounded-full border border-[#887456]/30 font-['Plus_Jakarta_Sans']">
          ⚡ Mock Mode
        </span>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 pt-8">
      <IngredientInput @search="handleSearch" @clear="handleClear" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div v-if="errorMsg" class="bg-rose-50 text-rose-700 p-4 rounded-xl mb-6 text-xs border border-rose-200 font-bold">
            {{ errorMsg }}
          </div>

          <div v-if="loading" class="text-center py-16">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#71351A] border-t-transparent mb-3"></div>
            <p class="text-xs font-bold text-[#887456]">Scanning recipes...</p>
          </div>

          <div v-else-if="hasSearched && recipes.length === 0" class="bg-white rounded-2xl border border-[#887456]/20 p-8 text-center shadow-sm">
            <p class="text-3xl mb-2">🍲</p>
            <h3 class="font-bold text-[#4E2A26]">No exact match found</h3>
            <p class="text-xs text-[#887456] mt-1">Try adding common staples like rice, eggs, or oil.</p>
          </div>

          <div v-else-if="recipes.length > 0">
            <h2 class="text-base font-black text-[#4E2A26] mb-4 font-['Plus_Jakarta_Sans']">
              Recommended Recipes ({{ recipes.length }})
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecipeCard
                  v-for="recipe in recipes"
                  :key="recipe.id"
                  :recipe="recipe"
                  @add-missing-to-grocery="handleAddMissingIngredients"
                  @view-details="handleViewDetails"
              />
            </div>
          </div>

          <div v-else class="bg-white/80 rounded-2xl p-10 text-center border border-[#887456]/20 shadow-sm">
            <p class="text-3xl mb-2">💡</p>
            <h3 class="font-black text-[#4E2A26] font-['Plus_Jakarta_Sans']">Ready to cook?</h3>
            <p class="text-xs text-[#887456] mt-1">Add your available ingredients above to generate custom meal ideas.</p>
          </div>
        </div>

        <div>
          <GroceryList
              :items="groceryItems"
              @add-custom-item="addCustomGroceryItem"
              @toggle-item="toggleGroceryItem"
              @remove-item="removeGroceryItem"
              @clear-completed="clearCompletedGrocery"
              @clear-all="clearAllGrocery"
          />
        </div>
      </div>
    </main>

    <RecipeModal
        :recipe="selectedRecipe"
        :loading="modalLoading"
        @close="closeModal"
    />
  </div>
</template>