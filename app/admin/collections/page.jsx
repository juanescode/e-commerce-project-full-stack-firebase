"use client";

import Form from "./components/Form";
import ListView from "./components/ListView";

export default function Page() {
  return (
    <main className="flex flex-col gap-5 p-5 md:flex-row">
      <Form />
      <ListView />
    </main>
  );
}