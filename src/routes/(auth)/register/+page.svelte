<script lang="ts">
	import sideImage from '$lib/assets/images/locations/nice.png';
	import logo from '$lib/assets/logo-transparent.png';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';

	import { registerUser } from '$lib/remotes/auth.remote';
</script>

<div class="flex min-h-screen">
	<div class="relative hidden p-2 lg:flex lg:w-1/2">
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

			{#if registerUser.result?.success === false}
				<p class="text-sm text-destructive">Registration failed</p>
			{/if}

			<div class="border-0 bg-transparent shadow-none">
				<form {...registerUser}>
					{#each registerUser.fields.issues() as issue}
						<p class="text-sm text-destructive">{issue.message}</p>
					{/each}
					<Field.Set>
						<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
							<Field.Field>
								<Field.Label for="firstName">First name</Field.Label>
								<Input
									{...registerUser.fields.firstName.as('text')}
									id="firstName"
									autocomplete="off"
									placeholder="Brad"
								/>
								<Field.Error errors={registerUser.fields.firstName.issues()} />
							</Field.Field>
							<Field.Field>
								<Field.Label for="lastName">Last name</Field.Label>
								<Input
									{...registerUser.fields.lastName.as('text')}
									id="lastName"
									autocomplete="off"
									placeholder="Meyn"
								/>
								<Field.Error />
							</Field.Field>
						</div>
						<Field.Field>
							<Field.Label for="email">Email</Field.Label>
							<Input
								{...registerUser.fields.email.as('email')}
								id="email"
								type="email"
								autocomplete="off"
								placeholder="brad@example.com"
							/>
							<Field.Error />
						</Field.Field>
						<Field.Field>
							<Field.Label for="password">Password</Field.Label>
							<Input
								{...registerUser.fields.password.as('password')}
								id="password"
								type="password"
								autocomplete="off"
								placeholder="••••••••"
							/>
							<Field.Error />
						</Field.Field>
						<Field.Field>
							<Field.Label for="confirmPassword">Confirm Password</Field.Label>
							<Input
								{...registerUser.fields.confirmPassword.as('password')}
								id="confirmPassword"
								type="password"
								autocomplete="off"
								placeholder="••••••••"
							/>
						</Field.Field>
					</Field.Set>
					<Button type="submit" class="mt-4 w-full">
						{#if registerUser.pending}
							Creating account...
						{:else}
							Create Account
						{/if}
					</Button>
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
