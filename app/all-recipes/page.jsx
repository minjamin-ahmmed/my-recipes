"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

const AllRecipesPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const mealsPerPage = 12; // Number of meals to show per page

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Fetch all categories
        const categoriesRes = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const categoriesData = categoriesRes.data;

        // Fetch meals for each category
        const mealRequests = categoriesData.categories.map((category) =>
          axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
          )
        );

        // Resolve all meal requests
        const mealResults = await Promise.all(mealRequests);
        const mealsData = mealResults.flatMap((result) => result.data.meals); // Flatten meals

        setMeals(mealsData);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setError("Failed to load meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []); // Empty dependency array to run only once when the component mounts

  // Calculate the meals to display based on current page
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Handle adding meal to cart
  const handleAddToCart = (meal) => {
    setCart((prevCart) => [...prevCart, meal]); // Add the selected meal to the cart
    toast.success(`${meal.strMeal} has been added to your cart!`, {
      position: "top-center",
      autoClose: 3000, // Close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p className="text-center text-blue-500">Loading recipes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(meals.length / mealsPerPage);

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold text-center my-6">All Recipes</h1>
      {meals.length === 0 ? (
        <p className="text-center text-red-500">No recipes found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                  <Link href={`/all-recipes/${meal.idMeal}`}>
                    <span className="text-blue-500 mt-2 block cursor-pointer">
                      View Recipe
                    </span>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(meal)}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="flex items-center mx-2 text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllRecipesPage;
