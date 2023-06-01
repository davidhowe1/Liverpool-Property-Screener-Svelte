<script>

    import IoMdClose from 'svelte-icons/io/IoMdClose.svelte'
    export let toggleNewListingForm;
    export let handleErrorMessage;

    let listingURL = ''
    let buttonContent = 'Create Listing'

    const handleUrlInput = (e) => { listingURL = e.target.value }
    
    const createNewListing = async (url) => {
        buttonContent = 'Creating Listing...'

        if (verifyNewListingLink()) {
            try {
                const response = await fetch(`${config.apiUrl}/createNewListing?url=${url}`, {
                    method: 'GET',
                    mode: 'cors',
                })

                if (response.ok) {
                    buttonContent = 'Listing Created!'
                    setTimeout(() => {
                        toggleNewListingForm()
                    }, 3000)
                }
                
            } catch (error) {
                console.error('There was a problem creating your listing: ', error)
            }
        }
    }

    const verifyNewListingLink = () => {
        if (!listingURL.length > 0) {
            handleErrorMessage('Error: Please add a URL to the input field.')
            return false
        }

        if (!listingURL.includes('https://www.rightmove.co.uk/properties')) {
            handleErrorMessage('Error: Please add a rightmove.co.uk link')
            return false
        }

        return true
    }

</script>

<section ction="submit" class="new_listing">
    <header>
        <h1>New Listing</h1>
        <div class="close" on:click={toggleNewListingForm}>
            <IoMdClose/>
        </div>
    </header>
    <label for="url">Paste a URL to add a property to the current list of properties</label>
    <input type="text" bind:value={listingURL} on:input={handleUrlInput}>
    <button on:click={createNewListing(listingURL)}>{buttonContent}</button>
</section>

<style>

    section.new_listing {
        display: flex;
        position: absolute;
        z-index: 2;
        flex-direction: column;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        padding: 50px;
        border-radius: 10px;
        background: white;
        border: 1px solid #c2c2c2;
        width: 400px;
        height: fit-content;
    }

    section.new_listing::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://fastly.picsum.photos/id/405/3000/1688.jpg?hmac=wihswILm48QrPF9GurD8QtSqMDtOY28jEWZPvlwderk');
        opacity: 10%;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    :global(body.dark) .new_listing::after {
        filter: brightness(10%);
        opacity: 50%;
    }
    
    h1 {
        font-size: 2rem;
        margin: 0px;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0px 0px 40px;
    }

    .close {
        height: 20px;
        width: 20px;
        padding: 5px;
        border-radius: 999px;
        cursor: pointer;
    }

    .close:hover {
        background: #2e353d;
        color: white;
    }

    input {
        border-radius: 999px;
    }

    label {
        font-size: 1.2rem;
        margin: 0px 0px 40px;
    }

    button {
        border-radius: 999px;
    }

    button:hover {
        background: #dfdfdf;
    }

    @media screen and (max-width: 500px) {
        section.new_listing {
            padding: 35px 25px;
            width: 80%;
            box-sizing: border-box;
        }

        h1 {
            font-size: 1.4rem;
        }

        label {
            font-size: 1rem;
        }
    }

    /* Dark Styles */

    :global(body.dark) section.new_listing {
        background: #2e353d;
        border: 1px solid #2e353d;
    }

    :global(body.dark) input {
        color: white;
        background: #111619;
        border: 1px solid #495767;
    }

    :global(body.dark) button {
        background: #131d24;
        border: 1px solid #495767;
        color: white;
    }

    :global(body.dark) button:hover {
        color: #111;
        background: #FF9B71;
        border: 1px solid #FF9B71;
        color: white;
    }

    :global(body.dark) .close:hover {
        background: #495767;
    }

</style>
