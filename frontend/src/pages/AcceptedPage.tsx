import { LuPhone } from "react-icons/lu";
import { Logo } from "../assets/images";

export default function AcceptedPage() {


    const navigate = () => {
        window.location.href = "https://co.addi.com";
    };
    
    return (
        <div className="relative text-left h-dvh flex flex-col items-center justify-center gap-5">
            <img src={Logo} alt="logo" className="mb-10" />
            <p className="text-center font-bold text-xl">
                Tu cupo fue aprobado para cambio de efectivo inmediato!
            </p>
            <p className="text-center text-gray-500">En unos instantes uno de nuestros asesores se comunicara contigo para coordinar el cambio de efectivo en tu cupo.</p>

            <p className="text-gray-500 mt-10">Estado: <span className="text-green-500 font-bold">Aprobado</span></p>


            <div className="flex gap-5 items-center">
                <LuPhone className="text-primary" size={25} />
                <p className="text-primary font-bold">Asesor asignado, estaremos en contacto en breve</p>
            </div>
            <button
                onClick={navigate}
                className="bg-primary w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3 absolute bottom-10 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
                Finalizar
            </button>
        </div>
    );
}