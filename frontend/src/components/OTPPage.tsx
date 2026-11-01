import { useEffect, useRef, useState } from "react";

interface Props {
    onClose?: () => void;
    onContinue?: () => void;
    onResend?: () => void;
    identification: string;
}

export default function OTPPage({
    onContinue,
    onResend,
    identification
}: Props) {
    const [password, setPassword] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(60);

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    // Contador regresivo
    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prev) =>
                prev > 0 ? prev - 1 : 0
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Formato MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    const handleResend = () => {
        onResend?.();
        setSecondsLeft(60);
        setPassword("");
        inputsRef.current[0]?.focus();
    };

    const handleChange = (value: string, index: number) => {
        const digit = value.replace(/\D/g, "").slice(-1);

        const otp = password.padEnd(6, " ").split("");
        otp[index] = digit || " ";

        const newPassword = otp.join("").trimEnd();
        setPassword(newPassword);

        if (digit && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            if (!password[index] && index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
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

        setPassword(pasted);

        inputsRef.current[Math.min(pasted.length, 5)]?.focus();
    };

    const isComplete = /^\d{6}$/.test(password);

    return (
        <div className="relative text-left h-dvh">
            <p className="text-2xl font-bold">
                Ingresa tu código
            </p>

            <p className="text-gray-400">
                Te enviamos tu código de confirmación por <span className="font-bold">WhatsApp</span>
                al celular registrado con la cédula <span className="font-bold">{identification}</span>.
            </p>

            <div className="flex justify-center gap-3 mt-8">
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
                        value={password[index] ?? ""}
                        onChange={(e) =>
                            handleChange(e.target.value, index)
                        }
                        onKeyDown={(e) =>
                            handleKeyDown(e, index)
                        }
                        onPaste={handlePaste}
                        className="w-11 h-14 text-center text-xl font-bold border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                ))}
            </div>

            {/* Reenvío de código */}
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