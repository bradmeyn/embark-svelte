<script lang="ts">
	import sideImage from '$lib/assets/images/locations/nice.png';
	import logo from '$lib/assets/logo-transparent.png';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
</script>

<div class="flex min-h-screen">
	<div class="relative hidden p-4 lg:flex lg:w-1/2">
		<div class="relative h-full w-full overflow-hidden rounded-2xl">
			<img src={sideImage} alt="Travel destination" class="h-full w-full object-cover" />
		</div>
	</div>

	<div class="flex flex-1 items-center justify-center">
		<div class="w-full max-w-md space-y-2">
			<div class="flex items-center justify-center">
				<img src={logo} alt="Embark Logo" class="size-20" />
				<p class=" font-serif text-3xl text-orange-800">Embark</p>
			</div>

			<div class="space-y-2 text-center">
				<h1 class="text-xl font-bold text-gray-900">Start your journey</h1>
				<p class="text-muted-foreground">Create your account to begin planning amazing trips</p>
			</div>

			<div class="border-0 bg-transparent shadow-none">
				<form action="">
					<Field.Set>
						<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
							<Field.Field>
								<Field.Label for="firstName">First name</Field.Label>
								<Input id="firstName" autocomplete="off" placeholder="Brad" />
								<Field.Error />
							</Field.Field>
							<Field.Field>
								<Field.Label for="lastName">Last name</Field.Label>
								<Input id="lastName" autocomplete="off" placeholder="Meyn" />
								<Field.Error />
							</Field.Field>
						</div>
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
						<Field.Field>
							<Field.Label for="confirmPassword">Confirm Password</Field.Label>
							<Input
								id="confirmPassword"
								type="password"
								autocomplete="off"
								placeholder="••••••••"
							/>
						</Field.Field>
					</Field.Set>
					<Button type="submit" class="mt-4 w-full">Create Account</Button>
				</form>
			</div>

			<div class="text-center">
				<div class="text-sm text-muted-foreground">
					Already have an account?{' '}
					<a href="/login" class="font-medium text-primary hover:underline"> Sign in </a>
				</div>
			</div>
		</div>
	</div>
</div>
