const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
const BASE_URL = 'https://api.spoonacular.com/recipes'

// 💡 TOGGLE THIS: Set to true to save daily API points!
const USE_MOCK = true

// Mock data updated with full details & instructions
const MOCK_RECIPES = [
    {
        id: 716429,
        title: "Pasta with Garlic, Tomatoes and Spinach",
        image: "https://img.spoonacular.com/recipes/716429-312x231.jpg",
        readyInMinutes: 20,
        servings: 2,
        usedIngredientCount: 2,
        missedIngredientCount: 2,
        usedIngredients: [
            { id: 1, name: "garlic" },
            { id: 2, name: "tomatoes" }
        ],
        missedIngredients: [
            { id: 3, name: "pasta" },
            { id: 4, name: "spinach" }
        ],
        extendedIngredients: [
            { id: 1, originalName: "garlic", amount: 3, unit: "cloves", name: "garlic" },
            { id: 2, originalName: "tomatoes", amount: 2, unit: "medium", name: "tomatoes" },
            { id: 3, originalName: "pasta", amount: 200, unit: "grams", name: "pasta" },
            { id: 4, originalName: "spinach", amount: 2, unit: "cups", name: "spinach" },
            { id: 5, originalName: "olive oil", amount: 2, unit: "tbsp", name: "olive oil" }
        ],
        analyzedInstructions: [
            {
                steps: [
                    { number: 1, step: "Bring a large pot of salted water to a boil and cook pasta according to package instructions." },
                    { number: 2, step: "In a pan, heat olive oil over medium heat and sauté minced garlic for 1 minute until fragrant." },
                    { number: 3, step: "Add diced tomatoes and cook for 5 minutes until soft." },
                    { number: 4, step: "Toss in fresh spinach and cooked pasta until spinach is wilted and well combined. Serve hot!" }
                ]
            }
        ]
    },
    {
        id: 715538,
        title: "What The Fork Roasted Chicken Thighs",
        image: "https://img.spoonacular.com/recipes/715538-312x231.jpg",
        readyInMinutes: 35,
        servings: 4,
        usedIngredientCount: 2,
        missedIngredientCount: 1,
        usedIngredients: [
            { id: 5, name: "chicken" },
            { id: 1, name: "garlic" }
        ],
        missedIngredients: [
            { id: 6, name: "rosemary" }
        ],
        extendedIngredients: [
            { id: 5, originalName: "chicken thighs", amount: 4, unit: "pieces", name: "chicken" },
            { id: 1, originalName: "garlic", amount: 4, unit: "cloves", name: "garlic" },
            { id: 6, originalName: "fresh rosemary", amount: 2, unit: "sprigs", name: "rosemary" },
            { id: 9, originalName: "butter", amount: 2, unit: "tbsp", name: "butter" }
        ],
        analyzedInstructions: [
            {
                steps: [
                    { number: 1, step: "Preheat oven to 400°F (200°C)." },
                    { number: 2, step: "Melt butter and mix with minced garlic and chopped rosemary." },
                    { number: 3, step: "Rub chicken thighs with garlic-butter mixture and place on a baking sheet." },
                    { number: 4, step: "Bake for 30 minutes until chicken skin is crispy and internal temperature reaches 165°F." }
                ]
            }
        ]
    },
    {
        id: 644387,
        title: "Garlic Butter Tomato Omelet",
        image: "https://img.spoonacular.com/recipes/644387-312x231.jpg",
        readyInMinutes: 12,
        servings: 1,
        usedIngredientCount: 2,
        missedIngredientCount: 2,
        usedIngredients: [
            { id: 1, name: "garlic" },
            { id: 2, name: "tomatoes" }
        ],
        missedIngredients: [
            { id: 7, name: "eggs" },
            { id: 8, name: "butter" }
        ],
        extendedIngredients: [
            { id: 1, originalName: "garlic", amount: 1, unit: "clove", name: "garlic" },
            { id: 2, originalName: "tomatoes", amount: 1, unit: "small", name: "tomatoes" },
            { id: 7, originalName: "eggs", amount: 3, unit: "large", name: "eggs" },
            { id: 8, originalName: "butter", amount: 1, unit: "tbsp", name: "butter" }
        ],
        analyzedInstructions: [
            {
                steps: [
                    { number: 1, step: "Whisk 3 eggs in a bowl with salt and pepper." },
                    { number: 2, step: "Melt butter in a non-stick skillet over medium heat, add minced garlic and chopped tomatoes." },
                    { number: 3, step: "Pour in eggs and gently lift edges to let raw egg flow underneath." },
                    { number: 4, step: "Fold in half when cooked through and serve immediately." }
                ]
            }
        ]
    }
]

// 1. Fetch search list by ingredients
export async function fetchRecipesByIngredients(ingredientsArray) {
    if (!ingredientsArray || ingredientsArray.length === 0) return []

    if (USE_MOCK) {
        console.log('⚡ [MOCK MODE] Returning search results...')
        await new Promise(resolve => setTimeout(resolve, 300))
        return MOCK_RECIPES
    }

    const ingredientsParam = encodeURIComponent(ingredientsArray.join(','))
    const url = `${BASE_URL}/findByIngredients?ingredients=${ingredientsParam}&number=6&ranking=1&apiKey=${API_KEY}`

    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`)
        return await res.json()
    } catch (error) {
        console.warn('API failed or limit reached. Falling back to mock data...', error)
        return MOCK_RECIPES
    }
}

// 2. Fetch detailed info & instructions for a single recipe
export async function fetchRecipeDetails(recipeId) {
    if (USE_MOCK) {
        console.log(`⚡ [MOCK MODE] Returning recipe details for ID: ${recipeId}`)
        await new Promise(resolve => setTimeout(resolve, 300))
        const found = MOCK_RECIPES.find(r => r.id === Number(recipeId))
        return found || MOCK_RECIPES[0]
    }

    const url = `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`

    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`)
        return await res.json()
    } catch (error) {
        console.warn('API failed for details. Falling back to mock data...', error)
        return MOCK_RECIPES[0]
    }
}