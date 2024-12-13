<link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'>
<style>
body {
    font-family: 'DM Sans';
}

.content-container {
    position: relative;
    min-height: 150px;  /* Changed to min-height */
    width: 100%;
}
</style>

<script lang="ts">
	import { fade } from 'svelte/transition';
	let channelName = "";
	let showInput = true;
	let currentQuestionIndex = 0;
	let isTransitioning = false;
	let isVisible = true;

	// Add a new state variable for the main transition
	let mainVisible = true;

	const questionsTemplate = [
	// Standard questions
	`Hey {channelName}! What motivated you to start your channel?`,
	`What do you hope to achieve with your channel?`,
	`Where do you see your channel in five years?`,
	`Why do you want to be a YouTuber?`,
	`What kind of equipment do you use to shoot your videos?`,
	`What advice would you give to someone starting a new YouTube channel?`,
	
	// Funny and casual greetings
	`Yo {channelName}, if you could only eat one food for the rest of your life, what would it be?`,
	`What’s up {channelName}? If you could collab with any Youtuber, who would it be?`,
	`Hey {channelName}, if you could swap lives with any YouTuber for a day, who would it be and why?`,
	
	// General questions (no channel name)
	`What's your go-to strategy for staying motivated on tough days?`,
	`What's your favorite hobby?`,
	
	// Fun and light-hearted
	`What's your dream vacation destination?`,
	`Do you believe in aliens?`,

	// Questions about the YouTuber
	`Hey {channelName}, do you have any pets?`,
	`{channelName}, if you could live anywhere in the world, where would it be?`,
	`What's your favorite food?`,
	`What's your favorite emoji?`,
	`If you could master any skill instantly, what would it be?`,
	`{channelName}, what's your hidden talent?`,
	`What would your superpower be if you could choose one?`,
	`Hey {channelName}, what's your favorite video game?`,
	`If you could have dinner with anyone, living or dead, who would it be?`,
	`{channelName}, are you a dog person or a cat person?`,
	`What's your favorite memory from school?`,
	`If you could instantly learn any language, which would you choose?`,
	`{channelName}, what's your favorite holiday and why?`,
	`Hey {channelName}, what do you think about the current socioecomic state of the world?`,
	'Hello {channelName}, is Roblox better than Minecraft?',
	'Hi {channelName}! I am your biggest fan! What is the funniest noise you can make?',
];


	// Mapping usernames to specific images and profile links
	const userProfiles = [
		{
			username: "JohnTheCrayonGuy",
			image: "/images/Kai.png",
		},
		{
			username: "EvilCaz123",
			image: "/images/evilcaz.png",
		},
		{
			username: "The_Real_Fish_King",
			image: "/images/Win.png",
		},
		{
			username: "JeremyDaLegend",
			image: "/images/Jeremy.png",
		},
		{
			username: "Robbie_Creator_Camp",
			image: "/images/rob.png",
		},
		{
			username: "Jacky_Creator_Camp",
			image: "/images/Jack.png",
		},
		{
			username: "Agent_336",
			image: "/images/336.png",
		}
	];

	// Placeholder random posted dates and thumbs up/down count
	const postedDates = ["1 day ago", "3 days ago", "1 week ago", "2 weeks ago", "1 month ago"];

	// Randomize the username, date, thumbs up/down count
	let randomProfile = userProfiles[Math.floor(Math.random() * userProfiles.length)];
	let randomPostedDate = postedDates[Math.floor(Math.random() * postedDates.length)];
	let randomThumbsUp = Math.floor(Math.random() * 99) + 1;
	let randomThumbsDown = Math.floor(Math.random() * randomThumbsUp);

	// Reactive statement to dynamically update the question when `currentQuestionIndex` or `channelName` changes
	$: currentQuestion = questionsTemplate[currentQuestionIndex].replace(
		"{channelName}",
		channelName || "Your Channel"
	);

	// Function to move to the next step (show questions)
	async function nextStep() {
		if (channelName.trim() !== "") {
			mainVisible = false;  // Start fade out
			await new Promise(resolve => setTimeout(resolve, 300)); // Wait for fade out
			showInput = false; // Switch content while invisible
			mainVisible = true;  // Start fade in
		} else {
			alert("Please enter a channel name.");
		}
	}

	// Function to show the next question and randomize the profile and other values again
	async function nextQuestion() {
		isTransitioning = true;
		isVisible = false;  // Start fade out
		await new Promise(resolve => setTimeout(resolve, 300)); // Wait for fade out
		
		// Update all the content while invisible
		currentQuestionIndex = Math.floor(Math.random() * questionsTemplate.length); // Random question
		randomProfile = userProfiles[Math.floor(Math.random() * userProfiles.length)];
		randomPostedDate = postedDates[Math.floor(Math.random() * postedDates.length)];
		randomThumbsUp = Math.floor(Math.random() * 99) + 1;
		randomThumbsDown = Math.floor(Math.random() * randomThumbsUp/2);
		
		isVisible = true;  // Start fade in
		isTransitioning = false;
	}
