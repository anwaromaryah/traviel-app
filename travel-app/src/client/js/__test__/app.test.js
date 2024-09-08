import { calculateTripLength } from "../app.js";

describe('calculateTripLength function', () => {
    it('should return the correct number of days between the start and end dates', () => {
        const startDate = '2024-08-28';
        const endDate = '2024-08-31';
        const expectedDuration = 2;

       // Run the function using the supplied dates
        const duration = calculateTripLength(startDate, endDate);

        //Confirm the duration output aligns with the expected value
        expect(duration).toBe(expectedDuration);
    });
});
