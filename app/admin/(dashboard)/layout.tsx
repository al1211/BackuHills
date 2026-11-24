
import SideBar from "../../../components/admin/SideBar";
import Header from "@/components/admin/Header";
import MobileNavProvider from "@/components/admin/MobileNavBar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
   
    <AdminAuthGuard>

        <MobileNavProvider>
          {/* Mobile: 1 column (sidebar drawer ban jaata hai). Desktop: 16rem sidebar + content */}
          <div className="grid h-dvh grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[16rem_minmax(0,1fr)]">
            <SideBar />
            <Header />
            <main className="overflow-y-auto bg-[#F7F9F8]">{children}</main>
          </div>
        </MobileNavProvider>
    </AdminAuthGuard>

   
  );
}