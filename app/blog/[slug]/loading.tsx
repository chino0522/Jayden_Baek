"use client";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="loader"></div>
            <style jsx>{`
          .loader {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #000;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        </div>
    );
}
