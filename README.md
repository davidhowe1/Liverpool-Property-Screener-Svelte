# Liverpool Property Screener

Built using Svelte and Firebase, this app allows users to filter, sort, bookmark, add and delete property listing data in a single-page application.

# Contents

- [Filtering](#filtering)
- [Bookmarking](#bookmarking)
- [Sorting](#sorting)
- [Add and Remove Listings](#add-and-remove-listings)
- [Detailed View](#detailed-view)
- [Dark Mode](#dark-mode)
- [Mobile and Tablet Responsive](#mobile-and-tablet-responsive)
- [Visit](#visit)

# Features

## Filtering

Building an app that includes a large sample of data with lots of properties, I wanted to give the user the ability to filter the data based on a variety of criteria. I built the Property Screener with a side panel that has a series of options to help the user filter the listings. Starting from the top:

#### Search Bar

* A classic filtering search bar that takes the input as a value and compares that against the address of each rendered property listing. If the address contains the input data then the listing will be generated, otherwise, it won't appear.

#### Quick Filters

* These are quick toggle options that when clicked, apply the filter to the data and render the returned results. You can apply multiple filters to narrow the search further.

#### Price Slider

* Adjust this to see properties under the value of the slider. The slider's value is compared against the price property of each listing and renders each listing that has a price below the slider value.

#### Below Market Value

* This option, when toggled, takes the rendered property listings and their individual prices, and calculates the average price. It then compares those same property listings and filters out all of the property listings that are above the average price.

* This tool would be useful in finding a range of properties that fall below the average price of a particular set of properties. For example, finding properties that are below the average price of all three-bedroom properties for sale.

## Bookmarking

* With this application, a listing might catch the user's eye which they might want to look at later. The bookmarking feature allows the user to save the listing in a bookmarks panel which can be toggled into view. To bookmark a listing, click on the heart icon in the top right corner of the image. The listing will then appear in the bookmarks panel and can be removed by clicking the trash icon in the corner of the bookmark.

* When the bookmark icon is clicked an alert appears in the lower left corner of the app, notifying the user that they've just bookmarked a listing. If the listing is already bookmarked and the user tries to bookmark it again, an alert appears to let the user know that it has already been bookmarked. This stops the creation of duplicates within the bookmarks panel.

* The number of saved bookmarks is also totalled up and that number is updated and rendered next to the bookmarks button to show you how many listings are saved in the bookmarks panel. When listings are bookmarked, the bookmarks are stored in local storage ready for retrieval later if the app is closed and revisited.

## Sorting

At the top of the application is a toolbar which allows the user to sort the rendered listings and change the view.

* View Toggle: Starting from the left, there is a toggle view button which changes the view of the listings from a grid/card view to a list view when clicked.

* Sort By Price: Two buttons to toggle sorting the rendered listings by price ascending and price descending.

* Sort By Bedrooms: Two buttons to toggle sorting the rendered listings by bedrooms ascending and price descending.

* Sort By Bathrooms: Two buttons to toggle sorting the rendered listings by bathrooms ascending and price descending.

* Reset Options: When clicked, all applied sorting options are removed.

## Add and Remove Listings

* Clicking on the 'New Listing' button in the top toolbar opens a window that allows the user to paste a rightmove link and add the listing to their dashboard of properties in the UI. The listings are available to view by clicking the 'My Listings' tab in the sidebar. 

* Your added listings can be deleted by hovering over the listing and clicking the 'Delete' button at the top of the card image.

## Detailed View

* Clicking on a property listing navigates to a detailed view of that property. The page features all of the properties details and a button that takes you to the listing.

## Dark Mode

* Click the 'Toggle Theme' button to toggle the app theme from light to dark on click. When toggled, a class of 'dark' is added to the body tag and changes the light theme to a dark theme. The theme is then saved in localStorage and is retrieved when the application is refreshed.

## Mobile and Tablet Responsive

* Changes have been made to the UI to make it easier to use on tablet and mobile devices. For example, the sorting options are hidden until toggled using a 'Sort' button in the top right corner of the app to make the UI cleaner.

* The search bar is rendered at the top of the app in between the 'Menu' toggle and 'Sort' button so that it is more accessible.

* The side panel menu is toggled using the 'Menu' button at the top of the mobile app to make space for the listings.

* Functions are created to change the state of the toggled menus. For example, if the side panel menu is opened while the bookmarks panel or sorting options panel are visible, the bookmarks panel or sorting options panel will be hidden to avoid cluttering the UI with options that cannot be interacted with at that time.

# Visit

To visit and use the application, click on the link here: https://housescreener.co.uk/
