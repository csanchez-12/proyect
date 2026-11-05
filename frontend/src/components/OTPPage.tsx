import { useEffect, useRef, useState } from "react";

interface Props {
    onClose?: () => void;
    onContinue?: () => void;
    onResend?: () => void;
    identification: string;
    otp: string;
    setOtp: (value: string) => void;
}

export default function OTPPage({
    onContinue,
    onResend,
    identification,
    otp,
    setOtp,
}: Props) {
    const [secondsLeft, setSecondsLeft] = useState(60);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const nextIndex = Math.min(otp.length, 5);
        inputsRef.current[nextIndex]?.focus();
    }, [otp]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    const handleResend = () => {
        setOtp("");
        setSecondsLeft(60);
        onResend?.();
        inputsRef.current[0]?.focus();
    };

    const handleChange = (value: string, index: number) => {
        const digit = value.replace(/\D/g, "").slice(-1);

        const otpArray = otp.padEnd(6, " ").split("");
        otpArray[index] = digit || " ";

        setOtp(otpArray.join("").trimEnd());

        if (digit && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        setOtp(pasted);

        inputsRef.current[Math.min(pasted.length, 5)]?.focus();
    };

    const isComplete = /^\d{6}$/.test(otp);

    return (
        <div className="relative text-left min-h-dvh min-w-0 overflow-y-auto overflow-x-hidden pb-24 px-1">
            <p className="text-2xl font-bold break-words">
                Ingresa tu código
            </p>

            <p className="text-gray-400 break-words">
                Te enviamos tu código de confirmación por{" "}
                <span className="font-bold">WhatsApp</span>
                {" "}al celular registrado con la cédula{" "}
                <span className="font-bold break-all">{identification}</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={otp[index] ?? ""}
                        onChange={(e) =>
                            handleChange(e.target.value, index)
                        }
                        onKeyDown={(e) =>
                            handleKeyDown(e, index)
                        }
                        onPaste={handlePaste}
                        className="w-9 h-12 sm:w-11 sm:h-14 text-center text-lg sm:text-xl font-bold border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shrink-0"
                    />
                ))}
            </div>

            <div className="text-center mt-5">
                {secondsLeft > 0 ? (
                    <p className="text-sm text-gray-400">
                        ¿No recibiste el código? Reenviar en{" "}
                        <span className="font-bold text-primary tabular-nums">
                            {formatTime(secondsLeft)}
                        </span>
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        className="text-sm font-bold text-primary hover:text-primary-dark cursor-pointer"
                    >
                        Reenviar código
                    </button>
                )}
            </div>

            <button
                onClick={onContinue}
                disabled={!isComplete}
                className="bg-primary w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3 absolute bottom-10 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
                Continuar
            </button>
        </div>
    );
}
