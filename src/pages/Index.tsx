import TetQuizGame from "@/components/TetQuizGame";
import { DeviceProvider } from "@/context/DeviceContext";
import { DeviceType } from "@/hooks/useDeviceType";

interface IndexProps {
  forcedDeviceType?: DeviceType;
}

const Index = ({ forcedDeviceType }: IndexProps) => {
  return (
    <DeviceProvider key={forcedDeviceType ?? "auto"} forcedDeviceType={forcedDeviceType}>
      {/*
        IMPORTANT: Do NOT constrain the game container width here.
        TetQuizGame already handles responsive inner max-width, while the
        background needs to span the full viewport.
      */}
      <div className="h-full w-full">
        <TetQuizGame />
      </div>
    </DeviceProvider>
  );
};

export default Index;