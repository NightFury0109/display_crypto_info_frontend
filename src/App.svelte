<script>
	import {
		getFirstUrlData,
		getSecondUrlData,
		getThirdUrlData,
	} from "./apis/calls";
	import { firstUrlData, secondUrlData, thirdUrlData, error } from "./store";
	import isEmpty from "./utils/is-empty";

	let cryptoData = {
		name: "btc",
		date: "",
	};

	let firstData;
	let secondData;
	let thirdData;

	let errorText;

	firstUrlData.subscribe((v) => {
		firstData = v;
	});

	secondUrlData.subscribe((v) => {
		secondData = v;
	});

	thirdUrlData.subscribe((v) => {
		thirdData = v;
	});

	error.subscribe((err) => {
		errorText = err;
	});

	const selectName = async (e) => {
		firstUrlData.set({});
		secondUrlData.set({});
		thirdUrlData.set({});

		cryptoData.name = e.target.value;

		if (cryptoData.date !== "") {
			await getFirstUrlData(cryptoData.name, cryptoData.date);
			await getSecondUrlData(cryptoData.name);
			await getThirdUrlData(cryptoData.name);
		}
	};

	const selectDate = async () => {
		firstUrlData.set({});
		secondUrlData.set({});
		thirdUrlData.set({});

		let today = new Date().getTime();
		let selectedDate = new Date(cryptoData.date).getTime();

		if (selectedDate <= today) {
			error.set("");
			await getFirstUrlData(cryptoData.name, cryptoData.date);
			await getSecondUrlData(cryptoData.name);
			await getThirdUrlData(cryptoData.name);
		} else {
			error.set("Pick up the date before today");
			firstUrlData.set({});
			secondUrlData.set({});
			thirdUrlData.set({});
		}
	};
</script>

<main>
	<div class="app">
		<h1>Hi, welcome here</h1>
		<p>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			Lorem Ipsum has been the industry's standard dummy text ever since the
			1500s, when an unknown printer took a galley of type and scrambled it to
			make a type specimen book.
		</p>

		<form class="mt-4">
			<select
				class="form-select"
				aria-label="Cryptocurrency name"
				on:change={selectName}
			>
				<option value="btc">Bitcoin</option>
				<option value="eth">Ethereum</option>
				<option value="avax">Avalanche</option>
				<option value="bnb">Binance-coin</option>
				<option value="sol">Solana</option>
				<option value="ltc">Litecoin</option>
				<option value="ada">Cardano</option>
				<option value="trx">Tron</option>
				<option value="doge">Dogecoin</option>
				<option value="matic">Polygon</option>
			</select>

			<input type="date" bind:value={cryptoData.date} on:change={selectDate} />
		</form>

		{#if !isEmpty(errorText)}
			<p class="mt-3" style="color: red;">{errorText}</p>
		{/if}

		<!-- Display first data -->
		<div class="mt-4">
			<h4>From 1st URL</h4>
			<div>
				<span class="font-weight-bold">Name: </span>
				{#if !isEmpty(firstData)}
					<span>{firstData.name}</span>
				{/if}
			</div>
			<div>
				<span class="font-weight-bold">Symbol: </span>
				{#if !isEmpty(firstData)}
					<span>{firstData.symbol}</span>
				{/if}
			</div>
			<div>
				<span class="font-weight-bold">Date: </span>
				{#if !isEmpty(firstData)}
					<span>{firstData.date}</span>
				{/if}
			</div>
			<div>
				<span class="font-weight-bold">20 Moving Average: </span>
				{#if !isEmpty(firstData)}
					<span>{firstData.movingAverage}</span>
				{/if}
			</div>
		</div>

		<!-- Display second data -->
		<div class="mt-4">
			<h4>From 2nd URL</h4>
			<div>
				<span class="font-weight-bold">50 Moving Average: </span>
				{#if !isEmpty(secondData)}
					<span>{secondData.movingAverage}</span>
				{/if}
			</div>
			<div>
				<span class="font-weight-bold">Stock: </span>
				{#if !isEmpty(secondData)}
					<span>{secondData.stock}</span>
				{/if}
			</div>
		</div>

		<!-- Display third data -->
		<div class="mt-4">
			<h4>From 3rd URL</h4>
			<div>
				<span class="font-weight-bold">Buy Conditions: </span>
				{#if !isEmpty(thirdData)}
					{#if thirdData.decision === "sell"}
						{#each thirdData.buyConditions as buyCondition}
							{#if buyCondition.Success === false}
								<div class="row">
									<div class="col-6">
										<span class="font-weight-bold">Description: </span>
										<span>{buyCondition.Description}</span>
									</div>
									<div class="col-6">
										<span class="font-weight-bold">Success: </span>
										<span>{buyCondition.Success}</span>
									</div>
								</div>
							{/if}
						{/each}
					{/if}
					{#if thirdData.decision === "buy"}
						{#each thirdData.buyConditions as condition}
							{#if condition.Success === true}
								<div class="row">
									<div class="col-6">
										<span class="font-weight-bold">Description: </span>
										<span>{condition.Description}</span>
									</div>
									<div class="col-6">
										<span class="font-weight-bold">Success: </span>
										<span>{condition.Success}</span>
									</div>
								</div>
							{/if}
						{/each}
					{/if}
				{/if}
			</div>
			<div>
				<span class="font-weight-bold">Decision: </span>
				{#if !isEmpty(thirdData)}
					<span>{thirdData.decision}</span>
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	.app {
		padding: 1rem 1.5rem;
	}
</style>
