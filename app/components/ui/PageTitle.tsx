import React from "react";

export default function PageTitle({
  children = null,
  className = "",
}: {
  children: any;
  className: string;
}) {
  return <div className={`text-3xl font-bold ${className}`}>{children}</div>;
}
