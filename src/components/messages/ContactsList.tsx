import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Contact, ContactsListProps } from "@/types/contacts";
import SearchBar from "./SearchBar";
import ContactCard from "./ContactCard";

const ContactsList = ({
  selectedChat,
  onSelectChat,
  defaultContacts = [],
}: ContactsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts] = useState<Contact[]>(defaultContacts);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg flex flex-col h-full">
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                isSelected={selectedChat === contact.id}
                onClick={() => onSelectChat(contact.id)}
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No contacts found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsList;