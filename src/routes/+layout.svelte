<script>
    import '@picocss/pico';
</script>

<header class="container">
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>
</header>

<main class="container">
    <slot></slot> <!-- Page content will be injected here -->
</main>

<footer class="container">
    <p>&copy; 2024 Bambfleilo Company</p>
</footer>
