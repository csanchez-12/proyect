export default function Hero() {
  return (
    <div className="p-5 flex justify-center">
      <div className="w-[23%]">
        <img src={Logo} className="w-20" alt="" />
        <h1 className="text-left font-bold my-4 text-xl">
          Compra a cuotas lo que quieres
        </h1>
        <p className="text-left text-[0.8rem] text-(--text-light)">
          Si no has comprado con Addi antes, pide un cupo para conocer el valor
          que podemos aprobar para ti.
        </p>
        <div className="flex items-center gap-2 mt-8">
          <img src={MessageCheck} alt="message-icon" className="mt-1" />
          <p className="text-[0.7rem] text-left text-(--text-light)">
            Sólo necesitas tu cédula y WhatsApp para aplicar.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <img src={CoolIcon} alt="message-icon" className="" />
          <p className="text-[0.7rem] text-left text-(--text-light)">
            La aprobación toma sólo unos minutos. Aplicar es fácil y rápido
          </p>
        </div>
        <p className="text-left mt-[20%] text-[0.6rem]">
          La aprobación del cupo está sujeta a criterios de elegibilidad de
          Addi. Conoce los términos y condiciones del cupo.
        </p>
        <button className="bg-primary w-full rounded-full py-3 text-white font-bold cursor-pointer hover:bg-primary-dark mt-3">
          Pedir un cupo
        </button>
        <button className="bg-white w-full rounded-full py-3 text-primary font-bold cursor-pointer hover:text-primary-dark mt-3">
          Ya soy cliente, ver mi cupo
        </button>
      </div>
    </div>
  );
}
