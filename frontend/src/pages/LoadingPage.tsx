import { LoadingLogo } from '../assets/images';

export default function LoadingPage() {
    return (
        <div className='flex items-center flex-col justify-center min-h-dvh'>
            <img src={LoadingLogo} alt="loading" className='animate-spin w-16 h-16' />
            <p className='font-bold mt-5'>Verificando tus datos...</p>
            <p className='text-[0.8rem]'>Por favor, espera un momento...</p>
        </div>
    );
}