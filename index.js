import fetch from 'node-fetch';

function initializeWrapper(apikey) {
    const api_key = apikey;

    async function search(search_term, pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api_key}&query=${search_term}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        
            if (!response.ok) {
                throw new Error(`error +++++ ${response.status}`);
            }
        
            const json = await response.json();
            const results = json.foods.map(food => ({
                description: food.description,
                brandName: food.brandName,
                servingSize: food.servingSize,
                fdcId: food.fdcId
            }));
            return {
                foods: results,
                totalPages: Math.ceil(json.totalHits / pageSize),
                currentPage: pageNumber,
            };
        } catch (error) {
            return error.message;
        }
    }

    async function get_food_data(foodID) {
        try {
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodID}?api_key=${api_key}`);

            if (!response.ok) {
                throw new Error(`error +++++ ${response.status}`);
            }
        
            const json = await response.json();

            return json;

        }
        catch (error) {
            return error.message;
        }
    }

    async function get_food_nutrients(foodID) {
        try {
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodID}?api_key=${api_key}`);

            if (!response.ok) {
                throw new Error(`error +++++ ${response.status}`);
            }
        
            const json = await response.json();
            return json.labelNutrients;
        }
        catch (error) {
            return error.message;
        }
    }
}

export default initializeWrapper;