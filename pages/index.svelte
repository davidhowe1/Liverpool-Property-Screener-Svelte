<script>
    metatags.title = 'Liverpool Property Screener'
    metatags.description = 'Description coming soon...'

    import { metatags } from '@roxi/routify'
    import { afterUpdate, onMount, tick } from 'svelte';
    import Login from '../components/login.svelte';
    import Sidebar from '../components/sidebar.svelte';
    import Toolbar from '../components/toolbar.svelte';
    import Properties from '../components/properties.svelte';
    import Bookmarks from '../components/bookmarks.svelte';
    import Alertmessage from '../components/alertmessage.svelte';
    import Errormessage from '../components/errormessage.svelte';
    import { propertyDetails } from '../stores.js';
    import { propertyListingsDatabase } from '../stores.js';
    import { initializeApp } from 'firebase/app';
    import { getDatabase, ref, onValue, remove } from 'firebase/database';
    import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

    let username = 'demo@google.com';
    let password = 'democredentials123';
    let loggedInUser = localStorage.getItem('user');
    let loginButtonContent = 'Login';

    const setUsername = (e) => username = e.target.value
    const setPassword = (e) => password = e.target.value

    const loginUser = async () => {
        if (verifyLoginCredentials()) {
            
            loginButtonContent = 'Logging in...'

            try {
                const auth = getAuth()
                const userCredentials = await signInWithEmailAndPassword(auth, username, password)
                const user = userCredentials.user.email
                loginButtonContent = `Welcome, ${user}`
                loggedInUser = user
                localStorage.setItem('user', user)
            } catch (error) {
                console.error('There was an issue when signing you in: ', error)
            }
        }
    }

    const logoutUser = async () => {
        try {
            const auth = getAuth()
            await signOut(auth)
            loginButtonContent = 'Login'
            loggedInUser = null
            localStorage.removeItem('user')
        } catch (error) {
            console.error('There was an error when signing you out: ', error)
        }
    }

    const checkUserIsLoggedIn = () => {
        const auth = getAuth()
        const user = auth.currentUser

        if (user) {
            loggedInUser = user.email
            localStorage.setItem('user', user.email)
        }
    }

    const verifyLoginCredentials = () => {
        if (!username.length > 0) {
            handleErrorMessage('Error: Please enter your username')
            return false
        }

        if (!password.length > 0) {
            handleErrorMessage('Error: Please enter your password')
            return false
        }

        return true
    }

    let properties = []
    let propertyListings;
    let priceSliderValue = 1000000

    const setPropertyListingDatabase = (listings) => {
        propertyListingsDatabase.set(listings)
        localStorage.setItem('property_listings', JSON.stringify(listings))
    }

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app)
    const databaseRef = ref(database, '/Property Listings')

    onValue(databaseRef, (snapshot) => {
        const data = snapshot.val()
        const databaseArray = Object.values(data)
        propertyListings = databaseArray
        setPropertyListingDatabase(databaseArray)
        properties = databaseArray
    }, (error) => {
        console.log('There was an error fetching the database: ', error)
    })

    const setPropertyIndex = (index) => {
        propertyDetails.set(index)
    }

    const removePropertyListing = (e) => {
        e.preventDefault()
        const property = e.target
        const id = property.parentElement.parentElement.id
        const propertyListing = properties.find(listing => listing.id === id)
        const propertyAddress = propertyListing.address
        const confirmDeletion = confirm('Are you sure you want to delete this listing?')
        
        if (confirmDeletion) {
            remove(ref(database, `Property Listings/${id}`))
            .then(() => {
                handleAlertMessage(`You have deleted '${propertyAddress}' from your listings.`)
            })
            .catch((error) => {
                consoleIndex.error('there was an error removing the listing: ', error)
            })
        }
    }



    let showRecentlyAdded = false
    let showNewHomes = false
    let showApartments = false
    let showTwoBed = false
    let showThreeBed = false
    let showFourPlusBed = false
    let showMyListings = false

    const toggleAllProperties = () => {
        showRecentlyAdded = false
        showNewHomes = false
        showApartments = false
        showTwoBed = false
        showThreeBed = false
        showFourPlusBed = false
        showMyListings = false
        priceSliderValue = 1000000
        resetBelowMarketValueHasRun()
    }

    const toggleRecent = () => showRecentlyAdded = !showRecentlyAdded
    const toggleNewHomes = () => showNewHomes = !showNewHomes
    const toggleApartments = () => showApartments = !showApartments
    const toggleTwoBed = () => showTwoBed = !showTwoBed
    const toggleThreeBed = () => showThreeBed = !showThreeBed
    const toggleFourBedPlus = () => showFourPlusBed = !showFourPlusBed
    const toggleMyListings = () => showMyListings = !showMyListings


    const filterProperties = () => {

        if (!Array.isArray(propertyListings)) {
            return;
        }

        let filteredProperties = propertyListings

        if (showRecentlyAdded) {
            filteredProperties = filteredProperties.filter(property => property.recentlyAdded === 'Recently Added')
        }

        if (showNewHomes) {
            filteredProperties = filteredProperties.filter(property => property.newHome === 'NEW HOME')
        }

        if (showApartments) {
            filteredProperties = filteredProperties.filter(property => property.type === 'Apartment')
        }

        if (showTwoBed) {
            filteredProperties = filteredProperties.filter(property => property.bedrooms === 2)
        }

        if (showThreeBed) {
            filteredProperties = filteredProperties.filter(property => property.bedrooms === 3)
        }

        if (showFourPlusBed) {
            filteredProperties = filteredProperties.filter(property => property.bedrooms >= 4)
        }

        if (showMyListings) {
            filteredProperties = filteredProperties.filter(property => property.recentlyAdded === 'YOUR LISTING')
        }

        if (!showRecentlyAdded && !showNewHomes && !showApartments && !showTwoBed && !showThreeBed && !showFourPlusBed) {
            filteredProperties = filteredProperties
        }

        const propertyValuesTotal = properties.reduce((accumulator, current) => {
            return accumulator + current.price
        }, 0)

        if (!belowMarketValueHasRun && belowMarketValueButtonClicked) {

            const averageValue = propertyValuesTotal / properties.length
            filteredProperties = properties.filter(property => property.price <= averageValue)

            const currencyValue = new Intl.NumberFormat('en-UK', {style: 'currency', currency: 'GBP'})
            const formattedCurrency = currencyValue.format(averageValue)
            handleAlertMessage(`Showing properties below average: ${formattedCurrency}`)
            belowMarketValueHasRun = true
        } else {
            resetBelowMarketValueHasRun()
        }
    
        filteredProperties = filteredProperties.filter(property => property.price < priceSliderValue);
        properties = filteredProperties;
    }



    let belowMarketValueHasRun = false;
    let belowMarketValueButtonClicked = false;

    const handleBelowMarketValueButtonClicked = () => {
        belowMarketValueButtonClicked = true;
        toggleMobileMenu()
    }

    const resetBelowMarketValueHasRun = () => {
        belowMarketValueHasRun = false;
        belowMarketValueButtonClicked = false
    }

    
    
    const handlePriceSliderChange = (e) => {
        priceSliderValue = parseInt(e.target.value);
        resetBelowMarketValueHasRun();
        toggleMobileMenu()
    }

    const resetPriceSlider = (e) => {
        priceSliderValue = parseInt(1000000)
        resetBelowMarketValueHasRun();
        toggleMobileMenu()
    }

    const filterPropertiesByPrice = () => {
        properties = properties.filter((property) => parseInt(property.price) <= priceSliderValue);
    }



    let searchQuery;

    const filterBySearch = (e) => {
        searchQuery = e.target.value
        properties = propertyListings.filter(
            property => property.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
        resetBelowMarketValueHasRun()
    }



    let sortByPrice;
    let sortByBedrooms;
    let sortByBathrooms;

    let sortingOptionsVisible = false;
    const toggleSortingOptionsMobile = () => sortingOptionsVisible = !sortingOptionsVisible

    const sortByPriceAscending = () => {
        sortByPrice = false
        sortByBedrooms = null
        sortByBathrooms = null
        properties = [...properties].sort((a, b) => b.price - a.price)
    }

    const sortByPriceDescending = () => {
        sortByPrice = true
        sortByBedrooms = null
        sortByBathrooms = null
        properties = [...properties].sort((a, b) => a.price - b.price)
    }

    const sortByBedroomsAscending = () => {
        sortByBedrooms = false
        sortByPrice = null
        sortByBathrooms = null
        properties = [...properties].sort((a, b) => b.bedrooms - a.bedrooms)
    }

    const sortByBedroomsDescending = () => {
        sortByBedrooms = true
        sortByPrice = null
        sortByBathrooms = null
        properties = [...properties].sort((a, b) => a.bedrooms - b.bedrooms)
    }

    const sortByBathroomsAscending = () => {
        sortByBathrooms = false
        sortByPrice = null
        sortByBedrooms = null
        properties = [...properties].sort((a, b) => b.bathrooms - a.bathrooms)
    }

    const sortByBathroomsDescending = () => {
        sortByBathrooms = true
        sortByPrice = null
        sortByBedrooms = null
        properties = [...properties].sort((a, b) => a.bathrooms - b.bathrooms)
    }

    const resetSortingOptions = () => {
        sortByPrice = null
        sortByBedrooms = null
        sortByBathrooms = null
        properties = properties.sort((a, b) => a.index - b.index)
    }



    let bookmarks = JSON.parse(localStorage.getItem('bookmarked_properties')) || []
    let propertyBookmark;

    const bookmarkPropertyListing = (e) => {
        e.preventDefault()
        let currentCard = e.target
        let id = currentCard.parentElement.parentElement.id
        propertyBookmark = properties.find(property => property.id === id)
        let existingBookmark = bookmarks.find(bookmark => bookmark.id === id)

        if (!existingBookmark) {
            bookmarks = [propertyBookmark, ...bookmarks]
            localStorage.setItem('bookmarked_properties', JSON.stringify(bookmarks))
            handleAlertMessage(`You saved '${propertyBookmark.address}' to your bookmarks.`)
        } else {
            handleAlertMessage(`You already have '${propertyBookmark.address}' in your bookmarks.`)
        }
    }

    const removeBookmark = (e) => {
        e.preventDefault()
        let currentBoomkark = e.target
        let id = currentBoomkark.parentElement.parentElement.id
        propertyBookmark = bookmarks.find(bookmark => bookmark.id === id)
        bookmarks = bookmarks.filter(bookmark => bookmark.id !== id)
        localStorage.setItem('bookmarked_properties', JSON.stringify(bookmarks))
        handleAlertMessage(`You removed '${propertyBookmark.address}' from your bookmarks.`)
    }

    let bookmarksBarIsShowing = false
    const showBookmarksBar = () => bookmarksBarIsShowing = !bookmarksBarIsShowing



    let isMobileMenuActive = false;

    const toggleMobileMenu = () => {
        isMobileMenuActive = !isMobileMenuActive
        if (sortingOptionsVisible) {
            toggleSortingOptionsMobile()
        }
    }
    


    let alertMessageText = ''
    let errorMessageText = ''
    let timeoutId = null

    const handleAlertMessage = (message) => {
        alertMessageText = message

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            alertMessageText = ''
        }, 6000)
    }

    const handleErrorMessage = (message) => {
        errorMessageText = message

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            errorMessageText = ''
        }, 6000)
    }

    const closeAlertMessage = () => alertMessageText = ''
    const closeErrorMessage = () => errorMessageText = ''

    afterUpdate(async () => {
        filterPropertiesByPrice()
        await tick()
    })



    let theme = 'light'

    const toggleTheme = () => {
        if (theme === 'light') {
            theme = 'dark'
            localStorage.setItem('theme', 'dark')
        } else {
            theme = 'light'
            localStorage.setItem('theme', 'light')
        }
    }

    const setThemeOnLoad = () => {
        theme = localStorage.getItem('theme')
        if (theme === 'light') {
            theme = 'light'
        } else {
            theme = 'dark'
        }
    }



    let listViewIsActive = false

    const toggleView = () => {
        if (listViewIsActive) {
            listViewIsActive = false
            localStorage.setItem('view', 'grid_view')
        } else {
            listViewIsActive = true
            localStorage.setItem('view', 'list_view')
        }
    }

    const setViewOnLoad = () => {
        let savedView = localStorage.getItem('view')
        if (savedView === 'list_view') {
            listViewIsActive = true
        } else {
            listViewIsActive = false
        }
    }

    onMount(() => {
        setThemeOnLoad()
        checkUserIsLoggedIn()
        setViewOnLoad()
    })

