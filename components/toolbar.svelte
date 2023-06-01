
<script>
    import IoMdArrowRoundUp from 'svelte-icons/io/IoMdArrowRoundUp.svelte'
    import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte'
    import FaPoundSign from 'svelte-icons/fa/FaPoundSign.svelte'
    import FaBed from 'svelte-icons/fa/FaBed.svelte'
    import FaBath from 'svelte-icons/fa/FaBath.svelte'
    import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte'
    import IoIosOptions from 'svelte-icons/io/IoIosOptions.svelte'
    import Searchbar from './searchbar.svelte'
    import Newlisting from './newlisting.svelte'
    import FaPlus from 'svelte-icons/fa/FaPlus.svelte'

    export let sortByPriceDescending;
    export let sortByPriceAscending;
    export let sortByBedroomsAscending;
    export let sortByBedroomsDescending;
    export let sortByBathroomsAscending;
    export let sortByBathroomsDescending;
    export let filterBySearch;
    export let toggleSortingOptionsMobile;
    export let sortingOptionsVisible;
    export let toggleMobileMenu;
    export let resetSortingOptions;
    export let sortByPrice;
    export let sortByBedrooms;
    export let sortByBathrooms;
    export let toggleView;
    export let listViewIsActive;
    export let handleErrorMessage;

    let newListingFormVisible = false;
    const toggleNewListingForm = () => newListingFormVisible = !newListingFormVisible

</script>

