# Custom Product Builder

## Overview

The Custom Product Builder is a modern, intuitive interface that allows users to create their own custom fruit salads and juices by selecting from a variety of fresh ingredients.

## Features

### 🍹 Product Type Selection
- **Custom Fruit Salad**: Create personalized fruit salads with fresh ingredients
- **Custom Fruit Juice**: Blend your favorite fruits into refreshing juices

### 🥗 Ingredient Management
- **Visual Ingredient Cards**: Each ingredient is displayed in an attractive card format
- **Category Filtering**: Filter ingredients by category (All, Fruit, Ice Cream, etc.)
- **Quantity Controls**: Easy +/- buttons to adjust ingredient quantities
- **Real-time Price Calculation**: See the total price update as you modify your selection

### 📋 Order Summary
- **Product Details**: Enter custom product name and special instructions
- **Selected Ingredients**: View all selected ingredients with quantities
- **Total Price**: Real-time calculation of the total cost
- **Action Buttons**: Create custom product or add to cart

## User Interface

### Layout
The interface is divided into three main sections:

1. **Product Type Selector** (Left Panel)
   - Choose between Custom Fruit Salad or Custom Fruit Juice
   - Sticky positioning for easy access

2. **Ingredients Selection** (Center Panel)
   - Grid layout of ingredient cards
   - Category filtering buttons
   - Scrollable ingredient list

3. **Order Summary** (Right Panel)
   - Product details form
   - Selected ingredients list
   - Total price display
   - Action buttons

### Responsive Design
- **Desktop**: Three-column layout with all sections visible
- **Tablet**: Responsive grid that adapts to screen size
- **Mobile**: Single-column layout with collapsible sections

## Technical Implementation

### Frontend (React)
- **State Management**: Uses React hooks for local state
- **Real-time Updates**: Automatic price calculation on ingredient changes
- **Filtering**: Dynamic category filtering based on available ingredients
- **Validation**: Form validation for required fields

### Backend (Spring Boot)
- **API Endpoints**: RESTful API for custom product creation
- **Price Calculation**: Server-side price calculation for accuracy
- **Data Validation**: Ingredient availability and validation
- **Database**: MongoDB for storing custom products and ingredients

### Data Flow
1. User selects product type (salad/juice)
2. User browses and selects ingredients with quantities
3. Real-time price calculation updates
4. User enters product details and special instructions
5. User can create custom product or add to cart
6. Backend validates and processes the request

## API Endpoints

### Custom Products
- `POST /api/custom-products` - Create a new custom product
- `POST /api/custom-products/calculate-price` - Calculate price for ingredients

### Raw Materials
- `GET /api/raw-materials` - Get all available ingredients
- `GET /api/raw-materials/category/{category}` - Get ingredients by category

## Sample Data

The application comes with pre-loaded sample ingredients:
- **Fruits**: Banana, Watermelon, Pineapple, Mango, Apple, Papaya, Orange, Wood Apple
- **Ice Cream**: Vanilla, Chocolate, Fruit and Nut

## Usage Instructions

1. **Select Product Type**: Choose between Custom Fruit Salad or Custom Fruit Juice
2. **Browse Ingredients**: Use category filters to find desired ingredients
3. **Add Ingredients**: Click the "+" button or "Add" button to include ingredients
4. **Adjust Quantities**: Use the +/- buttons to fine-tune quantities
5. **Enter Details**: Provide a custom product name and any special instructions
6. **Review Summary**: Check selected ingredients and total price
7. **Create or Add to Cart**: Choose to create a custom product or add to cart

## Features in Detail

### Real-time Price Calculation
- Updates automatically as ingredients are added/removed
- Shows individual ingredient prices
- Displays total cost prominently

### Ingredient Filtering
- Filter by category (All, Fruit, Ice Cream, etc.)
- Dynamic category detection from available ingredients
- Clear visual indication of active filter

### Quantity Management
- Intuitive +/- controls for each ingredient
- Visual feedback when ingredients are selected
- Easy removal of ingredients from selection

### Form Validation
- Required product name validation
- Minimum ingredient selection validation
- Clear error messages and notifications

### Responsive Design
- Optimized for desktop, tablet, and mobile devices
- Touch-friendly controls for mobile users
- Adaptive layout that works on all screen sizes

## Future Enhancements

- **Save Favorites**: Allow users to save custom product combinations
- **Recipe Sharing**: Share custom recipes with other users
- **Nutritional Information**: Display nutritional facts for custom products
- **Allergen Warnings**: Show allergen information for ingredients
- **Seasonal Ingredients**: Highlight seasonal availability
- **Bulk Ordering**: Support for larger quantities and bulk pricing 