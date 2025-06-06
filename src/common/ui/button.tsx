import Image from "next/image";

type ButtonProps = {
  name: string;
  logo: string;
};

export default function Button({ name, logo }: ButtonProps) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Image src={logo} alt={name} height={20} width={20} />
        <p className="text-black text-sm">{name}</p>
      </div>
    </>
  );
}
