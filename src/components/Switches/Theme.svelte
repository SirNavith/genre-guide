<script>
	const states: ["light", "dark"] = ["light", "dark"];
	const [firstState, lastState] = states;

	export let state: "light" | "dark" | undefined;
	export let disabled: boolean | undefined;

	const toggle = () => {
		state = state === firstState ? lastState : firstState;
	};
</script>

<!--
		genre.guide - Theme switch Svelte component
		Copyright (C) 2020 Navith

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU Affero General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU Affero General Public License for more details.

		You should have received a copy of the GNU Affero General Public License
		along with this program. If not, see <https://www.gnu.org/licenses/>.
-->
<button
	class="relative w-10 h-5 ml-2 rounded-full"
	on:click={toggle}
	title={state}
	aria-pressed={state === states[states.length - 1]}
	{disabled}>

	{#each states as outer}
		<div
			class="rounded-full w-10 h-5 transition-opacity absolute inset-0 {state == outer ? 'opacity-100' : 'opacity-0'}
			{disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
			{outer === lastState ? 'bg-gradient-t-night' : 'bg-gradient-t-day'}">

			{#each states as inner}
				<div
					class="block w-3 h-3 ml-1 mt-1 rounded-full absolute inset-0 left-0
					top-0 transition-all {inner === lastState ? 'bg-radial-moon' : 'bg-radial-sun'}
					{state === lastState ? 'ml-6' : 'mr-6'}
					{state === inner ? 'opacity-100' : 'opacity-0'}" />
			{/each}

			<!-- Need an empty div that the inner part of the button can have a right margin against -->
			<div />
		</div>
	{/each}
</button>
