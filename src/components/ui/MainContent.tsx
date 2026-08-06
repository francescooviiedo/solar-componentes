import { PropsWithChildren } from "react";

export default function MainContent({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg">
      {children}
    </div>
  );
}
