<script context="module">
    export const load = ({ fetch }) => {
        const form = {
            url: '',
            shortUrl: ''
        };
        return { form };
    };
</script>

<script>
    let url = '';
    let shortUrl = '';
    let errorMessage = '';
    let loading = false;
    let success = false;

    // Simple URL validation regex
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    async function handleSubmit() {
        errorMessage = '';
        success = false;
        loading = true;

        if (!isValidUrl(url)) {
            errorMessage = 'Invalid URL';
            loading = false;
            return;
        }

        // Fake fetch request - replace with actual backend logic
        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                body: JSON.stringify({ url, shortUrl }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                success = true;
            } else {
                const data = await response.json();
                errorMessage = data.message || 'Something went wrong';
            }
        } catch (error) {
            errorMessage = 'Server error';
        }

        loading = false;
    }
</script>

<!-- Form UI -->
<form on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="url">URL:</label>
        <input type="url" id="url" bind:value={url} placeholder="https://example.com" required class:invalid={!isValidUrl(url) && url.length > 0} />
        {#if errorMessage}
            <small class="error">{errorMessage}</small>
        {/if}
    </div>

    <div>
        <label for="shortUrl">Short URL:</label>
        <input type="text" id="shortUrl" bind:value={shortUrl} placeholder="my-short-url" required />
    </div>

    <div>
        <button type="submit" disabled={loading}>
            {#if loading}
                <span>Loading...</span> <!-- Add spinner here if needed -->
            {:else}
                Submit
            {/if}
        </button>
    </div>

    {#if success}
        <div>
            <a href="/{shortUrl}/stats">View Stats</a>
        </div>
    {/if}
</form>
