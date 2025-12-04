
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h4 className="font-bold">Maulana Abul Kalam Azad University of Technology</h4>
          <p className="text-sm">NH-12 (Old NH-34) Simhat, Haringhata, Nadia, Pin - 741249, West Bengal</p>
        </div>

        <div>
          <h5 className="font-medium">Contact</h5>
          <p className="text-sm">controller_exam@utechwb.ac.in</p>
          <p className="text-sm">+91 33 1234 5678</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="ghost" onClick={() => navigate('/about')}>About</Button>
          <Button variant="ghost" onClick={() => navigate('/contact')}>Contact</Button>
        </div>
      </div>
    </footer>
  );
}
