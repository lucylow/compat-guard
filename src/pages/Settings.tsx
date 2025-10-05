import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Settings = () => {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-auto">
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Baseline Target Year</label>
                  <input type="number" className="w-full px-3 py-2 border border-border rounded-lg" defaultValue={2025} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Enable AI Migration Assistant</label>
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>Enabled</span>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Frameworks</label>
                  <select multiple className="w-full px-3 py-2 border border-border rounded-lg">
                    <option>React</option>
                    <option>Vue</option>
                    <option>Svelte</option>
                    <option>Angular</option>
                  </select>
                </div>
                <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold mt-4">
                  Save Settings
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
