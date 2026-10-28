import PasswordInput from "./PasswordInput";

interface Props {
    onClose?: () => void;
    onContinue?: () => void;
    password: string;
    setPassword: (value: string) => void;
}

export default function PasswordForm({ onClose, onContinue, password, setPassword }: Props) {
    return (
        <div className="relative text-left h-dvh">
            <button onClick={onClose} className='absolute top-0 right-0 text-primary'>✕</button>
            <p className="font-bold text-2xl">Ingresa tu contraseña</p>
            <p>Ingresa tu contraseña para acceder a tu usuario.</p>
            <PasswordInput
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                maxLength={10}
                onChange={(e) => setPassword(e.target.value.slice(0, 10))}
                value={password}
            />
            <button onClick={onContinue} disabled={password.length < 6} className="bg-primary w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3 absolute bottom-10 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300">
                Continuar
            </button>
        </div>
    )
}