</script>

<body class="bg-black">
	<div class="absolute w-full h-screen flex items-center justify-center px-6">
		<div class="grid gap-8 items-start justify-center ">
			<div class="relative group">
				<div
					class="absolute -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-100"
				></div>
				<div class="relative px-4 py-4 sm:px-10 sm:py-10 bg-neutral-950 rounded-lg leading-none flex items-center divide-x divide-gray-600 max-w-[446px] min-h-[500px]">
					<div class="flex w-full items-center flex-col gap-5">
						<h1 class="text-center text-2xl text-gray-100 text-wrap">
							YouTube Q & A Comment Generator
						</h1>
						<div class="w-full">
							<div class="py-5 w-full grow flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
								<img class="w-[25px]" src="/images/logoIcon.png" alt="">
							</div>
						</div>

						<div class="content-container">
							<div 
								class:opacity-0={!mainVisible}
								class:opacity-100={mainVisible}
								class="transition-opacity duration-300"
							>
								{#if showInput}
									<div class="GenComments mb-4 w-full">
										<label class="block text-white text-sm font-300 mb-2" for="username">
											Channel Name
										</label>
										<input class="shadow appearance-none border w-full rounded-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
										id="username"
										type="text"
										bind:value={channelName}
										placeholder="MrBeast..."
										>
									</div>
									<div class="w-full flex justify-center">
										<button
											on:click={nextStep}
											class="px-6 mt-8 py-4 border-4 font-bold border-CC-red bg-white text-CC-red rounded-full hover:bg-white transition-colors duration-300"
											>
											GENERATE COMMENTS
										</button>
									</div>
								{:else}
									<div class="comment text-white w-full max-w-lg">
										<div 
											class:opacity-0={!isVisible}
											class:opacity-100={isVisible}
											class="transition-opacity duration-300"
										>
											<div class="min-h-[170px] flex flex-row bg-neutral-800 w-full p-4 rounded-md align-middle justify-center my-auto">
												<!-- Wrap the avatar and username in the same link -->
													<img class="rounded-full h-[50px] w-[50px] mr-5 my-auto" src={randomProfile.image} alt="avatar">
												<div class="flex flex-col gap-1 my-auto">
													<div class="flex flex-row flex-wrap gap-2 justify-between">
														<div class="mr-2">
															<p class="text-xs sm:text:base">@{randomProfile.username}</p>
														</div>
														<div class="">
															<p class="text-xs sm:text:base">{randomPostedDate}</p>
														</div>
													</div>
													<div class="flex flex-row mt-2 sm:mt-2">
														<p class="leading-relaxed text-sm sm:text-base">{currentQuestion}</p>
													</div>
													<div class="flex flex-row mt-3">
														<div class="mr-2 text-sm sm:text-base flex items-center">
															<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="16" height="16">
																<path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
															</svg>
														</div>
														<div class="mr-3 text-sm text-gray-300">{randomThumbsUp}</div>
														<div class="mr-2 text-sm sm:text-base flex items-center">
															<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="16" height="16" style="transform: rotate(180deg);">
																<path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
															</svg>
														</div>
														<div class="text-sm text-gray-300">{randomThumbsDown}</div>
													</div>
												</div>
											</div>
										</div>
										<div class="mt-8 flex justify-center">
											<button
												on:click={nextQuestion}
												disabled={isTransitioning}
												class="px-6 py-4 border-4 font-bold border-CC-red bg-white text-CC-red rounded-full hover:bg-white transition-colors duration-300 disabled:opacity-50"
											>
												Next question
											</button>
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
