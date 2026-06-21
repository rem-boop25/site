import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = { title: 'REMPRO CRM' };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="flex flex-col h-screen overflow-hidden bg-gray-50 text-gray-900">
        <AuthProvider>
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}