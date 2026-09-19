import { Phone, MessageCircle, Mail } from "lucide-react";

const MobileStickyContact = ({ property }) => {
  const phone = property.agent?.phone || "+919876543210";
  const whatsappNumber = phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${property.title} (Property ID: ${property.id}). Please share more details.`
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-[var(--border)] bg-[var(--background)]/80 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden dark:bg-[var(--card)]/90">
      <div className="grid w-full grid-cols-3 gap-2">
        {/* Call Now */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center gap-1 rounded-lg py-2 font-medium transition-colors hover:bg-[var(--muted)]/10 active:bg-[var(--muted)]/20"
          style={{ color: "var(--foreground)" }}
        >
          <Phone size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[#25D366]/10 py-2 font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20 active:bg-[#25D366]/30"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Enquire */}
        <a
          href="#enquiry"
          className="flex flex-col items-center justify-center gap-1 rounded-lg py-2 font-medium transition-colors hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
        >
          <Mail size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Enquire</span>
        </a>
      </div>
    </div>
  );
};

export default MobileStickyContact;
