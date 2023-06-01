
<script>
    import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
    import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte'

    export let username;
    export let password;
    export let loginButtonContent;
    export let setUsername;
    export let setPassword;
    export let loginUser;
    export let toggleTheme;
    export let theme;
</script>

<section class="login_container">
    <button class="toggle_theme" on:click={toggleTheme}>
        {#if theme === 'light'}
            <div>
                <IoIosMoon/>
            </div>

            Theme
        {:else}
            <div>
                <IoMdSunny/>
            </div>

            Theme
        {/if}
    </button>

    <section class="login_screen">
        <h1 class="title">Welcome to the Property Screener</h1>

        <label for="username">Username:</label>
        <input type="text" bind:value={username} on:input={setUsername} placeholder="Your username">
        
        <label for="Password">Password:</label>
        <input type="password" bind:value={password} on:input={setPassword} placeholder="Your password">

        <button id="login" on:click={loginUser}>{loginButtonContent}</button>
    </section>
</section>

<style>

    section.login_container {
        display: flex;
    }

    section.login_container::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://fastly.picsum.photos/id/951/4472/2803.jpg?hmac=aB6s0hBjWu_NcE75bGn9qnZTRcWSPCdo_qEGo6dzh7k');
        opacity: 80%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    section.login_screen {
        display: flex;
        width: 300px;
        height: fit-content;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto auto auto 10%;
        z-index: 3;
        padding: 30px;
        background-color: white;
        border-radius: 15px;
        border: 1px solid #c2c2c2;
    }

    button.toggle_theme {
        display: flex;
        align-items: center;
        height: fit-content;
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 10px 14px;
    }

    button.toggle_theme div {
        height: 20px;
        width: 20px;
        margin: 0px 10px 0px 0px;
    }

    h1.title {
        font-size: 2.4rem;
        margin: 0px 0px 20px;
        font-weight: 400;
        padding-bottom: 30px;
        border-bottom: 1px solid #e4e4e4;
    }

    label {
        margin: 10px 0px;
    }

    button {
        margin: 10px 0px 0px;
        border-radius: 99px;
    }

    button:hover {
        background-color: #e4e4e4;
    }

    button#login {
        margin: 10px 0px 0px;
        border-radius: 99px;
        background-color: #fbaaaa;
        border: 1px solid #fbaaaa;
        color: white;
    }

    button#login:hover {
        border: 1px solid #e48f8f;
        background-color: #e48f8f;
    }
    
    input {
        color: #333;
        border-radius: 99px;
    }

    @media screen and (max-width: 1000px) {
        section.login_screen {
            position: fixed;
            width: 300px;
            margin: auto auto auto 15%;
        }

        section.login_container::after {
            height: 100vh;
        }
    }

    @media screen and (max-width: 500px) {
        section.login_container {
            display: flex;
        }
        
        section.login_screen {
            width: 80%;
            height: fit-content;
            padding: 15px;
            box-sizing: border-box;
            margin: auto auto auto auto;
        }

        h1.title {
            font-size: 2rem;
        }

        button.toggle_theme {
            position: fixed;
            padding: 3px 8px;
            font-size: 0.8rem;
        }

        button.toggle_theme div {
            height: 16px;
            width: 16px;
            margin: 0px 5px 0px 0px;
        }
    }

    /* Dark Styles */

    :global(body.dark) section.login_container::after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://fastly.picsum.photos/id/1078/3000/2000.jpg?hmac=kI-4ittyvRAG5-z9urHPPBQ4kDNJ4ItiEw6-NagOy10');
        opacity: 60%;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    :global(body.dark) button.toggle_theme {
        z-index: 2;
    }

    :global(body.dark) label {
        color: #333;
    }

    :global(body.dark) h1.title {
        color: #333;
    }

</style>