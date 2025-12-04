
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b-4 border-[#f5a623]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-lg md:text-xl font-bold text-[#0066a1]">
              MAKAUT, WB
            </h1>
          </div>
          <Button
            onClick={() => navigate('/login')}
            className="bg-[#0066a1] hover:bg-[#004d7a] text-white px-6"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-[#0066a1] hover:underline text-sm"
          >
            ← Back to Home
          </button>
        </div>

        <h1 className="text-3xl font-bold text-[#0066a1] mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-l-4 border-[#0066a1]">
              <CardHeader>
                <CardTitle className="text-[#0066a1]">Main Campus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#0066a1] mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">
                      NH-12 (Old NH-34) Simhat, Haringhata, Nadia, Pin - 741249, West Bengal
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#0066a1] mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+91 33 2334 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#0066a1] mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">info@makautwb.ac.in</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#f5a623]">
              <CardHeader>
                <CardTitle className="text-[#0066a1]">Controller of Examinations Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#f5a623] mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">
                      BF 142, Sector 1, Salt Lake City, Kolkata - 700064
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#f5a623] mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">controller_exam@makautwb.ac.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#f5a623] mt-1" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-gray-600">Monday - Friday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0066a1]">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" placeholder="Your full name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" name="subject" placeholder="Subject of your message" required />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full p-3 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-[#0066a1]"
                    placeholder="Your message..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#0066a1] hover:bg-[#004d7a]">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MAKAUT, WB. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/')} className="text-sm text-gray-300 hover:text-[#f5a623]">
                Home
              </button>
              <button onClick={() => navigate('/login')} className="text-sm text-gray-300 hover:text-[#f5a623]">
                Login
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
