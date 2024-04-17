import Navbar from "../../Components/Common/Navbar"
import Footer from "../../Components/Common/Footer"

export default function Home() {
  return (
    <>
    <Navbar
        Class="border-red-700 bg-red-800 dark:bg-red-800 dark:border-red-800"
        logo="../Host/HostLogo.png"
        Tabs={["Dashboard", "My Packages", "Schedules", "Profile"]}
      />
      <Footer Class="dark:bg-red-800" Logo="../Host/HostLogo.png" />
    </>
  )
}
