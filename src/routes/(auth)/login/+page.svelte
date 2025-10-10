<script lang="ts">
	import sideImage from '$lib/assets/images/locations/nice.png';
	import logo from '$lib/assets/logo-transparent.png';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
</script>

<div class="flex min-h-screen">
	<div class="flex flex-1 items-center justify-center">
		<div class="w-full max-w-md space-y-2">
			<div class="flex items-center justify-center">
				<img src={logo} alt="Embark Logo" class="size-20" />
				<p class=" font-serif text-3xl text-orange-800">Embark</p>
			</div>

			<div class="space-y-2 text-center">
				<h1 class="text-xl font-bold text-gray-900">Welcome back</h1>
				<p class="text-muted-foreground">
					Log in to your account to continue planning amazing trips
				</p>
			</div>

			<div class="border-0 bg-transparent shadow-none">
				<form action="">
					<Field.Set>
						<Field.Field>
							<Field.Label for="email">Email</Field.Label>
							<Input id="email" type="email" autocomplete="off" placeholder="brad@example.com" />
							<Field.Error />
						</Field.Field>
						<Field.Field>
							<Field.Label for="password">Password</Field.Label>
							<Input id="password" type="password" autocomplete="off" placeholder="••••••••" />
							<Field.Error />
						</Field.Field>
					</Field.Set>
					<Button type="submit" class="mt-4 w-full">Create Account</Button>
				</form>
			</div>

			<div class="text-center">
				<div class="text-sm text-muted-foreground">
					Don't have an account?{' '}
					<a href="/register" class="font-medium text-primary hover:underline"> Sign up </a>
				</div>
			</div>
		</div>
	</div>
</div>
