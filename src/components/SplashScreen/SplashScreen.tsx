import Image from 'next/image';
import logo from '@/components/SplashScreen/just-logo.jpg'
const SplashScreen = () => {
  return (
  <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div className="animate-bounce">
      <Image src={logo} alt="Loading..." className="w-24 h-24" />
    </div>
    <h1>Loading...</h1>
  </div>
  );
};

export default SplashScreen;
