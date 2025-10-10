<script lang="ts">
	import logo from '$lib/assets/logo-transparent.png';
</script>

<header class="container mx-auto flex items-center justify-between p-4">
	<div class="flex items-center justify-center">
		<img src={logo} alt="Embark Logo" class="size-16" />
		<p class=" font-serif text-xl text-orange-800">Embark</p>
	</div>
	<nav class="flex items-center space-x-6">
		<a href="/login" class="rounded px-3 py-1 text-sm">Log In</a>
		<a href="/register" class="rounded px-3 py-1 text-sm">Sign Up</a>
	</nav>
</header>