</script>

<body class={theme === 'light' ? 'light' : 'dark'}>

    {#if !loggedInUser}
    
        <Login
        username={username}
        password={password}
        loginButtonContent={loginButtonContent}
        loggedInUser={loggedInUser}
        setUsername={setUsername}
        setPassword={setPassword}
        loginUser={loginUser}
        handleErrorMessage={handleErrorMessage}
        toggleTheme={toggleTheme}
        theme={theme}
        />

    {:else}

        <section class="sorting_and_filtering">
            <div class={isMobileMenuActive ? "column_1" : "column_1 hidden"}>
                <Sidebar
                properties={properties}
                logoutUser={logoutUser}
                loggedInUser={loggedInUser}
                showRecentlyAdded={showRecentlyAdded}
                showNewHomes={showNewHomes}
                showApartments={showApartments}
                showTwoBed={showTwoBed}
                showThreeBed={showThreeBed}
                showFourPlusBed={showFourPlusBed}
                showMyListings={showMyListings}
                belowMarketValueHasRun={belowMarketValueHasRun}
                priceSliderValue={priceSliderValue}
                isMobileMenuActive={isMobileMenuActive}
                toggleMobileMenu={toggleMobileMenu}
                handlePriceSliderChange={handlePriceSliderChange}
                resetPriceSlider={resetPriceSlider}
                filterProperties={filterProperties}
                toggleAllProperties={toggleAllProperties}
                toggleRecent={toggleRecent}
                toggleNewHomes={toggleNewHomes}
                toggleApartments={toggleApartments}
                toggleTwoBed={toggleTwoBed}
                toggleThreeBed={toggleThreeBed}
                toggleFourBedPlus={toggleFourBedPlus}
                toggleMyListings={toggleMyListings}
                showBookmarksBar={showBookmarksBar}
                bookmarks={bookmarks}
                filterBySearch={filterBySearch}
                handleBelowMarketValueButtonClicked={handleBelowMarketValueButtonClicked}
                theme={theme}
                toggleTheme={toggleTheme}
                />
            </div>

            <div class="column_2">
                <Toolbar
                sortByPriceAscending={sortByPriceAscending}
                sortByPriceDescending={sortByPriceDescending}
                sortByBedroomsAscending={sortByBedroomsAscending}
                sortByBedroomsDescending={sortByBedroomsDescending}
                sortByBathroomsAscending={sortByBathroomsAscending}
                sortByBathroomsDescending={sortByBathroomsDescending}
                resetSortingOptions={resetSortingOptions}
                filterBySearch={filterBySearch}
                toggleMobileMenu={toggleMobileMenu}
                toggleSortingOptionsMobile={toggleSortingOptionsMobile}
                sortByPrice={sortByPrice}
                sortByBedrooms={sortByBedrooms}
                sortByBathrooms={sortByBathrooms}
                sortingOptionsVisible={sortingOptionsVisible}
                toggleView={toggleView}
                listViewIsActive={listViewIsActive}
                handleErrorMessage={handleErrorMessage}
                />

                <Properties 
                properties={properties}
                bookmarkPropertyListing={bookmarkPropertyListing}
                removePropertyListing={removePropertyListing}
                listViewIsActive={listViewIsActive}
                setPropertyIndex={setPropertyIndex}
                />
            </div>
        </section>

        <Bookmarks
        bookmarksBarIsShowing={bookmarksBarIsShowing}
        showBookmarksBar={showBookmarksBar}
        removeBookmark={removeBookmark}
        bookmarks={bookmarks}
        setPropertyIndex={setPropertyIndex}
        />

    {/if}

    <Alertmessage 
    alertMessageText={alertMessageText}
    closeAlertMessage={closeAlertMessage}
    propertyBookmark={propertyBookmark}
    />

    <Errormessage
    errorMessageText={errorMessageText}
    closeErrorMessage={closeErrorMessage}
    />

</body>

<style>

    body {
        display: flex;
        justify-content: flex-end;
        overflow-x: hidden;
        height: 100vh;
    }

    :global(body.dark) {
        overflow-x: hidden;
    }

    .sorting_and_filtering {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
    }

    .column_1 {
        width: 100%;
    }

    .column_2 {
        width: 81%;
    }

    @media screen and (max-width: 1000px) {

        .sorting_and_filtering {
            width: 100vw;
        }
        
        .column_1 {
            display: flex;
            width: 300px;
            opacity: 100%;
            transition: 0.2s;
        }

        .column_1.hidden {
            visibility: hidden;
            opacity: 0%;
            width: 0px;
            transition: 0.2s;
        }
    }

    @media screen and (max-width: 500px) {

        .column_1 {
            width: 100vw;
        }
    }

</style>