import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Office</h4>
            <p className="text-sm text-gray-700">Main Campus: NH-12 (Old NH-34) Simhat, Haringhata, Nadia, West Bengal</p>
            <p className="text-sm text-gray-700 mt-2">Email: controller_exam@utechwb.ac.in</p>
            <p className="text-sm text-gray-700">Phone: +91 33 1234 5678</p>
          </div>

          <div>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <textarea id="message" name="message" className="w-full p-2 border rounded h-28" />
              </div>

              <div>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
