import React from "react";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl font-bold  mb-6 text-center drop-shadow-md">
        Welcome to React + Tailwind CSS!
      </h1>
      <p className="text-xl  mb-8 text-center max-w-2xl">
        React is a popular JavaScript library for building user interfaces. It allows developers to build 
        dynamic and interactive UIs with reusable components. With React, you can create fast and scalable web apps.
      </p>
      <p className="text-xl  mb-8 text-center max-w-2xl">
        Tailwind CSS is a utility-first CSS framework that makes it easy to create custom designs. 
        With Tailwind, you can use utility classes directly in your HTML to style elements without having to write custom CSS.
      </p>
    </div>
  );
}

export default Home;
