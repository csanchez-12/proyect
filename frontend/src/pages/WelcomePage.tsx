import { Logo } from "../assets/images";


interface Props {
  onContinue: () => void;
}

export default function WelcomePage({ onContinue }: Props) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center">
      <img src={Logo} alt="logo" />
      <p>Bienvenido a Addi</p>

      <button
        onClick={onContinue}
        className="bg-primary mx-5 w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3 absolute bottom-10 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
      >
        Continuar
      </button>
    </div>
  );
}