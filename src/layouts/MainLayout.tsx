import { useAuthCheck } from "@/hooks/useAuthCheck";
import Navbar from "@/components/shared/Navbar";

type LayoutType = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: LayoutType) {
  const isChecked = useAuthCheck();

  if (!isChecked) {
    return <p>... loading</p>;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
