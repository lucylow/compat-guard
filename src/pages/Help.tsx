import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Help = () => {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-auto">
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-foreground mb-6">Help & Support</h1>
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <ul className="space-y-4">
                <li>
                  <strong>How do I set my Baseline target?</strong>
                  <p className="text-muted-foreground">Go to Settings and select your preferred Baseline year and status.</p>
                </li>
                <li>
                  <strong>How do I enable AI migration suggestions?</strong>
                  <p className="text-muted-foreground">Toggle the AI Migration Assistant in Settings.</p>
                </li>
                <li>
                  <strong>Where can I find documentation?</strong>
                  <p className="text-muted-foreground">
                    Visit <a href="https://docs.compatguard.dev" className="text-primary underline">docs.compatguard.dev</a>
                  </p>
                </li>
                <li>
                  <strong>How do I contact support?</strong>
                  <p className="text-muted-foreground">
                    Email <a href="mailto:support@compatguard.dev" className="text-primary underline">support@compatguard.dev</a>
                  </p>
                </li>
              </ul>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea className="w-full px-3 py-2 border border-border rounded-lg" rows={4}></textarea>
                  </div>
                  <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Help;
