
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/auth-context';
import Hero from './components/Hero';
import Feature from './components/feature';

export default function HomePage() {
  return (
    <>
    <AuthProvider>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero/>
      
     <Feature/>

     
      {/* Footer */}
      <Footer />
    </div>
    </AuthProvider>
    </>
  );
}
