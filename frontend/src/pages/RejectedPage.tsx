import { IoCloseCircleOutline } from "react-icons/io5";

interface Props {
    onClick: () => void;
}

export default function RejectedPage({ onClick }: Props) {

    return (
        <div className="relative text-left min-h-dvh flex flex-col items-center justify-center gap-5 px-5 overflow-y-auto pb-24">
            <IoCloseCircleOutline size={40} color="red" className="shrink-0" />
            <p className="text-center font-bold text-xl break-words">
                Datos incorrectos
            </p>
            <p className="text-center text-gray-500 break-words">Ingrese sus datos correctamente.</p>
            <button
                onClick={onClick}
                className="bg-primary left-5 right-5 w-auto rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3 absolute bottom-10 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
                Aceptar
            </button>
        </div>
    );
}
