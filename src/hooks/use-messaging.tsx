import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Message, MessageStatus } from "@/types/messages";

const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const useMessaging = (chatId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!chatId) return;

    // Validate UUID format before making database queries
    if (!isValidUUID(chatId)) {
      console.error("Invalid UUID format for chatId:", chatId);
      return;
    }

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(
            `sender_id.eq.${chatId},receiver_id.eq.${chatId},group_id.eq.${chatId}`
          )
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching messages:", error);
          toast.error("Failed to fetch messages");
          return;
        }

        if (!data) return;

        setMessages(
          data.map((msg) => ({
            id: msg.id,
            senderId: msg.sender_id,
            text: msg.content,
            timestamp: new Date(msg.created_at).toLocaleTimeString(),
            status: (msg.status || "sent") as MessageStatus,
          }))
        );
      } catch (error) {
        console.error("Error in fetchMessages:", error);
        toast.error("Failed to fetch messages");
      }
    };

    fetchMessages();

    // Set up realtime subscription
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `sender_id.eq.${chatId},receiver_id.eq.${chatId},group_id.eq.${chatId}`,
        },
        (payload) => {
          console.log("Message change received:", payload);
          fetchMessages(); // Refresh messages when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  const updateMessage = async (id: string, newText: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ content: newText })
        .eq("id", id);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg))
      );

      toast.success("Message updated successfully");
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

  return {
    messages,
    updateMessage,
  };
};