/**
 * Formats daily stock data to only include date and price
 * Returns an array of daily data with format: {date, price}
 */
export function getDailyStockPrices(dailyData) {
    if (!dailyData || dailyData.length === 0) {
        return [];
    }

    return dailyData.map(item => ({
        date: item.date,
        price: item.price
    }));
}

/**
 * Aggregates daily stock data into weekly averages
 * Returns an array of weekly aggregated data with format: {date, price}
 */
export function getWeeklyStockPrices(dailyData) {
    if (!dailyData || dailyData.length === 0) {
        return [];
    }

    const weeklyGroups = {};

    dailyData.forEach(item => {
        const date = new Date(item.date);

        // Get the start of the week (Monday)
        const weekStart = new Date(date);
        const dayOfWeek = date.getDay();
        const daysFromMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
        weekStart.setDate(date.getDate() - daysFromMonday);
        const weekKey = weekStart.toISOString().split('T')[0];

        if (!weeklyGroups[weekKey]) {
            weeklyGroups[weekKey] = {
                prices: [],
                dates: []
            };
        }

        weeklyGroups[weekKey].prices.push(item.price);
        weeklyGroups[weekKey].dates.push(item.date);
    });

    // Calculate weekly averages
    const weeklyData = Object.keys(weeklyGroups).map(weekKey => {
        const group = weeklyGroups[weekKey];
        const avgPrice = group.prices.reduce((sum, price) => sum + price, 0) / group.prices.length;

        return {
            date: weekKey,
            price: parseFloat(avgPrice.toFixed(2))
        };
    });

    // Sort by date descending (newest first, matching API format)
    return weeklyData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Aggregates daily stock data into monthly averages
 * Returns an array of monthly aggregated data with format: {date, price}
 */
export function getMonthlyStockPrices(dailyData) {
    if (!dailyData || dailyData.length === 0) {
        return [];
    }

    const monthlyGroups = {};

    dailyData.forEach(item => {
        const date = new Date(item.date);

        // Get year-month as key (YYYY-MM)
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        // Use first day of month as the date
        const monthKey = `${yearMonth}-01`;

        if (!monthlyGroups[monthKey]) {
            monthlyGroups[monthKey] = {
                prices: [],
                dates: []
            };
        }

        monthlyGroups[monthKey].prices.push(item.price);
        monthlyGroups[monthKey].dates.push(item.date);
    });

    // Calculate monthly averages
    const monthlyData = Object.keys(monthlyGroups).map(monthKey => {
        const group = monthlyGroups[monthKey];
        const avgPrice = group.prices.reduce((sum, price) => sum + price, 0) / group.prices.length;

        return {
            date: monthKey,
            price: parseFloat(avgPrice.toFixed(2))
        };
    });

    return monthlyData.sort((a, b) => new Date(b.date) - new Date(a.date));
}