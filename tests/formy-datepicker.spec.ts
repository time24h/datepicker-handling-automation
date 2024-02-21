import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/datepicker');
});

test.skip('Handle date pickers - formy project', async ({ page }) => {
	const calendarInput = page.locator('#datepicker');

	let today = new Date();
	today.setDate(today.getDate() + 9);
	const expectedDate = today.getDate().toString();
	const expectedDateShort = today.toLocaleString('en-US', { day: '2-digit' });
	const expectedMonthShort = today.toLocaleString('en-US', { month: '2-digit' });
	const expectedMonthComplete = today.toLocaleString('en-US', { month: 'long' });
	const expectedYear = today.getFullYear();

	const dateAssertion = `${expectedMonthShort}/${expectedDateShort}/${expectedYear}`;

	// console.log(dateAssertion); // dd/mm/yy

	await calendarInput.click();

	let monthAndYear = await page.locator('.datepicker-days [class="datepicker-switch"]').textContent(); // e.g February 2024
	const expectedMonthAndYear = `${expectedMonthComplete} ${expectedYear}`;

	// if this not month, please click next month and looping until calendar is found
	while (!monthAndYear?.includes(expectedMonthAndYear)) {
		// next calendar
		await page.locator('.datepicker-days .next').click();
		monthAndYear = await page.locator('.datepicker-days [class="datepicker-switch"]').textContent();
		console.log(monthAndYear); // e.g March 2024
	}

	await page.locator('.datepicker-days [class="day"]').getByText(expectedDate, { exact: true }).click();
	await expect(calendarInput).toHaveValue(dateAssertion);
	console.log(`your date is ${dateAssertion} ✅`); //  03/01/2024 cause 21 Feb + 9 = 01 march 2024

	await page.pause();
});

test('Handle date pickers - formy project 2000-days', async ({ page }) => {
	const calendarInput = page.locator('#datepicker');

	let today = new Date();
	today.setDate(today.getDate() + 2000);
	const expectedDate = today.getDate().toString();
	const expectedDateShort = today.toLocaleString('en-US', { day: '2-digit' });
	const expectedMonthShort = today.toLocaleString('en-US', { month: '2-digit' });
	const expectedMonthComplete = today.toLocaleString('en-US', { month: 'long' });
	const expectedYear = today.getFullYear();

	const dateAssertion = `${expectedMonthShort}/${expectedDateShort}/${expectedYear}`;

	// console.log(dateAssertion); // dd/mm/yy

	await calendarInput.click();

	let monthAndYear = await page.locator('.datepicker-days [class="datepicker-switch"]').textContent(); // e.g February 2024
	const expectedMonthAndYear = `${expectedMonthComplete} ${expectedYear}`;

	// if this not month, please click next month and looping until calendar is found
	while (!monthAndYear?.includes(expectedMonthAndYear)) {
		// next calendar
		await page.locator('.datepicker-days .next').click();
		monthAndYear = await page.locator('.datepicker-days [class="datepicker-switch"]').textContent();
		console.log(monthAndYear); // e.g March 2024
	}

	await page.locator('.datepicker-days [class="day"]').getByText(expectedDate, { exact: true }).click();
	await expect(calendarInput).toHaveValue(dateAssertion);
	console.log(`your date is ${dateAssertion} ✅`); //  03/01/2024 cause 21 Feb + 9 = 01 march 2024

	await page.pause();
});
