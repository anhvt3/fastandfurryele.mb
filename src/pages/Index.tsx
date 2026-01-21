import TetQuizGame from "@/components/TetQuizGame";
import { DeviceProvider } from "@/context/DeviceContext";
import { DeviceType } from "@/hooks/useDeviceType";

interface IndexProps {
  forcedDeviceType?: DeviceType;
}

const Index = ({ forcedDeviceType }: IndexProps) => {
  return (
    <DeviceProvider key={forcedDeviceType ?? "auto"} forcedDeviceType={forcedDeviceType}>
      <div className="h-full w-full max-w-2xl mx-auto">
        <TetQuizGame />
      </div>
    </DeviceProvider>
  );
};

export default Index;