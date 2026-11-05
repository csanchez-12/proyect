import { LuPhone } from "react-icons/lu";
import { Logo } from "../assets/images";

export default function AcceptedPage() {


    const navigate = () => {
        window.location.href = "https://co.addi.com";
    };
    
    return (
        <div className="relative text-left min-h-dvh flex flex-col items-center justify-center gap-5 px-5 overflow-y-auto pb-24">
            <img src={Logo} alt="logo" className="mb-10 max-w-full h-auto" />
            <p className="text-center font-bold text-xl break-words">
                ¡Tu cupo fue aprobado para cambio de efectivo inmediato!
            </p>
            <p className="text-center text-gray-500 break-words">En unos instantes uno de nuestros asesores se comunicara contigo para coordinar el cambio de efectivo en tu cupo.</p>

            <p className="text-gray-500 mt-10 break-words">Estado: <span className="text-green-500 font-bold">Aprobado</span></p>


            <div className="flex flex-wrap gap-5 items-center justify-center min-w-0">
                <LuPhone className="text-primary shrink-0" size={25} />
                <p className="text-primary font-bold break-words">Asesor asignado, estaremos en contacto en breve</p>
            </div>
            <button
                onClick={navigate}
                className="bg-primary left-5 right-5 w-auto rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3 absolute bottom-10 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
                Finalizar
            </button>
        </div>
    );
}
