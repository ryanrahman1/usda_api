# USDA API Wrapper

A simple and easy-to-use wrapper for the USDA FoodData Central API. This package allows you to search for food items, retrieve detailed food data, and access nutrient information through a simple interface.

## Installation

You can install the package directly from GitHub using `npm`:

```bash
npm install https://github.com/ryanrahman1/usda_api
````

Alternatively, clone the repo and use it locally:

```bash
git clone https://github.com/ryanrahman1/usda_api
cd usda_api
npm install
```

## Get Your API Key

Before using the wrapper, you need to obtain an API key from the USDA FoodData Central:

1. Visit [USDA API Signup](https://fdc.nal.usda.gov/api-key-signup.html).
2. Sign up and get your API key.
3. Pass the API key when initializing the wrapper in your code.

---

## Usage

### Importing and Initializing the Wrapper

To use the wrapper in your project, import it and initialize it with your API key:

```js
import initializeWrapper from 'usda_api';

// Initialize the wrapper with your API key
const usda = initializeWrapper('YOUR_API_KEY');
```

### Available Functions

The wrapper provides the following functions:

#### `search(query, pageNumber = 1, pageSize = 10)`

Searches for food items based on a search term (e.g., `"cheddar cheese"`).

**Parameters:**

* `query` (string): The food item or keyword to search for (e.g., `"cheddar cheese"`).
* `pageNumber` (number, optional, default: 1): The page number of results to return.
* `pageSize` (number, optional, default: 10): The number of results per page.

**Returns:**

* An object containing:

  * `foods` (array): A list of food items, each including:

    * `description` (string): The name/description of the food item.
    * `brandName` (string): The brand name of the food item.
    * `servingSize` (number): The serving size in grams (or appropriate unit).
    * `fdcId` (string): A unique identifier for the food item.
  * `totalPages` (number): The total number of pages for the search query.
  * `currentPage` (number): The current page number.

#### `get_food_data(fdcId)`

Fetches full data for a specific food item using its `fdcId`.

**Parameters:**

* `fdcId` (string): The unique FoodData Central identifier for the food item (e.g., `"2070091"`).

**Returns:**

* An object containing detailed metadata for the food, including:

  * Food name, description, and serving size.
  * Nutritional information (calories, fat, protein, etc.).
  * Additional information like ingredients, food group, and more.

#### `get_food_nutrients(fdcId)`

Fetches only the nutrient information for a specific food item.

**Parameters:**

* `fdcId` (string): The unique FoodData Central identifier for the food item (e.g., `"2070091"`).

**Returns:**

* An object containing the nutrient data for the food item, such as:

  * `calories`
  * `protein`
  * `totalFat`
  * `carbohydrates`
  * `fiber`
  * `sugar`
  * Vitamins and minerals (e.g., `vitaminA`, `vitaminC`, `calcium`, etc.)

---

## Example Output

Here’s what you can expect as output from each of the functions:

### Search Function:

```json
{
  "foods": [
    {
      "description": "CHEDDAR CHEESE",
      "brandName": "Generic",
      "servingSize": 28,
      "fdcId": 2070091
    }
  ],
  "totalPages": 20,
  "currentPage": 1
}
```

### Food Data Function:

```json
{
  "description": "CHEDDAR CHEESE",
  "brandName": "Generic",
  "servingSize": 28,
  "fdcId": 2070091,
  "foodGroup": "Dairy and Egg Products",
  "labelNutrients": {
    "calories": 113,
    "protein": 7,
    "totalFat": 9,
    "carbohydrates": 1,
    "fiber": 0,
    "sugar": 0
  }
}
```

### Nutrient Data Function:

```json
{
  "calories": 113,
  "protein": 7,
  "totalFat": 9,
  "carbohydrates": 1,
  "fiber": 0,
  "sugars": 0,
  "vitamins": {
    "vitaminA": 10,
    "vitaminC": 0
  },
  "minerals": {
    "calcium": 200,
    "iron": 0
  }
}
```

---
