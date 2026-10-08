import React from 'react';

export default function Model() {
  const phoneNumber = '250795926508';

  const message = encodeURIComponent(
    'Hello StudioHub, I would like to get more information about your services.'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact StudioHub on WhatsApp"
      className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl sm:bottom-6 sm:right-6"
    >
      {/* WhatsApp Icon */}
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.65.86 5.1 2.32 7.09L4.5 28.5l6.58-1.79a11.9 11.9 0 0 0 4.92 1.07h.005c6.63 0 12.004-5.373 12.004-12.004S22.634 3 16.004 3zm0 21.8h-.004a9.78 9.78 0 0 1-4.98-1.36l-.357-.212-3.68 1 .984-3.586-.233-.368a9.77 9.77 0 0 1-1.5-5.27c0-5.4 4.396-9.8 9.8-9.8 2.617 0 5.077 1.02 6.93 2.87a9.73 9.73 0 0 1 2.868 6.93c0 5.4-4.397 9.796-9.828 9.796zm5.36-7.34c-.293-.147-1.735-.856-2.004-.953-.27-.098-.466-.147-.663.147-.196.293-.76.953-.932 1.15-.172.196-.343.22-.636.073-.293-.147-1.238-.456-2.358-1.454-.872-.777-1.46-1.737-1.632-2.03-.172-.293-.018-.452.13-.598.133-.132.293-.343.44-.514.146-.172.195-.294.293-.49.098-.196.049-.368-.024-.514-.073-.147-.663-1.6-.91-2.19-.24-.575-.482-.497-.663-.507l-.564-.01c-.196 0-.514.073-.783.368-.27.294-1.03 1.007-1.03 2.456 0 1.45 1.055 2.85 1.202 3.046.147.196 2.076 3.17 5.03 4.443.703.303 1.25.484 1.678.62.705.224 1.347.192 1.855.117.566-.084 1.735-.71 1.98-1.395.245-.686.245-1.273.172-1.395-.073-.123-.27-.196-.563-.343z"
        />
      </svg>
    </a>
  );
}