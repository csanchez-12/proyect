
import { useRef, useState } from "react";

interface Props {
    onClose?: () => void;
    onContinue?: () => void;
    identification: string;
}

export default function OTPPage({
    onContinue,
    identification
}: Props) {
    const [password, setPassword] = useState("");
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

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
            <p>
                Te enviamos tu código de confirmación por WhatsApp
                al celular registrado con la cédula {identification}
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