<header>
    <div on:click={toggleMobileMenu} class="mobile_menu_toggle">
        <IoIosMenu/>
    </div>

    <div class="searchbar">
        <Searchbar filterBySearch={filterBySearch}/>
    </div>

    <button id="new_listing_mobile" on:click={toggleNewListingForm} class="rounded">
        <p>Add</p>
        <span>
            <FaPlus/>
        </span>
    </button>

    <button on:click={toggleSortingOptionsMobile} class="toggle_sort_options">
        <p>Sort</p>
        <span>
            <IoIosOptions/>
        </span>
    </button>

    <section class={sortingOptionsVisible ? "toolbar" : "toolbar hidden"}>
        <p>Sort</p>

        <span>
            <button on:click={sortByPriceDescending} 
            class={sortByPrice === true ? "rounded_left active" : "rounded_left"}>
                <FaPoundSign/>
                <IoMdArrowRoundUp/>
            </button>

            <button on:click={sortByPriceAscending} 
            class={sortByPrice === false ? "rounded_right active" : "rounded_right"}>
                <IoMdArrowRoundDown/>
            </button>
        </span>

        <span>
            <button on:click={sortByBedroomsDescending} 
            class={sortByBedrooms === true ? "rounded_left active" : "rounded_left"}>
                <FaBed/>
                <IoMdArrowRoundUp/>
            </button>

            <button on:click={sortByBedroomsAscending} 
            class={sortByBedrooms === false ? "rounded_right active" : "rounded_right"}>
                <IoMdArrowRoundDown/>
            </button>
        </span>

        <span>
            <button on:click={sortByBathroomsDescending} 
            class={sortByBathrooms === true ? "rounded_left active" : "rounded_left"}>
                <FaBath/>
                <IoMdArrowRoundUp/>
            </button>

            <button on:click={sortByBathroomsAscending} 
            class={sortByBathrooms === false ? "rounded_right active" : "rounded_right"}>
                <IoMdArrowRoundDown/>
            </button>
        </span>

        <button on:click={toggleView} class="rounded">
            {listViewIsActive ? 'Grid View' : 'List View'}
        </button>

        <button class="rounded" on:click={resetSortingOptions}>Reset All</button>
 
        <button id="new_listing" on:click={toggleNewListingForm} class="rounded">New Listing</button>
    </section>

    {#if newListingFormVisible}
        <Newlisting 
        toggleNewListingForm={toggleNewListingForm}
        handleErrorMessage={handleErrorMessage}
        />
    {/if}
</header>

<style>
    
    header {
        width: 100%;
        margin: 10px 0px;
    }

    .mobile_menu_toggle {
        display: none;
    }

    .searchbar {
        display: none;
    }

    .toggle_sort_options {
        display: none;
    }

    section.toolbar {
        display: flex;
        align-items: center;
        width: 80vw;
        padding: 12px;
    }

    span {
        display: flex;
        margin: 0px 10px;
    }

    span button.rounded_left {
        width: 75px;
        border-radius: 99px 0px 0px 99px;
    }

    span button.rounded_right {
        width: 50px;
        border-radius: 0px 99px 99px 0px;
        margin: 0px 0px 0px -1px;
    }

    button {
        padding: 10px 15px;
        cursor: pointer;
    }

    button#new_listing {
        border: 1px solid #333;
    }

    button#new_listing:hover {
        color: #111619;
        background-color: #fbaaaa;
        border: 1px solid #fbaaaa;
    }

    button#new_listing_mobile {
        display: none;
    }

    button p {
        margin: 0px;
    }

    button:hover {
        background-color: #e4e4e4;
    }

    button.rounded {
        height: 40px;
        width: fit-content;
        margin: 0px 10px;
        border-radius: 999px;
    }

    button.rounded_left, button.rounded_right {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 0px;
        height: 40px;
    }

    button.rounded_left.active, button.rounded_right.active {
        background-color: #222;
        color: white;
        border: 1px solid #222;
    }

    @media screen and (max-width: 1000px) {

        header {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 10px 20px;
            width: 100vw;
        }

        .mobile_menu_toggle {
            display: flex;
            height: 20px;
            width: 20px;
            padding: 12px;
            border-radius: 999px;
            border: 1px solid #ccc;
        }

        button#new_listing {
            display: none;
        }

        button#new_listing_mobile {
            display: flex;
            align-items: center;
            width: fit-content;
            height: fit-content;
            margin: 0px;
            background-color: transparent;
            padding: 12px 15px;
        }

        button#new_listing_mobile span {
            height: 10px;
            width: 10px;
            margin: 0px 0px 0px 10px;
        }

        :global(body.dark) button#new_listing_mobile:hover {
            background-color: #111619;
            border: 1px solid #2e353d;
        }

        :global(body.dark) .toggle_sort_options:hover {
            background-color: #111619;
            border: 1px solid #2e353d;
        }

        section.toolbar {
            display: flex;
            flex-wrap: wrap;
            position: absolute;
            z-index: 2;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
            border-radius: 15px;
            width: fit-content;
            top: 80px;
            right: 20px;
            margin: 0px auto;
            padding: 10px;
        }

        :global(body.dark) .toolbar {
            background-color: #2e353d;
        }

        section.toolbar p {
            display: none;
        }

        section.toolbar.hidden {
            display: none;
        }

        .searchbar {
            display: flex;
            box-sizing: border-box;
            width: 65%;
        }

        .toggle_sort_options {
            display: flex;
            align-items: center;
            border-radius: 999px;
            margin: 0px;
            background-color: transparent;
        }

        .toggle_sort_options span {
            height: 15px;
            width: 15px;
            margin: 0px 0px 0px 10px;
        }

        span {
            margin: 8px;
        }
    }

    @media screen and (max-width: 500px) {

        header {
            padding: 10px 20px;
        }

        .searchbar {
            margin: 0px;
        }

        button p {
            display: none;
        }

        button#new_listing_mobile {
            padding: 12px;
        }

        button#new_listing_mobile span {
            height: 12px;
            width: 12px;
            margin: 0px;
        }
        
        .toggle_sort_options {
            width: 38px;
            height: 38px;
            padding: 10px;
        }

        .toggle_sort_options span {
            margin: 0px;
            height: 38px;
            width: 38px;
        }

        .mobile_menu_toggle {
            padding: 8px;
        }

        section.toolbar {
            width: 35%;
            top: 75px;
            right: 16px;
        }

        button.rounded {
            margin: 10px 10px;
            width: 100%;
            box-sizing: border-box;
        }
    }

    /* Dark Styles */

    :global(body.dark) button#new_listing {
        color: #FF9B71;
        border: 1px solid #FF9B71;
    }

    :global(body.dark) button#new_listing:hover {
        color: white;
        background-color: #FF9B71;
    }

    :global(body.dark) button {
        background-color: #111619;
        border: 1px solid #111619;
        color: white;
    }

    :global(body.dark) button:hover {
        background-color: #FF9B71;
        border: 1px solid #FF9B71;
        color: white;
    }

    :global(body.dark) button.rounded_left.active, :global(body.dark) button.rounded_right.active {
        background-color: #FF9B71;
        border: 1px solid #FF9B71;
        color: white;
    }
        
    :global(body.dark) .mobile_menu_toggle, :global(body.dark) button#new_listing_mobile {
        border: 1px solid #2e353d;
    }

    :global(body.dark) .toggle_sort_options {
        background: #090c0d;
        border: 1px solid #2e353d;
    }

</style>