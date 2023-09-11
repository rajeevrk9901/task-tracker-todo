import { useState } from 'react';

export function useTimingMeasurement() {
    const [isLoading, setLoading] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimingExceeded, setIsTimingExceeded] = useState(false);
    const [error, setError] = useState(null); // Initialize error state as null
    // console.log(error)
    const measureTiming = async (task, duration = 2000) => { // Change default duration to 2000
        setLoading(true);
        const startTime = new Date().getTime();
        try {
            await task();
        } catch (err) {
            setError(err); // Set the error state with the caught error
            console.error(err);
        } finally {
            const endTime = new Date().getTime();
            const elapsedTimeMilliseconds = endTime - startTime;

            setLoading(false);

            const exceeded = elapsedTimeMilliseconds >= duration;
            setIsTimingExceeded(exceeded);

            if (exceeded) {
                console.log("You need to wait more. Elapsed time:", elapsedTimeMilliseconds / 1000, "seconds");
            }
            setElapsedTime(elapsedTimeMilliseconds);
        }
    };

    return { isLoading, elapsedTime, isTimingExceeded, measureTiming, error };
}