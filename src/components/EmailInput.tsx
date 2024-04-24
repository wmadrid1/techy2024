import { Input } from "antd";

interface EmailInputProps {
  setEmails: (emails: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ setEmails }) => {

  const handleTextChange = (e: any) => {
    setEmails(e.target.value);
  };

  return (
    <div className="w-1/2 mx-auto pt-5">
      <div className="bg-white mt-5 shadow-lg p-8">
        <h3 className="mb-4">
          Ingresa los emails del equipo separados por coma
        </h3>
        <Input
          placeholder="hola@gmail.com,test@gmail.com..."
          className="rounded-none"
          onChange={handleTextChange}
          ></Input>
      </div>
    </div>
  );
};

export default EmailInput;
