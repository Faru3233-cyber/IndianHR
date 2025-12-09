import { Button } from "./ui/button";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918483862361"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="icon"
        className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
      >
        <img 
            src="https://cdn-icons-png.flaticon.com/512/124/124034.png" 
            alt="WhatsApp" 
            className="h-8 w-8"
        />
      </Button>
    </a>
  );
}
