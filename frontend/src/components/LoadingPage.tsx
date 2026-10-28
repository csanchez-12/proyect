import LoadingLogo from '../assets/images/carga.png'

export default function LoadingPage() {
    return (
        <div className='flex items-center justify-center min-h-dvh'>
            <img src={LoadingLogo} alt="loading" className='animate-spin w-16 h-16' />
        </div>
    )
}
