import { useEffect, useRef, useState } from "react";

const Countdown = () => {
    const targetDateRef = useRef(Date.now() + 2 * 24 * 60 * 60 * 1000);

    const [timeLeft, setTimeLeft] = useState(
        targetDateRef.current - Date.now()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = targetDateRef.current - Date.now();

            setTimeLeft(diff > 0 ? diff : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => String(time).padStart(2, "0");

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <div className="flex font-semibold md:justify-center text-green-900 opacity-80 text-4xl">

            <div className="flex flex-col items-center ">
                <span>{formatTime(days)}</span>
            </div>

            <span>:</span>

            <div className="flex flex-col items-center w-16">
                <span>{formatTime(hours)}</span>
            </div>

            <span>:</span>

            <div className="flex flex-col items-center w-16">
                <span>{formatTime(minutes)}</span>
            </div>

            <span>:</span>

            <div className="flex flex-col items-center w-16">
                <span>{formatTime(seconds)}</span>
            </div>

        </div>
    );
};

export default Countdown;