import { linkWhatsapp, mensajeWhatsappGeneral } from '../data/constants'

export default function WhatsAppButton() {
  return (
    <a href={linkWhatsapp(mensajeWhatsappGeneral)} target="_blank" rel="noopener noreferrer" aria-label="Chatear por WhatsApp" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <svg viewBox="0 0 32 32" width="26" height="26" fill="#FFFFFF" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.31.64 4.47 1.75 6.31L4 29l7.86-1.7A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16.001 3Zm0 21.8c-2.02 0-3.9-.58-5.49-1.58l-.39-.24-4.66 1.01 1.03-4.53-.26-.4A9.77 9.77 0 0 1 4.8 15c0-6.19 5.02-11.2 11.2-11.2 6.19 0 11.2 5.02 11.2 11.2S22.2 24.8 16 24.8Zm6.13-8.36c-.34-.17-1.98-.98-2.29-1.09-.31-.11-.53-.17-.75.17-.22.34-.86 1.09-1.06 1.31-.19.22-.39.25-.72.08-.34-.17-1.42-.52-2.71-1.66-1-.89-1.68-1.99-1.87-2.33-.19-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.19.22-.34.34-.56.11-.22.06-.42-.03-.59-.08-.17-.75-1.79-1.02-2.45-.27-.64-.55-.56-.75-.57h-.64c-.22 0-.58.08-.88.42-.3.34-1.15 1.12-1.15 2.74s1.18 3.18 1.34 3.4c.17.22 2.31 3.53 5.61 4.95.78.34 1.4.54 1.87.69.79.25 1.5.21 2.07.13.63-.09 1.98-.81 2.26-1.6.28-.79.28-1.46.19-1.6-.08-.14-.3-.22-.64-.39Z" />
      </svg>
    </a>
  )
}