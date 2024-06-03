import { Suspense } from "react";
import SuccessComponent  from "@/components/SuccessComponent";


export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessComponent />
    </Suspense>
  );
}
