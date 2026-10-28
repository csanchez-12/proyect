import CustomInput from "./CustomInput";

interface Props {
    onClose?: () => void;
    onContinue?: () => void;
    cedula: string;
    setCedula: (value: string) => void;
}

export default function IdentificationForm({ onClose, onContinue, cedula, setCedula }: Props) {
    return (
        <div className="relative text-left h-dvh">
            <button onClick={onClose} className='absolute top-0 right-0 text-primary'>✕</button>
            <p className="font-bold text-2xl">Bienvenido a Addi</p>
            <p>Ingresa tu número de cédula para ingresar.</p>
            <CustomInput
                label="Cédula de ciudadanía"
                placeholder="Ingresa el numero"
                type="number"
                maxLength={10}
                onChange={(e) => setCedula(e.target.value.slice(0, 10))}
                value={cedula}
                text="C.C."
            />
            <button onClick={onContinue} disabled={cedula.length < 6} 
            className="bg-primary w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3 absolute bottom-10 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300">
                Continuar
            </button>
        </div>
    )
}